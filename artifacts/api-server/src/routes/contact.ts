import { Router } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { sendContactNotification } from "../lib/contact-notification";
import { publicFormRateLimit } from "../lib/rate-limit";

const router = Router();

router.post("/contact", publicFormRateLimit, async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact form body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, company, service, message, website } = parsed.data;

  if (website) {
    req.log.info("Contact honeypot rejected a bot submission");
    res.json(SubmitContactResponse.parse({ success: true, message: "Your message has been received." }));
    return;
  }

  await db.insert(contactSubmissionsTable).values({
    name,
    email,
    company: company ?? null,
    service: service ?? null,
    message,
  });

  try {
    await sendContactNotification({ name, email, company, service, message });
  } catch (err) {
    req.log.error({ err }, "Contact notification email failed");
    // The submission remains safely stored in the database for follow-up.
  }

  req.log.info({ email }, "Contact form submitted");
  res.json(SubmitContactResponse.parse({ success: true, message: "Your message has been received. We'll be in touch shortly." }));
});

export default router;
