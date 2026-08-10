import { Router } from "express";
import { db, jobApplicationsTable } from "@workspace/db";
import {
  SubmitApplicationBody,
  SubmitApplicationResponse,
  ListRolesResponse,
} from "@workspace/api-zod";

const router = Router();

const OPEN_ROLES = [
  {
    id: "role-1",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    description:
      "Join our core engineering team to architect and build scalable web applications using React, Node.js, and PostgreSQL. You'll work on cutting-edge projects for enterprise clients and internal products.",
    postedAt: "2026-07-15",
  },
  {
    id: "role-2",
    title: "Cloud Infrastructure Engineer",
    department: "Cloud & DevOps",
    location: "Remote",
    type: "Full-time",
    description:
      "Design, deploy, and maintain multi-cloud infrastructure (AWS/GCP/Azure) for client workloads. Experience with Kubernetes, Terraform, and CI/CD pipelines is essential.",
    postedAt: "2026-07-22",
  },
  {
    id: "role-3",
    title: "Senior Technology Consultant",
    department: "Consultancy",
    location: "On-site / Travel",
    type: "Full-time",
    description:
      "Lead digital transformation engagements with enterprise clients. Guide technology strategy, facilitate workshops, and deliver actionable roadmaps for complex IT challenges.",
    postedAt: "2026-07-28",
  },
  {
    id: "role-4",
    title: "Product Manager — SaaS Products",
    department: "Product",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Own the roadmap for one or more of EMINENCE's proprietary SaaS products. Work cross-functionally with engineering, design, and clients to ship high-impact features.",
    postedAt: "2026-08-01",
  },
  {
    id: "role-5",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Create intuitive, accessible, and visually compelling interfaces for enterprise web applications and SaaS products. Experience with Figma and design systems is required.",
    postedAt: "2026-08-02",
  },
  {
    id: "role-6",
    title: "Business Development Representative",
    department: "Sales",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Generate new pipeline for EMINENCE's services and software products. Conduct outreach, qualify leads, and collaborate with consultants to close deals in the mid-market segment.",
    postedAt: "2026-08-04",
  },
];

router.get("/careers/roles", async (req, res): Promise<void> => {
  res.json(ListRolesResponse.parse(OPEN_ROLES));
});

router.post("/careers/apply", async (req, res): Promise<void> => {
  const parsed = SubmitApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid job application body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { fullName, email, roleAppliedFor, coverNote, linkedinUrl } = parsed.data;

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
      message: "Application received. Our team will review it and be in touch within 5 business days.",
    })
  );
});

export default router;
