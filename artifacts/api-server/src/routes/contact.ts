import { Router } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";

const router = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact form body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, company, service, message } = parsed.data;

  await db.insert(contactSubmissionsTable).values({
    name,
    email,
    company: company ?? null,
    service: service ?? null,
    message,
  });

  req.log.info({ email }, "Contact form submitted");
  res.json(SubmitContactResponse.parse({ success: true, message: "Your message has been received. We'll be in touch shortly." }));
});

export default router;
