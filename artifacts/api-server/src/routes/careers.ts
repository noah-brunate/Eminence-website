import { Router } from "express";
import { db, jobApplicationsTable } from "@workspace/db";
import {
  SubmitApplicationBody,
  SubmitApplicationResponse,
  ListRolesResponse,
} from "@workspace/api-zod";

import { publicRecords } from "./site-content";

const router = Router();

router.get("/careers/roles", async (req, res): Promise<void> => {
  res.json(ListRolesResponse.parse(await publicRecords("roles")));
});

router.post("/careers/apply", async (req, res): Promise<void> => {
  const parsed = SubmitApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      { errors: parsed.error.message },
      "Invalid job application body",
    );
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { fullName, email, roleAppliedFor, coverNote, linkedinUrl } =
    parsed.data;

  await db.insert(jobApplicationsTable).values({
    fullName,
    email,
    roleAppliedFor,
    coverNote: coverNote ?? null,
    linkedinUrl: linkedinUrl ?? null,
  });

  req.log.info({ email, roleAppliedFor }, "Job application submitted");
  res.json(
    SubmitApplicationResponse.parse({
      success: true,
      message:
        "Application received. Our team will review it and be in touch within 5 business days.",
    }),
  );
});

export default router;
