import { Router } from "express";
import { db, chatMessagesTable } from "@workspace/db";
import { SubmitChatMessageBody, SubmitChatMessageResponse } from "@workspace/api-zod";

const router = Router();

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = SubmitChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid chat message body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, message } = parsed.data;

  await db.insert(chatMessagesTable).values({ name, email, message });

  req.log.info({ email }, "Chat message submitted");
  res.json(
    SubmitChatMessageResponse.parse({
      success: true,
      message: "Message received! A member of our team will respond to your email shortly.",
    })
  );
});

export default router;
