import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";

// src/routes/index.ts
import { Router as Router7 } from "express";

// src/routes/health.ts
import { Router } from "express";

// ../../lib/api-zod/src/generated/api.ts
import * as zod from "zod";
var HealthCheckResponse = zod.object({
  "status": zod.string()
});
var submitContactBodyNameMin = 2;
var submitContactBodyMessageMin = 10;
var SubmitContactBody = zod.object({
  "name": zod.string().min(submitContactBodyNameMin),
  "email": zod.string(),
  "company": zod.string().nullish(),
  "service": zod.string().nullish().describe("Which service they are enquiring about"),
  "message": zod.string().min(submitContactBodyMessageMin)
});
var SubmitContactResponse = zod.object({
  "success": zod.boolean(),
  "message": zod.string()
});
var SubscribeNewsletterBody = zod.object({
  "email": zod.string()
});
var SubscribeNewsletterResponse = zod.object({
  "success": zod.boolean(),
  "message": zod.string()
});
var ListRolesResponseItem = zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "department": zod.string(),
  "location": zod.string(),
  "type": zod.string().describe("Full-time, Part-time, Contract, Remote"),
  "description": zod.string(),
  "postedAt": zod.string().optional()
});
var ListRolesResponse = zod.array(ListRolesResponseItem);
var submitApplicationBodyFullNameMin = 2;
var SubmitApplicationBody = zod.object({
  "fullName": zod.string().min(submitApplicationBodyFullNameMin),
  "email": zod.string(),
  "roleAppliedFor": zod.string(),
  "coverNote": zod.string().nullish(),
  "linkedinUrl": zod.string().nullish()
});
var SubmitApplicationResponse = zod.object({
  "success": zod.boolean(),
  "message": zod.string()
});
var ListProductsResponseItem = zod.object({
  "id": zod.string(),
  "slug": zod.string(),
  "name": zod.string(),
  "tagline": zod.string(),
  "description": zod.string(),
  "category": zod.string(),
  "status": zod.string().describe("Live, Beta, Coming Soon"),
  "features": zod.array(zod.string()).optional(),
  "url": zod.string().nullish()
});
var ListProductsResponse = zod.array(ListProductsResponseItem);
var ListTestimonialsResponseItem = zod.object({
  "id": zod.string(),
  "clientName": zod.string(),
  "company": zod.string(),
  "role": zod.string(),
  "quote": zod.string(),
  "rating": zod.number(),
  "service": zod.string().optional()
});
var ListTestimonialsResponse = zod.array(ListTestimonialsResponseItem);
var ListBlogPostsResponseItem = zod.object({
  "id": zod.string(),
  "slug": zod.string(),
  "title": zod.string(),
  "excerpt": zod.string(),
  "author": zod.string(),
  "publishedAt": zod.string(),
  "category": zod.string(),
  "readTime": zod.string().optional()
});
var ListBlogPostsResponse = zod.array(ListBlogPostsResponseItem);
var GetStatsResponse = zod.object({
  "clientsServed": zod.number(),
  "projectsDelivered": zod.number(),
  "teamSize": zod.number(),
  "yearsActive": zod.number(),
  "countriesReached": zod.number(),
  "satisfactionRate": zod.number().optional()
});
var submitChatMessageBodyNameMin = 2;
var submitChatMessageBodyMessageMin = 3;
var SubmitChatMessageBody = zod.object({
  "name": zod.string().min(submitChatMessageBodyNameMin),
  "email": zod.string(),
  "message": zod.string().min(submitChatMessageBodyMessageMin)
});
var SubmitChatMessageResponse = zod.object({
  "success": zod.boolean(),
  "message": zod.string()
});

// src/routes/health.ts
var router = Router();
router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});
var health_default = router;

// src/routes/contact.ts
import { Router as Router2 } from "express";

// ../../lib/db/src/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// ../../lib/db/src/schema/index.ts
var schema_exports = {};
__export(schema_exports, {
  chatMessagesTable: () => chatMessagesTable,
  contactSubmissionsTable: () => contactSubmissionsTable,
  insertChatMessageSchema: () => insertChatMessageSchema,
  insertContactSchema: () => insertContactSchema,
  insertJobApplicationSchema: () => insertJobApplicationSchema,
  insertNewsletterSchema: () => insertNewsletterSchema,
  jobApplicationsTable: () => jobApplicationsTable,
  newsletterSubscribersTable: () => newsletterSubscribersTable
});

// ../../lib/db/src/schema/contact-submissions.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var contactSubmissionsTable = pgTable("contact_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});
var insertContactSchema = createInsertSchema(contactSubmissionsTable).omit({
  id: true,
  createdAt: true
});

// ../../lib/db/src/schema/newsletter-subscribers.ts
import { pgTable as pgTable2, text as text2, timestamp as timestamp2, uuid as uuid2 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema2 } from "drizzle-zod";
var newsletterSubscribersTable = pgTable2("newsletter_subscribers", {
  id: uuid2("id").primaryKey().defaultRandom(),
  email: text2("email").notNull().unique(),
  subscribedAt: timestamp2("subscribed_at", { withTimezone: true }).notNull().defaultNow()
});
var insertNewsletterSchema = createInsertSchema2(newsletterSubscribersTable).omit({
  id: true,
  subscribedAt: true
});

// ../../lib/db/src/schema/job-applications.ts
import { pgTable as pgTable3, text as text3, timestamp as timestamp3, uuid as uuid3 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema3 } from "drizzle-zod";
var jobApplicationsTable = pgTable3("job_applications", {
  id: uuid3("id").primaryKey().defaultRandom(),
  fullName: text3("full_name").notNull(),
  email: text3("email").notNull(),
  roleAppliedFor: text3("role_applied_for").notNull(),
  coverNote: text3("cover_note"),
  linkedinUrl: text3("linkedin_url"),
  submittedAt: timestamp3("submitted_at", { withTimezone: true }).notNull().defaultNow()
});
var insertJobApplicationSchema = createInsertSchema3(jobApplicationsTable).omit({
  id: true,
  submittedAt: true
});

// ../../lib/db/src/schema/chat-messages.ts
import { pgTable as pgTable4, text as text4, timestamp as timestamp4, uuid as uuid4 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema4 } from "drizzle-zod";
var chatMessagesTable = pgTable4("chat_messages", {
  id: uuid4("id").primaryKey().defaultRandom(),
  name: text4("name").notNull(),
  email: text4("email").notNull(),
  message: text4("message").notNull(),
  createdAt: timestamp4("created_at", { withTimezone: true }).notNull().defaultNow()
});
var insertChatMessageSchema = createInsertSchema4(chatMessagesTable).omit({
  id: true,
  createdAt: true
});

// ../../lib/db/src/index.ts
var { Pool } = pg;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle(pool, { schema: schema_exports });

// src/routes/contact.ts
var router2 = Router2();
router2.post("/contact", async (req, res) => {
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
    message
  });
  req.log.info({ email }, "Contact form submitted");
  res.json(SubmitContactResponse.parse({ success: true, message: "Your message has been received. We'll be in touch shortly." }));
});
var contact_default = router2;

// src/routes/newsletter.ts
import { Router as Router3 } from "express";
var router3 = Router3();
router3.post("/newsletter", async (req, res) => {
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
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("unique") || message.includes("duplicate")) {
      res.status(409).json({ error: "This email is already subscribed." });
      return;
    }
    throw err;
  }
});
var newsletter_default = router3;

// src/routes/careers.ts
import { Router as Router4 } from "express";
var router4 = Router4();
var OPEN_ROLES = [
  {
    id: "role-1",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Join our core engineering team to architect and build scalable web applications using React, Node.js, and PostgreSQL. You'll work on cutting-edge projects for enterprise clients and internal products.",
    postedAt: "2026-07-15"
  },
  {
    id: "role-2",
    title: "Cloud Infrastructure Engineer",
    department: "Cloud & DevOps",
    location: "Remote",
    type: "Full-time",
    description: "Design, deploy, and maintain multi-cloud infrastructure (AWS/GCP/Azure) for client workloads. Experience with Kubernetes, Terraform, and CI/CD pipelines is essential.",
    postedAt: "2026-07-22"
  },
  {
    id: "role-3",
    title: "Senior Technology Consultant",
    department: "Consultancy",
    location: "On-site / Travel",
    type: "Full-time",
    description: "Lead digital transformation engagements with enterprise clients. Guide technology strategy, facilitate workshops, and deliver actionable roadmaps for complex IT challenges.",
    postedAt: "2026-07-28"
  },
  {
    id: "role-4",
    title: "Product Manager \u2014 SaaS Products",
    department: "Product",
    location: "Hybrid",
    type: "Full-time",
    description: "Own the roadmap for one or more of EMINENCE's proprietary SaaS products. Work cross-functionally with engineering, design, and clients to ship high-impact features.",
    postedAt: "2026-08-01"
  },
  {
    id: "role-5",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create intuitive, accessible, and visually compelling interfaces for enterprise web applications and SaaS products. Experience with Figma and design systems is required.",
    postedAt: "2026-08-02"
  },
  {
    id: "role-6",
    title: "Business Development Representative",
    department: "Sales",
    location: "Hybrid",
    type: "Full-time",
    description: "Generate new pipeline for EMINENCE's services and software products. Conduct outreach, qualify leads, and collaborate with consultants to close deals in the mid-market segment.",
    postedAt: "2026-08-04"
  }
];
router4.get("/careers/roles", async (req, res) => {
  res.json(ListRolesResponse.parse(OPEN_ROLES));
});
router4.post("/careers/apply", async (req, res) => {
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
    linkedinUrl: linkedinUrl ?? null
  });
  req.log.info({ email, roleAppliedFor }, "Job application submitted");
  res.json(
    SubmitApplicationResponse.parse({
      success: true,
      message: "Application received. Our team will review it and be in touch within 5 business days."
    })
  );
});
var careers_default = router4;

// src/routes/chat.ts
import { Router as Router5 } from "express";
var router5 = Router5();
router5.post("/chat", async (req, res) => {
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
      message: "Message received! A member of our team will respond to your email shortly."
    })
  );
});
var chat_default = router5;

// src/routes/content.ts
import { Router as Router6 } from "express";
var router6 = Router6();
var PRODUCTS = [
  {
    id: "prod-1",
    slug: "nexus-erp",
    name: "Nexus ERP",
    tagline: "Enterprise resource planning reimagined for the modern cloud.",
    description: "Nexus ERP is a fully integrated enterprise platform covering finance, procurement, inventory, HR, and CRM in a single unified system. Built for mid-to-large enterprises seeking to eliminate data silos and accelerate decision-making.",
    category: "Enterprise Software",
    status: "Live",
    features: [
      "Real-time financial reporting and analytics",
      "Multi-entity, multi-currency support",
      "Role-based access control with SSO integration",
      "Automated procurement and vendor management",
      "Integrated HR and payroll module",
      "REST API and webhook ecosystem"
    ],
    url: "https://nexus.eminencetech.io"
  },
  {
    id: "prod-2",
    slug: "servicehub",
    name: "ServiceHub",
    tagline: "The service sourcing platform that connects businesses with vetted professionals.",
    description: "ServiceHub is a B2B marketplace that connects companies with pre-vetted service providers across IT, legal, finance, logistics, and more. Smart matching algorithms surface the right providers for each engagement.",
    category: "Marketplace Platform",
    status: "Live",
    features: [
      "AI-powered provider matching",
      "End-to-end contract and payment management",
      "Escrow-protected milestone payments",
      "Provider rating and review system",
      "Real-time project communication tools",
      "Analytics dashboard for procurement teams"
    ],
    url: "https://servicehub.eminencetech.io"
  },
  {
    id: "prod-3",
    slug: "cloudvault",
    name: "CloudVault",
    tagline: "Secure document management and e-signature for regulated industries.",
    description: "CloudVault provides enterprise-grade document storage, version control, and legally-binding e-signatures for industries operating under strict compliance requirements \u2014 financial services, healthcare, legal, and government.",
    category: "Document Management",
    status: "Live",
    features: [
      "SOC 2 Type II and ISO 27001 compliant",
      "Legally binding e-signatures (eIDAS, ESIGN)",
      "Automated retention and destruction policies",
      "Granular permission management",
      "Audit trail with tamper-evident logging",
      "Integrates with SharePoint, Salesforce, and SAP"
    ],
    url: "https://cloudvault.eminencetech.io"
  },
  {
    id: "prod-4",
    slug: "insightiq",
    name: "InsightIQ",
    tagline: "Business intelligence that speaks plain English.",
    description: "InsightIQ is a no-code BI platform that lets business users ask questions in natural language and receive instant, accurate visualizations and reports. Connect any data source in minutes.",
    category: "Business Intelligence",
    status: "Beta",
    features: [
      "Natural language query interface",
      "Connects to 50+ data sources out of the box",
      "Auto-generated dashboards from schema inference",
      "Collaborative annotations and sharing",
      "Scheduled reports via email or Slack",
      "Embedded analytics SDK for SaaS apps"
    ],
    url: null
  },
  {
    id: "prod-5",
    slug: "fieldops",
    name: "FieldOps",
    tagline: "Mobile-first field service management for distributed teams.",
    description: "FieldOps gives operations managers and field technicians everything they need to coordinate jobs, track assets, and close work orders in real time \u2014 even offline.",
    category: "Field Service Management",
    status: "Beta",
    features: [
      "Offline-capable mobile app (iOS and Android)",
      "GPS-based technician tracking and dispatch",
      "Digital work orders with photo capture",
      "Parts and inventory management",
      "Customer signature capture on-site",
      "Integration with major ERP systems"
    ],
    url: null
  },
  {
    id: "prod-6",
    slug: "auditpilot",
    name: "AuditPilot",
    tagline: "Automated compliance auditing for ISO, SOC, and GDPR frameworks.",
    description: "AuditPilot continuously monitors your infrastructure and processes against compliance frameworks, identifies gaps, and auto-generates evidence packages for auditors \u2014 reducing audit preparation time by up to 80%.",
    category: "Compliance & Security",
    status: "Coming Soon",
    features: [
      "Continuous control monitoring",
      "Auto-generated evidence collection",
      "Multi-framework support (ISO 27001, SOC 2, GDPR, HIPAA)",
      "Risk register with remediation workflows",
      "Direct auditor collaboration portal",
      "Integration with AWS, GCP, Azure, and GitHub"
    ],
    url: null
  }
];
var TESTIMONIALS = [
  {
    id: "t-1",
    clientName: "James Okafor",
    company: "Meridian Capital Group",
    role: "Chief Information Officer",
    quote: "EMINENCE transformed our entire technology stack in under six months. Their team brought both the strategic clarity we needed and the technical depth to execute flawlessly. The migration to their cloud infrastructure alone saved us 40% in annual operational costs.",
    rating: 5,
    service: "Cloud Hosting"
  },
  {
    id: "t-2",
    clientName: "Sophia Chen",
    company: "Arco Manufacturing Ltd",
    role: "VP of Operations",
    quote: "Implementing Nexus ERP across our three business units was a project we had delayed for years out of fear of disruption. EMINENCE's consultancy team made it seamless. We went live on schedule and our inventory accuracy jumped from 78% to 97% within the first quarter.",
    rating: 5,
    service: "Software Solutions"
  },
  {
    id: "t-3",
    clientName: "David Mensah",
    company: "Kora Insurance PLC",
    role: "Head of Digital Transformation",
    quote: "The custom document management system EMINENCE built for us handles over two million policy documents with full regulatory compliance. Their attention to security and auditability was exceptional \u2014 something our internal team simply could not have achieved at this scale.",
    rating: 5,
    service: "Software Solutions"
  },
  {
    id: "t-4",
    clientName: "Priya Nair",
    company: "TalentBridge Africa",
    role: "CEO",
    quote: "We chose ServiceHub as the foundation for our staffing marketplace. The platform's robustness gave us instant credibility with enterprise clients from day one. EMINENCE's support team was phenomenal through every phase of the launch.",
    rating: 5,
    service: "Consultancy"
  },
  {
    id: "t-5",
    clientName: "Marcus van der Berg",
    company: "Syntex Logistics",
    role: "Director of IT",
    quote: "EMINENCE's cloud team migrated our legacy on-premise system to a containerised cloud environment without a single hour of unplanned downtime. Their infrastructure expertise is genuinely world-class.",
    rating: 5,
    service: "Cloud Hosting"
  },
  {
    id: "t-6",
    clientName: "Amara Osei",
    company: "Verdant Agri-Tech",
    role: "CTO",
    quote: "From discovery workshops to go-live, EMINENCE's consultancy engagement was the most structured and productive we've ever experienced. They challenged our assumptions, brought fresh perspectives, and delivered a technology strategy that's guiding us for the next five years.",
    rating: 5,
    service: "Consultancy"
  }
];
var BLOG_POSTS = [
  {
    id: "blog-1",
    slug: "why-cloud-native-is-non-negotiable-in-2026",
    title: "Why Cloud-Native Architecture Is Non-Negotiable in 2026",
    excerpt: "The performance gap between cloud-native and legacy on-premise systems has grown too large to ignore. We break down what cloud-native actually means, why enterprises are accelerating migration, and the hidden costs of waiting.",
    author: "Emmanuel Asante",
    publishedAt: "2026-08-01",
    category: "Cloud",
    readTime: "7 min read"
  },
  {
    id: "blog-2",
    slug: "building-enterprise-software-that-actually-gets-used",
    title: "Building Enterprise Software That Actually Gets Used",
    excerpt: "The graveyard of unused enterprise software is vast. Adoption failure is almost never a technical problem \u2014 it's a people and process problem. Here's how EMINENCE approaches software delivery to ensure what we build gets embedded into daily workflows.",
    author: "Ife Adeyemi",
    publishedAt: "2026-07-22",
    category: "Software Solutions",
    readTime: "9 min read"
  },
  {
    id: "blog-3",
    slug: "the-real-cost-of-compliance-debt",
    title: "The Real Cost of Compliance Debt \u2014 and How to Stop Paying It",
    excerpt: "Compliance debt is the accumulation of unresolved gaps between your current controls and the standards you're supposed to meet. Like technical debt, it compounds. We quantify what it actually costs and how continuous compliance monitoring changes the economics.",
    author: "Sandra Mensah-Bonsu",
    publishedAt: "2026-07-10",
    category: "Security & Compliance",
    readTime: "6 min read"
  },
  {
    id: "blog-4",
    slug: "five-signs-your-business-needs-a-technology-consultant",
    title: "Five Signs Your Business Needs a Technology Consultant",
    excerpt: "Most businesses bring in a technology consultant too late \u2014 after costly decisions have already been made. Learn the early warning signs that it's time to bring in external expertise before the pain becomes expensive.",
    author: "Kwame Darko",
    publishedAt: "2026-06-28",
    category: "Consultancy",
    readTime: "5 min read"
  },
  {
    id: "blog-5",
    slug: "designing-multi-tenant-saas-architecture",
    title: "Designing Multi-Tenant SaaS Architecture for Scale",
    excerpt: "Multi-tenancy is one of the most consequential architectural decisions a SaaS product will make. We walk through the three primary models \u2014 pooled, siloed, and hybrid \u2014 and explain when to choose each, with real-world trade-offs.",
    author: "Emmanuel Asante",
    publishedAt: "2026-06-15",
    category: "Software Solutions",
    readTime: "11 min read"
  },
  {
    id: "blog-6",
    slug: "ai-in-enterprise-separating-signal-from-noise",
    title: "AI in the Enterprise: Separating Signal from Noise",
    excerpt: "Every enterprise technology conversation now involves AI. We cut through the hype to identify where AI genuinely delivers ROI in enterprise operations \u2014 and where the business case simply does not hold up.",
    author: "Ife Adeyemi",
    publishedAt: "2026-06-03",
    category: "Technology",
    readTime: "8 min read"
  }
];
var STATS = {
  clientsServed: 180,
  projectsDelivered: 340,
  teamSize: 95,
  yearsActive: 8,
  countriesReached: 24,
  satisfactionRate: 98
};
router6.get("/products", async (req, res) => {
  res.json(ListProductsResponse.parse(PRODUCTS));
});
router6.get("/testimonials", async (req, res) => {
  res.json(ListTestimonialsResponse.parse(TESTIMONIALS));
});
router6.get("/blog/posts", async (req, res) => {
  res.json(ListBlogPostsResponse.parse(BLOG_POSTS));
});
router6.get("/stats", async (req, res) => {
  res.json(GetStatsResponse.parse(STATS));
});
var content_default = router6;

// src/routes/index.ts
var router7 = Router7();
router7.use(health_default);
router7.use(contact_default);
router7.use(newsletter_default);
router7.use(careers_default);
router7.use(chat_default);
router7.use(content_default);
var routes_default = router7;

// src/lib/logger.ts
import pino from "pino";
var isProduction = process.env.NODE_ENV === "production";
var logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']"
  ],
  ...isProduction ? {} : {
    transport: {
      target: "pino-pretty",
      options: { colorize: true }
    }
  }
});

// src/app.ts
var app = express();
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0]
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode
        };
      }
    }
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes_default);
var app_default = app;

// src/index.ts
var rawPort = process.env["PORT"];
if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided."
  );
}
var port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}
app_default.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
//# sourceMappingURL=index.mjs.map
