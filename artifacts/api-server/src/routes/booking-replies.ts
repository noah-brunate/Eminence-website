import { Router } from "express";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import {
  db,
  bookingRepliesTable,
  consultationBookingsTable,
} from "@workspace/db";
import { requireAdmin } from "../lib/admin-auth";
import { escapeHtml, sendSystemEmail } from "../lib/contact-notification";
export const bookingRepliesRouter = Router();
const inputSchema = z
  .object({
    id: z.string().uuid(),
    subject: z
      .string()
      .trim()
      .min(1)
      .max(200)
      .refine((v) => !/[\r\n]/.test(v)),
    message: z.string().trim().min(1).max(10000),
    kind: z.enum(["message", "confirm", "propose"]),
    appointmentAt: z.string().datetime({ offset: true }).optional(),
  })
  .strict()
  .superRefine((v, ctx) => {
    if (
      v.kind !== "message" &&
      (!v.appointmentAt || Date.parse(v.appointmentAt) <= Date.now())
    )
      ctx.addIssue({
        code: "custom",
        message: "Choose a future appointment time",
        path: ["appointmentAt"],
      });
  });
bookingRepliesRouter.get(
  "/admin/bookings/:id/replies",
  requireAdmin,
  async (req, res) => {
    if (!z.string().uuid().safeParse(req.params.id).success) {
      res.status(400).json({ error: "Invalid booking ID" });
      return;
    }
    res.json(
      await db
        .select()
        .from(bookingRepliesTable)
        .where(eq(bookingRepliesTable.bookingId, String(req.params.id)))
        .orderBy(desc(bookingRepliesTable.createdAt)),
    );
  },
);
bookingRepliesRouter.post(
  "/admin/bookings/:id/replies",
  requireAdmin,
  async (req, res) => {
    const parsed = inputSchema.safeParse(req.body);
    if (
      !parsed.success ||
      !z.string().uuid().safeParse(req.params.id).success
    ) {
      res
        .status(400)
        .json({
          error: parsed.success
            ? "Invalid booking ID"
            : parsed.error.issues.map((i) => i.message).join("; "),
        });
      return;
    }
    const bookingId = String(req.params.id);
    const [booking] = await db
      .select()
      .from(consultationBookingsTable)
      .where(eq(consultationBookingsTable.id, bookingId));
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    const data = parsed.data;
    const [record] = await db
      .insert(bookingRepliesTable)
      .values({
        ...data,
        appointmentAt: data.appointmentAt ? new Date(data.appointmentAt) : null,
        bookingId,
        recipient: booking.email,
      })
      .onConflictDoNothing()
      .returning();
    if (!record) {
      const [existing] = await db
        .select()
        .from(bookingRepliesTable)
        .where(eq(bookingRepliesTable.id, data.id));
      if (
        existing?.bookingId !== bookingId ||
        existing.subject !== data.subject ||
        existing.message !== data.message ||
        existing.kind !== data.kind ||
        existing.appointmentAt?.toISOString() !==
          (data.appointmentAt
            ? new Date(data.appointmentAt).toISOString()
            : undefined)
      ) {
        res
          .status(409)
          .json({ error: "This response ID has already been used" });
        return;
      }
      res
        .status(existing.status === "sent" ? 200 : 409)
        .json(
          existing.status === "sent"
            ? existing
            : {
                error:
                  "This send was already attempted. Check response history before composing another email.",
              },
        );
      return;
    }
    let appointment = "";
    if (data.appointmentAt) {
      const when = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: booking.timezone,
      }).format(new Date(data.appointmentAt));
      appointment = `<p><strong>${data.kind === "confirm" ? "Confirmed appointment" : "Proposed appointment"}:</strong> ${escapeHtml(when)} (${escapeHtml(booking.timezone)})</p>`;
    }
    try {
      await sendSystemEmail(
        booking.email,
        data.subject,
        `<p>Hello ${escapeHtml(booking.name)},</p>${appointment}<p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p><p>EMINENCE Services</p>`,
        process.env.CONTACT_NOTIFICATION_TO || process.env.SMTP_USER,
        true,
      );
    } catch (error) {
      req.log.error(
        { err: error, replyId: record.id },
        "Booking reply was not confirmed by mail server",
      );
      await db
        .update(bookingRepliesTable)
        .set({
          status: "failed",
          error:
            "Mail server acceptance was not confirmed. Check email configuration and delivery logs before sending again.",
        })
        .where(eq(bookingRepliesTable.id, record.id));
      res
        .status(502)
        .json({
          error:
            "Email sending failed or could not be confirmed. Your response is saved in history; the booking status was not changed.",
        });
      return;
    }
    // Persist acceptance separately: a database failure here must never trigger an automatic resend.
    const saved = await db.transaction(async (tx) => {
      const [reply] = await tx
        .update(bookingRepliesTable)
        .set({ status: "sent", sentAt: new Date() })
        .where(eq(bookingRepliesTable.id, record.id))
        .returning();
      await tx
        .update(consultationBookingsTable)
        .set({
          status:
            data.kind === "confirm"
              ? "scheduled"
              : booking.status === "new"
                ? "contacted"
                : booking.status,
          updatedAt: new Date(),
        })
        .where(eq(consultationBookingsTable.id, bookingId));
      return reply;
    });
    res.json(saved);
  },
);
