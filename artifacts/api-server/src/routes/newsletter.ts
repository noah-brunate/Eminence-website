import { Router } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import { SubscribeNewsletterBody, SubscribeNewsletterResponse } from "@workspace/api-zod";

const router = Router();

router.post("/newsletter", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid newsletter body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email } = parsed.data;

  try {
    await db.insert(newsletterSubscribersTable).values({ email });
    req.log.info({ email }, "Newsletter subscription added");
    res.json(SubscribeNewsletterResponse.parse({ success: true, message: "You're subscribed! Welcome to the EMINENCE newsletter." }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("unique") || message.includes("duplicate")) {
      res.status(409).json({ error: "This email is already subscribed." });
      return;
    }
    throw err;
  }
});

export default router;
