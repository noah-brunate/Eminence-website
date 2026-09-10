import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import { db, consultationBookingsTable } from "@workspace/db";
import {
  ListBookingsResponse,
  SubmitBookingBody,
  SubmitBookingResponse,
  UpdateBookingBody,
  UpdateBookingResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/admin-auth";
import {
  escapeHtml,
  sendSystemEmail,
} from "../lib/contact-notification";
import { publicFormRateLimit } from "../lib/rate-limit";

const router = Router();
const notificationRecipient =
  process.env["CONTACT_NOTIFICATION_TO"] || "info@eminence.co.ug";

type BookingRow = typeof consultationBookingsTable.$inferSelect;

function serializeBooking(booking: BookingRow) {
  return {
    ...booking,
    status: booking.status as
      | "new"
      | "contacted"
      | "scheduled"
      | "completed"
      | "cancelled"
      | "spam",
    preferredAt: booking.preferredAt.toISOString(),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
}

router.post("/bookings", publicFormRateLimit, async (req, res): Promise<void> => {
  const parsed = SubmitBookingBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid booking request");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { website, ...data } = parsed.data;
  if (website) {
    req.log.info("Booking honeypot rejected a bot submission");
    res.json(
      SubmitBookingResponse.parse({
        success: true,
        message: "Your consultation request has been received.",
      }),
    );
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }

  const preferredAt = new Date(data.preferredAt);
  if (preferredAt.getTime() <= Date.now()) {
    res.status(400).json({ error: "Preferred date and time must be in the future." });
    return;
  }

  let localTime: string;
  try {
    localTime = new Intl.DateTimeFormat("en-UG", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: data.timezone,
    }).format(preferredAt);
  } catch {
    res.status(400).json({ error: "A valid timezone is required." });
    return;
  }

  const [booking] = await db
    .insert(consultationBookingsTable)
    .values({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone ?? null,
      topic: data.topic,
      message: data.message ?? null,
      preferredAt,
      timezone: data.timezone,
      status: "new",
    })
    .returning();

  const internalSubject = `New consultation request from ${data.name}`;
  const internalHtml = `
    <h2>${escapeHtml(internalSubject)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
    <p><strong>Topic:</strong> ${escapeHtml(data.topic)}</p>
    <p><strong>Requested time:</strong> ${escapeHtml(localTime)} (${escapeHtml(data.timezone)})</p>
    <p><strong>Message:</strong><br>${escapeHtml(data.message || "No additional message").replace(/\n/g, "<br>")}</p>
    <p><strong>Booking ID:</strong> ${booking?.id}</p>`;
  const acknowledgementHtml = `
    <h2>We received your consultation request</h2>
    <p>Hello ${escapeHtml(data.name)},</p>
    <p>Thank you for contacting EMINENCE. We received your request for <strong>${escapeHtml(localTime)}</strong> (${escapeHtml(data.timezone)}) about <strong>${escapeHtml(data.topic)}</strong>.</p>
    <p>This is not yet a confirmed appointment. Our team will review availability and reply with confirmation or alternative times.</p>
    <p>Regards,<br>EMINENCE Services</p>`;

  const deliveries = await Promise.allSettled([
    sendSystemEmail(
      notificationRecipient,
      internalSubject,
      internalHtml,
      data.email,
    ),
    sendSystemEmail(
      data.email,
      "We received your EMINENCE consultation request",
      acknowledgementHtml,
      notificationRecipient,
    ),
  ]);
  deliveries.forEach((delivery, index) => {
    if (delivery.status === "rejected") {
      req.log.error(
        { err: delivery.reason, bookingId: booking?.id, emailType: index === 0 ? "internal" : "acknowledgement" },
        "Booking email failed",
      );
    }
  });

  req.log.info({ bookingId: booking?.id }, "Consultation booking submitted");
  res.json(
    SubmitBookingResponse.parse({
      success: true,
      message: "Your consultation request has been received. Our team will follow up by email.",
    }),
  );
});

router.get("/admin/bookings", requireAdmin, async (_req, res): Promise<void> => {
  const bookings = await db
    .select()
    .from(consultationBookingsTable)
    .orderBy(desc(consultationBookingsTable.createdAt));
  res.json(ListBookingsResponse.parse(bookings.map(serializeBooking)));
});

router.patch(
  "/admin/bookings/:id",
  requireAdmin,
  async (req, res): Promise<void> => {
    const bookingId = req.params.id;
    if (typeof bookingId !== "string") {
      res.status(400).json({ error: "A valid booking ID is required." });
      return;
    }

    const parsed = UpdateBookingBody.safeParse(req.body);
    if (!parsed.success || (!parsed.data.status && parsed.data.internalNotes === undefined)) {
      res.status(400).json({ error: parsed.success ? "No changes provided." : parsed.error.message });
      return;
    }

    const [updated] = await db
      .update(consultationBookingsTable)
      .set({
        ...(parsed.data.status ? { status: parsed.data.status } : {}),
        ...(parsed.data.internalNotes !== undefined
          ? { internalNotes: parsed.data.internalNotes }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(consultationBookingsTable.id, bookingId))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Booking not found." });
      return;
    }

    res.json(UpdateBookingResponse.parse(serializeBooking(updated)));
  },
);

export default router;
