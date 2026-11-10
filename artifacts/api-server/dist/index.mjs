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
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import pinoHttp from "pino-http";

// src/routes/index.ts
import { Router as Router11 } from "express";

// src/routes/health.ts
import { Router } from "express";

// ../../lib/api-zod/src/generated/api.ts
import * as zod from "zod";
var GetSitePagesResponse = zod.record(zod.string(), zod.record(zod.string(), zod.string()));
var GetContentSchemaResponse = zod.object({
  "collections": zod.record(zod.string(), zod.array(zod.object({
    "key": zod.string(),
    "label": zod.string(),
    "type": zod.enum(["text", "long", "number", "list", "choice", "link", "image"]),
    "required": zod.boolean().optional(),
    "choices": zod.array(zod.string()).optional()
  }))),
  "pages": zod.record(zod.string(), zod.array(zod.object({
    "key": zod.string(),
    "label": zod.string(),
    "type": zod.enum(["text", "long", "number", "list", "choice", "link", "image"]),
    "required": zod.boolean().optional(),
    "choices": zod.array(zod.string()).optional()
  })))
});
var ListContentRecordsParams = zod.object({
  "kind": zod.coerce.string()
});
var ListContentRecordsResponseItem = zod.object({
  "kind": zod.string(),
  "id": zod.string(),
  "data": zod.record(zod.string(), zod.unknown()),
  "publishedData": zod.record(zod.string(), zod.unknown()).nullable(),
  "published": zod.boolean(),
  "position": zod.number(),
  "version": zod.number(),
  "updatedAt": zod.string()
});
var ListContentRecordsResponse = zod.array(ListContentRecordsResponseItem);
var SaveContentRecordParams = zod.object({
  "kind": zod.coerce.string(),
  "id": zod.coerce.string()
});
var SaveContentRecordBody = zod.object({
  "data": zod.record(zod.string(), zod.unknown()),
  "version": zod.number(),
  "position": zod.number(),
  "action": zod.enum(["save", "publish", "unpublish"])
});
var SaveContentRecordResponse = zod.object({
  "kind": zod.string(),
  "id": zod.string(),
  "data": zod.record(zod.string(), zod.unknown()),
  "publishedData": zod.record(zod.string(), zod.unknown()).nullable(),
  "published": zod.boolean(),
  "position": zod.number(),
  "version": zod.number(),
  "updatedAt": zod.string()
});
var DeleteContentRecordParams = zod.object({
  "kind": zod.coerce.string(),
  "id": zod.coerce.string()
});
var DeleteContentRecordBody = zod.object({
  "version": zod.number()
});
var DeleteContentRecordResponse = zod.object({
  "success": zod.boolean()
});
var ListBookingRepliesParams = zod.object({
  "id": zod.coerce.string()
});
var ListBookingRepliesResponseItem = zod.object({
  "id": zod.string(),
  "bookingId": zod.string(),
  "recipient": zod.string(),
  "subject": zod.string(),
  "message": zod.string(),
  "kind": zod.string(),
  "status": zod.string(),
  "appointmentAt": zod.string().nullable(),
  "error": zod.string().nullable(),
  "createdAt": zod.string(),
  "sentAt": zod.string().nullable()
});
var ListBookingRepliesResponse = zod.array(ListBookingRepliesResponseItem);
var SendBookingReplyParams = zod.object({
  "id": zod.coerce.string()
});
var SendBookingReplyBody = zod.object({
  "id": zod.string(),
  "subject": zod.string(),
  "message": zod.string(),
  "kind": zod.enum(["message", "confirm", "propose"]),
  "appointmentAt": zod.string().optional()
});
var SendBookingReplyResponse = zod.object({
  "id": zod.string(),
  "bookingId": zod.string(),
  "recipient": zod.string(),
  "subject": zod.string(),
  "message": zod.string(),
  "kind": zod.string(),
  "status": zod.string(),
  "appointmentAt": zod.string().nullable(),
  "error": zod.string().nullable(),
  "createdAt": zod.string(),
  "sentAt": zod.string().nullable()
});
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
  "message": zod.string().min(submitContactBodyMessageMin),
  "website": zod.string().nullish().describe("Honeypot field; must remain empty")
});
var SubmitContactResponse = zod.object({
  "success": zod.boolean(),
  "message": zod.string()
});
var submitBookingBodyNameMin = 2;
var submitBookingBodyNameMax = 120;
var submitBookingBodyCompanyMin = 2;
var submitBookingBodyCompanyMax = 160;
var submitBookingBodyPhoneMax = 40;
var submitBookingBodyTopicMin = 2;
var submitBookingBodyTopicMax = 160;
var submitBookingBodyMessageMax = 3e3;
var submitBookingBodyTimezoneMax = 100;
var SubmitBookingBody = zod.object({
  "name": zod.string().min(submitBookingBodyNameMin).max(submitBookingBodyNameMax),
  "email": zod.string(),
  "company": zod.string().min(submitBookingBodyCompanyMin).max(submitBookingBodyCompanyMax),
  "phone": zod.string().max(submitBookingBodyPhoneMax).nullish(),
  "topic": zod.string().min(submitBookingBodyTopicMin).max(submitBookingBodyTopicMax),
  "message": zod.string().max(submitBookingBodyMessageMax).nullish(),
  "preferredAt": zod.coerce.date(),
  "timezone": zod.string().min(1).max(submitBookingBodyTimezoneMax),
  "website": zod.string().nullish().describe("Honeypot field; must remain empty")
});
var SubmitBookingResponse = zod.object({
  "success": zod.boolean(),
  "message": zod.string()
});
var adminLoginBodyEmailMax = 254;
var adminLoginBodyPasswordMax = 1024;
var AdminLoginBody = zod.object({
  "email": zod.string().max(adminLoginBodyEmailMax),
  "password": zod.string().max(adminLoginBodyPasswordMax)
});
var AdminLoginResponse = zod.object({
  "email": zod.string(),
  "csrfToken": zod.string()
});
var GetAdminSessionResponse = zod.object({
  "email": zod.string(),
  "csrfToken": zod.string()
});
var AdminLogoutResponse = zod.unknown();
var ListBookingsResponseItem = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "email": zod.string(),
  "company": zod.string(),
  "phone": zod.string().nullish(),
  "topic": zod.string(),
  "message": zod.string().nullish(),
  "preferredAt": zod.string(),
  "timezone": zod.string(),
  "status": zod.enum(["new", "contacted", "scheduled", "completed", "cancelled", "spam"]),
  "internalNotes": zod.string().nullish(),
  "createdAt": zod.string(),
  "updatedAt": zod.string()
});
var ListBookingsResponse = zod.array(ListBookingsResponseItem);
var UpdateBookingParams = zod.object({
  "id": zod.coerce.string()
});
var updateBookingBodyInternalNotesMax = 5e3;
var UpdateBookingBody = zod.object({
  "status": zod.enum(["new", "contacted", "scheduled", "completed", "cancelled", "spam"]).optional(),
  "internalNotes": zod.string().max(updateBookingBodyInternalNotesMax).nullish()
});
var UpdateBookingResponse = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "email": zod.string(),
  "company": zod.string(),
  "phone": zod.string().nullish(),
  "topic": zod.string(),
  "message": zod.string().nullish(),
  "preferredAt": zod.string(),
  "timezone": zod.string(),
  "status": zod.enum(["new", "contacted", "scheduled", "completed", "cancelled", "spam"]),
  "internalNotes": zod.string().nullish(),
  "createdAt": zod.string(),
  "updatedAt": zod.string()
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
  "body": zod.string().optional().describe("Article body with limited paragraph, heading, quote and list formatting."),
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
  bookingRepliesTable: () => bookingRepliesTable,
  chatMessagesTable: () => chatMessagesTable,
  consultationBookingsTable: () => consultationBookingsTable,
  contactSubmissionsTable: () => contactSubmissionsTable,
  insertChatMessageSchema: () => insertChatMessageSchema,
  insertConsultationBookingSchema: () => insertConsultationBookingSchema,
  insertContactSchema: () => insertContactSchema,
  insertJobApplicationSchema: () => insertJobApplicationSchema,
  insertNewsletterSchema: () => insertNewsletterSchema,
  jobApplicationsTable: () => jobApplicationsTable,
  newsletterSubscribersTable: () => newsletterSubscribersTable,
  siteContentTable: () => siteContentTable,
  siteSeedsTable: () => siteSeedsTable
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

// ../../lib/db/src/schema/consultation-bookings.ts
import { pgTable as pgTable5, text as text5, timestamp as timestamp5, uuid as uuid5 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema5 } from "drizzle-zod";
var consultationBookingsTable = pgTable5("consultation_bookings", {
  id: uuid5("id").primaryKey().defaultRandom(),
  name: text5("name").notNull(),
  email: text5("email").notNull(),
  company: text5("company").notNull(),
  phone: text5("phone"),
  topic: text5("topic").notNull(),
  message: text5("message"),
  preferredAt: timestamp5("preferred_at", { withTimezone: true }).notNull(),
  timezone: text5("timezone").notNull(),
  status: text5("status").notNull().default("new"),
  internalNotes: text5("internal_notes"),
  createdAt: timestamp5("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp5("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var insertConsultationBookingSchema = createInsertSchema5(
  consultationBookingsTable
).omit({ id: true, createdAt: true, updatedAt: true });

// ../../lib/db/src/schema/site-content.ts
import {
  pgTable as pgTable6,
  text as text6,
  integer,
  jsonb,
  boolean as boolean2,
  timestamp as timestamp6,
  primaryKey,
  foreignKey,
  uuid as uuid6
} from "drizzle-orm/pg-core";
var siteContentTable = pgTable6(
  "site_content",
  {
    kind: text6("kind").notNull(),
    id: text6("id").notNull(),
    data: jsonb("data").$type().notNull(),
    publishedData: jsonb("published_data").$type(),
    published: boolean2("published").notNull().default(false),
    position: integer("position").notNull().default(0),
    publishedPosition: integer("published_position").notNull().default(0),
    version: integer("version").notNull().default(1),
    updatedAt: timestamp6("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [primaryKey({ name: "site_content_pkey", columns: [table.kind, table.id] })]
);
var siteSeedsTable = pgTable6("site_seeds", {
  name: text6("name").primaryKey(),
  createdAt: timestamp6("created_at", { withTimezone: true }).notNull().defaultNow()
});
var bookingRepliesTable = pgTable6("booking_replies", {
  id: uuid6("id").primaryKey(),
  bookingId: uuid6("booking_id").notNull(),
  recipient: text6("recipient").notNull(),
  subject: text6("subject").notNull(),
  message: text6("message").notNull(),
  kind: text6("kind").notNull(),
  appointmentAt: timestamp6("appointment_at", { withTimezone: true }),
  status: text6("status").notNull().default("pending"),
  error: text6("error"),
  createdAt: timestamp6("created_at", { withTimezone: true }).notNull().defaultNow(),
  sentAt: timestamp6("sent_at", { withTimezone: true })
}, (table) => [foreignKey({ name: "booking_replies_booking_id_fkey", columns: [table.bookingId], foreignColumns: [consultationBookingsTable.id] })]);

// ../../lib/db/src/index.ts
var { Pool } = pg;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle(pool, { schema: schema_exports });

// src/lib/contact-notification.ts
import nodemailer from "nodemailer";

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

// src/lib/contact-notification.ts
var notificationRecipient = process.env["CONTACT_NOTIFICATION_TO"] || "info@eminence.co.ug";
function escapeHtml(value) {
  return value.replace(
    /[&<>'"]/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]
  );
}
function getSmtpConfig() {
  const host = process.env["SMTP_HOST"];
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  const port2 = Number(process.env["SMTP_PORT"] || "465");
  if (!host || !user || !pass) return null;
  if (!Number.isInteger(port2) || port2 <= 0 || port2 > 65535) {
    throw new Error(`Invalid SMTP_PORT value: ${process.env["SMTP_PORT"]}`);
  }
  return { host, user, pass, port: port2 };
}
async function sendSystemEmail(to, subject, htmlContent, replyTo, requireDelivery = false) {
  const config = getSmtpConfig();
  if (!config) {
    if (requireDelivery) throw new Error("SMTP is not configured");
    logger.warn(
      { recipient: to },
      "Email skipped: SMTP_HOST, SMTP_USER, or SMTP_PASS is not configured"
    );
    return;
  }
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    connectionTimeout: 1e4,
    greetingTimeout: 1e4,
    socketTimeout: 2e4,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });
  const result = await transporter.sendMail({
    from: `"Eminence Services" <${config.user}>`,
    to,
    replyTo,
    subject,
    html: htmlContent
  });
  if (requireDelivery && !result.accepted?.length)
    throw new Error("Mail server did not accept the recipient");
}
async function sendContactNotification(submission) {
  const subject = submission.service ? `New ${submission.service} enquiry from ${submission.name}` : `New website enquiry from ${submission.name}`;
  const fields = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Company", submission.company],
    ["Service", submission.service]
  ].filter((field2) => Boolean(field2[1]));
  const html = `<h2>${escapeHtml(subject)}</h2>${fields.map(
    ([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`
  ).join(
    ""
  )}<h3>Message</h3><p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>`;
  await sendSystemEmail(notificationRecipient, subject, html, submission.email);
}

// src/lib/rate-limit.ts
var attempts = /* @__PURE__ */ new Map();
function publicFormRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const existing = attempts.get(key);
  const entry = !existing || existing.resetAt <= now ? { count: 0, resetAt: now + 15 * 60 * 1e3 } : existing;
  entry.count += 1;
  attempts.set(key, entry);
  res.setHeader("X-RateLimit-Limit", "5");
  res.setHeader("X-RateLimit-Remaining", String(Math.max(0, 5 - entry.count)));
  if (entry.count > 5) {
    res.setHeader("Retry-After", String(Math.ceil((entry.resetAt - now) / 1e3)));
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }
  if (attempts.size > 1e4) {
    for (const [attemptKey, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(attemptKey);
    }
  }
  next();
}

// src/routes/contact.ts
var router2 = Router2();
router2.post("/contact", publicFormRateLimit, async (req, res) => {
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
    message
  });
  try {
    await sendContactNotification({ name, email, company, service, message });
  } catch (err) {
    req.log.error({ err }, "Contact notification email failed");
  }
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
import { Router as Router6 } from "express";

// src/routes/site-content.ts
import { Router as Router5 } from "express";
import { and, eq, asc, sql } from "drizzle-orm";

// src/lib/admin-auth.ts
import { createHash, randomBytes, timingSafeEqual as timingSafeEqual2 } from "node:crypto";
import {
  Router as Router4
} from "express";

// src/lib/admin-password.ts
import { scrypt, timingSafeEqual } from "node:crypto";
async function verifyPassword(encoded, password) {
  const match = /^scrypt:131072:8:1:([a-f0-9]{32}):([a-f0-9]{128})$/.exec(
    encoded
  );
  if (!match) throw new Error("Invalid password hash configuration");
  const salt = match[1];
  const expected = Buffer.from(match[2], "hex");
  const actual = await new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      64,
      { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 },
      (error, key) => error ? reject(error) : resolve(key)
    );
  });
  return timingSafeEqual(actual, expected);
}

// src/lib/admin-auth.ts
var COOKIE = "eminence_admin_session";
var TTL = 8 * 60 * 60 * 1e3;
var sessions = /* @__PURE__ */ new Map();
var attempts2 = /* @__PURE__ */ new Map();
var verifying = 0;
var digest = (value) => createHash("sha256").update(value).digest("hex");
var identity = () => digest(`${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD_HASH}`);
var cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/admin"
});
function sessionKey(req) {
  const raw = req.headers.cookie?.split(";").map((v) => v.trim()).find((v) => v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  return digest(raw || "");
}
function session(req) {
  const key = sessionKey(req);
  const value = sessions.get(key);
  if (value && value.expires > Date.now() && value.identity === identity())
    return value;
  sessions.delete(key);
  return void 0;
}
var cleanup = setInterval(() => {
  for (const [key, value] of sessions)
    if (value.expires <= Date.now()) sessions.delete(key);
  for (const [key, value] of attempts2)
    if (value.expires <= Date.now()) attempts2.delete(key);
}, 6e4);
cleanup.unref();
function requireAdmin(req, res, next) {
  res.setHeader("Cache-Control", "no-store");
  const current = session(req);
  if (!current) {
    res.status(401).json({ error: "Please sign in." });
    return;
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const supplied = req.get("X-CSRF-Token") || "";
    if (!timingSafeEqual2(
      Buffer.from(digest(supplied)),
      Buffer.from(digest(current.csrf))
    )) {
      res.status(403).json({ error: "Invalid session token. Refresh and try again." });
      return;
    }
  }
  next();
}
var adminAuthRouter = Router4();
adminAuthRouter.use("/admin", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
adminAuthRouter.post("/admin/login", async (req, res) => {
  if (req.get("X-Admin-Request") !== "1" || !req.is("application/json") || req.get("Sec-Fetch-Site") === "cross-site") {
    res.status(403).json({ error: "Sign in from the admin page." });
    return;
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!email || !hash) {
    res.status(503).json({
      error: "Administrator login is not configured. Run the administrator setup command on the API server."
    });
    return;
  }
  const ip = req.ip || "unknown";
  let limit = attempts2.get(ip);
  if (!limit || limit.expires <= Date.now()) {
    if (attempts2.size >= 1e4) {
      res.status(429).json({ error: "Too many sign-in attempts. Try again later." });
      return;
    }
    limit = { count: 0, expires: Date.now() + 15 * 60 * 1e3 };
    attempts2.set(ip, limit);
  }
  if (limit.count >= 5 || verifying >= 2) {
    res.setHeader(
      "Retry-After",
      Math.max(1, Math.ceil((limit.expires - Date.now()) / 1e3))
    );
    res.status(429).json({ error: "Too many sign-in attempts. Try again in 15 minutes." });
    return;
  }
  limit.count++;
  const { email: suppliedEmail, password } = req.body || {};
  if (typeof suppliedEmail !== "string" || typeof password !== "string" || password.length > 1024 || suppliedEmail.length > 254) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }
  verifying++;
  let valid = false;
  try {
    valid = await verifyPassword(hash, password);
  } catch {
    res.status(503).json({
      error: "Administrator password configuration is invalid. Run administrator setup again."
    });
    return;
  } finally {
    verifying--;
  }
  if (!valid || suppliedEmail.trim().toLowerCase() !== email) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }
  attempts2.delete(ip);
  sessions.delete(sessionKey(req));
  if (sessions.size >= 1e3) sessions.delete(sessions.keys().next().value);
  const token = randomBytes(32).toString("hex");
  const csrf = randomBytes(32).toString("hex");
  sessions.set(digest(token), {
    csrf,
    expires: Date.now() + TTL,
    identity: identity()
  });
  res.cookie(COOKIE, token, { ...cookieOptions(), maxAge: TTL });
  res.json({ email, csrfToken: csrf });
});
adminAuthRouter.get("/admin/session", requireAdmin, (req, res) => {
  res.json({ email: process.env.ADMIN_EMAIL, csrfToken: session(req).csrf });
});
adminAuthRouter.post("/admin/logout", requireAdmin, (req, res) => {
  sessions.delete(sessionKey(req));
  res.clearCookie(COOKIE, cookieOptions());
  res.json({ success: true });
});

// src/lib/content-model.ts
import { z } from "zod";

// src/data/page-defaults.ts
var pageDefaults = {
  about: {
    "001": {
      label: "Radical Focus",
      value: "Radical Focus",
      kind: "text"
    },
    "002": {
      label: "We do not get distracted by the latest shiny framework. We choose the right tool for the j",
      value: "We do not get distracted by the latest shiny framework. We choose the right tool for the job, optimizing for stability and maintainability over hype.",
      kind: "text"
    },
    "003": {
      label: "Uncompromising Craft",
      value: "Uncompromising Craft",
      kind: "text"
    },
    "004": {
      label: "Good enough is a failure condition. We engineer systems designed to withstand edge cases, ",
      value: "Good enough is a failure condition. We engineer systems designed to withstand edge cases, traffic spikes, and the test of time.",
      kind: "text"
    },
    "005": {
      label: "Default Secure",
      value: "Default Secure",
      kind: "text"
    },
    "006": {
      label: "Security is not a feature added at the end of a sprint. It is foundational to every archit",
      value: "Security is not a feature added at the end of a sprint. It is foundational to every architectural decision we make.",
      kind: "text"
    },
    "007": {
      label: "Egoless Collaboration",
      value: "Egoless Collaboration",
      kind: "text"
    },
    "008": {
      label: "The best idea wins, regardless of title. We partner closely with our clients, treating the",
      value: "The best idea wins, regardless of title. We partner closely with our clients, treating their success as our only metric.",
      kind: "text"
    },
    "009": {
      label: "We engineer the",
      value: "We engineer the ",
      kind: "text"
    },
    "010": {
      label: "foundation",
      value: "foundation",
      kind: "text"
    },
    "011": {
      label: "for digital leaders.",
      value: " for digital leaders.",
      kind: "text"
    },
    "012": {
      label: "EMINENCE was founded on a simple premise: enterprise software is too fragile. We assemble ",
      value: "EMINENCE was founded on a simple premise: enterprise software is too fragile. We assemble elite engineering teams to build resilient systems for companies that cannot afford to fail.",
      kind: "text"
    },
    "013": {
      label: "Founded 2018",
      value: "Founded 2018",
      kind: "text"
    },
    "014": {
      label: "Born from the frustration of fragile systems.",
      value: "Born from the frustration of fragile systems.",
      kind: "text"
    },
    "015": {
      label: "Our Story",
      value: "Our Story",
      kind: "text"
    },
    "016": {
      label: "EMINENCE began when a group of senior infrastructure engineers grew tired of fixing the sa",
      value: "EMINENCE began when a group of senior infrastructure engineers grew tired of fixing the same architectural mistakes across different companies.",
      kind: "text"
    },
    "017": {
      label: "We saw organizations pouring millions into superficial digital transformations while their",
      value: "We saw organizations pouring millions into superficial digital transformations while their core infrastructure crumbled under load. Tech debt was treated as a cost of doing business rather than an existential risk.",
      kind: "text"
    },
    "018": {
      label: "We built this company to be the antidote. A technology partner that tells the hard truths,",
      value: "We built this company to be the antidote. A technology partner that tells the hard truths, writes defensive code, and architects for the worst-case scenario. Over the years, we've rescued failing projects, migrated monoliths to the cloud without downtime, and built zero-to-one products that process billions of events.",
      kind: "text"
    },
    "019": {
      label: "Our Core Values",
      value: "Our Core Values",
      kind: "text"
    },
    "020": {
      label: "The principles that govern how we write code, design systems, and interact with our partne",
      value: "The principles that govern how we write code, design systems, and interact with our partners.",
      kind: "text"
    },
    "021": {
      label: "Join the Elite",
      value: "Join the Elite",
      kind: "text"
    },
    "022": {
      label: "We are always looking for exceptional engineers who care deeply about their craft. If you ",
      value: "We are always looking for exceptional engineers who care deeply about their craft. If you want to solve hard problems with smart people, we should talk.",
      kind: "text"
    },
    "023": {
      label: "View Open Roles",
      value: "View Open Roles ",
      kind: "text"
    }
  },
  "blog-post": {
    "001": {
      label: "Back to Blog",
      value: "Back to Blog",
      kind: "text"
    },
    "002": {
      label: "Engineering Team",
      value: "Engineering Team",
      kind: "text"
    },
    "018": {
      label: "Enjoyed this article?",
      value: "Enjoyed this article?",
      kind: "text"
    },
    "019": {
      label: "Share on Twitter",
      value: "Share on Twitter",
      kind: "text"
    },
    "020": {
      label: "Share on LinkedIn",
      value: "Share on LinkedIn",
      kind: "text"
    }
  },
  blog: {
    "001": {
      label: "Engineering",
      value: "Engineering ",
      kind: "text"
    },
    "002": {
      label: "Insights",
      value: "Insights",
      kind: "text"
    },
    "003": {
      label: "Technical deep-dives, architectural case studies, and engineering culture thoughts from th",
      value: "Technical deep-dives, architectural case studies, and engineering culture thoughts from the EMINENCE team.",
      kind: "text"
    },
    "004": {
      label: "Never miss an update",
      value: "Never miss an update",
      kind: "text"
    },
    "005": {
      label: "Get our latest technical articles and company news delivered straight to your inbox.",
      value: "Get our latest technical articles and company news delivered straight to your inbox.",
      kind: "text"
    },
    "006": {
      label: "Subscribe to Newsletter",
      value: "Subscribe to Newsletter",
      kind: "text"
    }
  },
  careers: {
    "001": {
      label: "Application Submitted",
      value: "Application Submitted",
      kind: "text"
    },
    "002": {
      label: "We'll review your details and get back to you soon.",
      value: "We'll review your details and get back to you soon.",
      kind: "text"
    },
    "003": {
      label: "Submission Failed",
      value: "Submission Failed",
      kind: "text"
    },
    "004": {
      label: "There was an error submitting your application.",
      value: "There was an error submitting your application.",
      kind: "text"
    },
    "005": {
      label: "Join the Team",
      value: "Join the Team",
      kind: "text"
    },
    "006": {
      label: "Do the best work of your",
      value: "Do the best work of your ",
      kind: "text"
    },
    "007": {
      label: "career.",
      value: "career.",
      kind: "text"
    },
    "008": {
      label: "We're a team of engineers, designers, and strategists obsessed with craft. We tackle hard ",
      value: "We're a team of engineers, designers, and strategists obsessed with craft. We tackle hard problems, write elegant code, and build infrastructure that matters.",
      kind: "text"
    },
    "009": {
      label: "Remote-First",
      value: "Remote-First",
      kind: "text"
    },
    "010": {
      label: "Work from anywhere in the world.",
      value: "Work from anywhere in the world.",
      kind: "text"
    },
    "011": {
      label: "Top-Tier Gear",
      value: "Top-Tier Gear",
      kind: "text"
    },
    "012": {
      label: "Latest M-series MacBooks and home office stipend.",
      value: "Latest M-series MacBooks and home office stipend.",
      kind: "text"
    },
    "013": {
      label: "Continuous Learning",
      value: "Continuous Learning",
      kind: "text"
    },
    "014": {
      label: "Generous budget for courses, books, and conferences.",
      value: "Generous budget for courses, books, and conferences.",
      kind: "text"
    },
    "015": {
      label: "Focus Time",
      value: "Focus Time",
      kind: "text"
    },
    "016": {
      label: "No-meeting days and asynchronous communication default.",
      value: "No-meeting days and asynchronous communication default.",
      kind: "text"
    },
    "017": {
      label: "Open Positions",
      value: "Open Positions",
      kind: "text"
    },
    "018": {
      label: "Apply Now",
      value: "Apply Now ",
      kind: "text"
    },
    "019": {
      label: "No open roles currently",
      value: "No open roles currently",
      kind: "text"
    },
    "020": {
      label: "We are not actively hiring right now, but check back soon.",
      value: "We are not actively hiring right now, but check back soon.",
      kind: "text"
    },
    "021": {
      label: "Apply for",
      value: "Apply for ",
      kind: "text"
    },
    "022": {
      label: "Submit your details below and our team will review your application.",
      value: "Submit your details below and our team will review your application.",
      kind: "text"
    },
    "023": {
      label: "Full Name",
      value: "Full Name",
      kind: "text"
    },
    "024": {
      label: "Email Address",
      value: "Email Address",
      kind: "text"
    },
    "025": {
      label: "LinkedIn Profile (Optional)",
      value: "LinkedIn Profile (Optional)",
      kind: "text"
    },
    "026": {
      label: "https://linkedin.com/in/...",
      value: "https://linkedin.com/in/...",
      kind: "text"
    },
    "027": {
      label: "Cover Note (Optional)",
      value: "Cover Note (Optional)",
      kind: "text"
    },
    "028": {
      label: "Why are you interested in this role?",
      value: "Why are you interested in this role?",
      kind: "text"
    },
    "029": {
      label: "Cancel",
      value: "Cancel",
      kind: "text"
    }
  },
  contact: {
    "001": {
      label: "Submission Failed",
      value: "Submission Failed",
      kind: "text"
    },
    "002": {
      label: "There was an error sending your message. Please try again.",
      value: "There was an error sending your message. Please try again.",
      kind: "text"
    },
    "003": {
      label: "Get in",
      value: "Get in ",
      kind: "text"
    },
    "004": {
      label: "Touch",
      value: "Touch",
      kind: "text"
    },
    "005": {
      label: "Whether you have a specific project in mind or just want to explore possibilities, our eng",
      value: "Whether you have a specific project in mind or just want to explore possibilities, our engineering team is ready to listen.",
      kind: "text"
    },
    "006": {
      label: "Contact Information",
      value: "Contact Information",
      kind: "text"
    },
    "007": {
      label: "Global HQ",
      value: "Global HQ",
      kind: "text"
    },
    "008": {
      label: "100 Technology Drive",
      value: "100 Technology Drive",
      kind: "text"
    },
    "009": {
      label: "Suite 400",
      value: "Suite 400",
      kind: "text"
    },
    "010": {
      label: "San Francisco, CA 94107",
      value: "San Francisco, CA 94107",
      kind: "text"
    },
    "011": {
      label: "Email",
      value: "Email",
      kind: "text"
    },
    "012": {
      label: "mailto:info@eminence.co.ug",
      value: "mailto:info@eminence.co.ug",
      kind: "link"
    },
    "013": {
      label: "info@eminence.co.ug",
      value: "info@eminence.co.ug",
      kind: "text"
    },
    "014": {
      label: "Phone",
      value: "Phone",
      kind: "text"
    },
    "015": {
      label: "tel:+18005550199",
      value: "tel:+18005550199",
      kind: "link"
    },
    "016": {
      label: "+1 (800) 555-0199",
      value: "+1 (800) 555-0199",
      kind: "text"
    },
    "017": {
      label: "Message Sent",
      value: "Message Sent",
      kind: "text"
    },
    "018": {
      label: "Thank you for reaching out. A member of our engineering team will get back to you within 2",
      value: "Thank you for reaching out. A member of our engineering team will get back to you within 24 hours.",
      kind: "text"
    },
    "019": {
      label: "Send another message",
      value: "Send another message",
      kind: "text"
    },
    "020": {
      label: "Send a Message",
      value: "Send a Message",
      kind: "text"
    },
    "021": {
      label: "Full Name",
      value: "Full Name",
      kind: "text"
    },
    "022": {
      label: "John Doe",
      value: "John Doe",
      kind: "text"
    },
    "023": {
      label: "Email Address",
      value: "Email Address",
      kind: "text"
    },
    "024": {
      label: "john@company.com",
      value: "john@company.com",
      kind: "text"
    },
    "025": {
      label: "Company (Optional)",
      value: "Company (Optional)",
      kind: "text"
    },
    "026": {
      label: "Acme Corp",
      value: "Acme Corp",
      kind: "text"
    },
    "027": {
      label: "Service of Interest",
      value: "Service of Interest",
      kind: "text"
    },
    "028": {
      label: "General Inquiry",
      value: "General Inquiry",
      kind: "text"
    },
    "029": {
      label: "Software Solutions",
      value: "Software Solutions",
      kind: "text"
    },
    "030": {
      label: "Cloud Hosting",
      value: "Cloud Hosting",
      kind: "text"
    },
    "031": {
      label: "Consultancy",
      value: "Consultancy",
      kind: "text"
    },
    "032": {
      label: "Products",
      value: "Products",
      kind: "text"
    },
    "033": {
      label: "Message",
      value: "Message",
      kind: "text"
    },
    "034": {
      label: "How can we help you?",
      value: "How can we help you?",
      kind: "text"
    },
    "035": {
      label: "Website",
      value: "Website",
      kind: "text"
    }
  },
  home: {
    "001": {
      label: "+",
      value: "+",
      kind: "text"
    },
    "002": {
      label: "Pioneering Enterprise Solutions",
      value: "Pioneering Enterprise Solutions",
      kind: "text"
    },
    "003": {
      label: "Engineering the Future,",
      value: "Engineering the Future, ",
      kind: "text"
    },
    "004": {
      label: "One Solution at a Time.",
      value: "One Solution at a Time.",
      kind: "text"
    },
    "005": {
      label: "Precision-engineered software, cloud infrastructure, and deep technical consultancy for co",
      value: "Precision-engineered software, cloud infrastructure, and deep technical consultancy for companies scaling to the next level.",
      kind: "text"
    },
    "006": {
      label: "Get Started",
      value: "Get Started",
      kind: "text"
    },
    "007": {
      label: "Our Services",
      value: "Our Services",
      kind: "text"
    },
    "008": {
      label: "Clients Served",
      value: "Clients Served",
      kind: "text"
    },
    "009": {
      label: "Projects Delivered",
      value: "Projects Delivered",
      kind: "text"
    },
    "010": {
      label: "Engineers",
      value: "Engineers",
      kind: "text"
    },
    "011": {
      label: "Countries",
      value: "Countries",
      kind: "text"
    },
    "012": {
      label: "Core Capabilities",
      value: "Core Capabilities",
      kind: "text"
    },
    "013": {
      label: "End-to-end technical excellence spanning custom development, robust infrastructure, and st",
      value: "End-to-end technical excellence spanning custom development, robust infrastructure, and strategic advisory.",
      kind: "text"
    },
    "014": {
      label: "Software Solutions",
      value: "Software Solutions",
      kind: "text"
    },
    "015": {
      label: "Bespoke enterprise applications, scalable architectures, and modern web platforms built fo",
      value: "Bespoke enterprise applications, scalable architectures, and modern web platforms built for performance.",
      kind: "text"
    },
    "016": {
      label: "Learn more",
      value: "Learn more",
      kind: "text"
    },
    "017": {
      label: "Cloud Hosting",
      value: "Cloud Hosting",
      kind: "text"
    },
    "018": {
      label: "High-availability infrastructure, seamless migrations, and managed DevOps for mission-crit",
      value: "High-availability infrastructure, seamless migrations, and managed DevOps for mission-critical workloads.",
      kind: "text"
    },
    "019": {
      label: "Learn more",
      value: "Learn more",
      kind: "text"
    },
    "020": {
      label: "Consultancy",
      value: "Consultancy",
      kind: "text"
    },
    "021": {
      label: "Strategic tech leadership, architecture audits, and digital transformation roadmaps for sc",
      value: "Strategic tech leadership, architecture audits, and digital transformation roadmaps for scale-ups.",
      kind: "text"
    },
    "022": {
      label: "Learn more",
      value: "Learn more",
      kind: "text"
    },
    "023": {
      label: "Proprietary Products",
      value: "Proprietary Products",
      kind: "text"
    },
    "024": {
      label: "Access our suite of internal tools and SaaS products designed to accelerate development an",
      value: "Access our suite of internal tools and SaaS products designed to accelerate development and deployment.",
      kind: "text"
    },
    "025": {
      label: "View portfolio",
      value: "View portfolio",
      kind: "text"
    },
    "026": {
      label: "Featured Products",
      value: "Featured Products",
      kind: "text"
    },
    "027": {
      label: "Tools engineered by our team to solve complex industry challenges.",
      value: "Tools engineered by our team to solve complex industry challenges.",
      kind: "text"
    },
    "028": {
      label: "View All Products",
      value: "View All Products",
      kind: "text"
    },
    "029": {
      label: "Explore product",
      value: "Explore product",
      kind: "text"
    },
    "030": {
      label: "No products available at the moment.",
      value: "No products available at the moment.",
      kind: "text"
    },
    "031": {
      label: "Trusted by Leaders",
      value: "Trusted by Leaders",
      kind: "text"
    },
    "032": {
      label: "Don't just take our word for it. Here's what our clients have to say about working with EM",
      value: "Don't just take our word for it. Here's what our clients have to say about working with EMINENCE.",
      kind: "text"
    },
    "033": {
      label: '"',
      value: '"',
      kind: "text"
    },
    "034": {
      label: '"',
      value: '"',
      kind: "text"
    },
    "035": {
      label: ",",
      value: ", ",
      kind: "text"
    },
    "036": {
      label: "Engineering Insights",
      value: "Engineering Insights",
      kind: "text"
    },
    "037": {
      label: "Latest thoughts, case studies, and technical deep-dives from our team.",
      value: "Latest thoughts, case studies, and technical deep-dives from our team.",
      kind: "text"
    },
    "038": {
      label: "Read Our Blog",
      value: "Read Our Blog",
      kind: "text"
    },
    "039": {
      label: "Read article",
      value: "Read article",
      kind: "text"
    },
    "040": {
      label: "Ready to scale your infrastructure?",
      value: "Ready to scale your infrastructure?",
      kind: "text"
    },
    "041": {
      label: "Partner with EMINENCE to build, scale, and optimize your technical operations.",
      value: "Partner with EMINENCE to build, scale, and optimize your technical operations.",
      kind: "text"
    },
    "042": {
      label: "Talk to an Expert",
      value: "Talk to an Expert",
      kind: "text"
    },
    "043": {
      label: "Book Consultation",
      value: "Book Consultation",
      kind: "text"
    }
  },
  "not-found": {
    "001": {
      label: "404",
      value: "404",
      kind: "text"
    },
    "002": {
      label: "Page not found",
      value: "Page not found",
      kind: "text"
    },
    "003": {
      label: "The page you're looking for doesn't exist or has been moved.",
      value: "The page you're looking for doesn't exist or has been moved.",
      kind: "text"
    },
    "004": {
      label: "Go Back",
      value: "Go Back",
      kind: "text"
    },
    "005": {
      label: "Return Home",
      value: "Return Home",
      kind: "text"
    }
  },
  privacy: {
    "001": {
      label: "Privacy Policy",
      value: "Privacy Policy",
      kind: "text"
    },
    "002": {
      label: "Last updated:",
      value: "Last updated: ",
      kind: "text"
    },
    "003": {
      label: "At EMINENCE, we take your privacy seriously. This Privacy Policy explains how we collect, ",
      value: "At EMINENCE, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
      kind: "text"
    },
    "004": {
      label: "1. Information We Collect",
      value: "1. Information We Collect",
      kind: "text"
    },
    "005": {
      label: "We may collect information about you in a variety of ways. The information we may collect ",
      value: "We may collect information about you in a variety of ways. The information we may collect on the Site includes:",
      kind: "text"
    },
    "006": {
      label: "Personal Data:",
      value: "Personal Data:",
      kind: "text"
    },
    "007": {
      label: "Personally identifiable information, such as your name, shipping address, email address, a",
      value: " Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us.",
      kind: "text"
    },
    "008": {
      label: "Derivative Data:",
      value: "Derivative Data:",
      kind: "text"
    },
    "009": {
      label: "Information our servers automatically collect when you access the Site, such as your IP ad",
      value: " Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.",
      kind: "text"
    },
    "010": {
      label: "2. Use of Your Information",
      value: "2. Use of Your Information",
      kind: "text"
    },
    "011": {
      label: "Having accurate information about you permits us to provide you with a smooth, efficient, ",
      value: "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:",
      kind: "text"
    },
    "012": {
      label: "Deliver targeted advertising, newsletters, and other information regarding promotions and ",
      value: "Deliver targeted advertising, newsletters, and other information regarding promotions and the Site to you.",
      kind: "text"
    },
    "013": {
      label: "Email you regarding your account or order.",
      value: "Email you regarding your account or order.",
      kind: "text"
    },
    "014": {
      label: "Fulfill and manage purchases, orders, payments, and other transactions related to the Site",
      value: "Fulfill and manage purchases, orders, payments, and other transactions related to the Site.",
      kind: "text"
    },
    "015": {
      label: "Generate a personal profile about you to make future visits to the Site more personalized.",
      value: "Generate a personal profile about you to make future visits to the Site more personalized.",
      kind: "text"
    },
    "016": {
      label: "3. Disclosure of Your Information",
      value: "3. Disclosure of Your Information",
      kind: "text"
    },
    "017": {
      label: "We may share information we have collected about you in certain situations. Your informati",
      value: "We may share information we have collected about you in certain situations. Your information may be disclosed as follows:",
      kind: "text"
    },
    "018": {
      label: "By Law or to Protect Rights:",
      value: "By Law or to Protect Rights:",
      kind: "text"
    },
    "019": {
      label: "If we believe the release of information about you is necessary to respond to legal proces",
      value: " If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.",
      kind: "text"
    },
    "020": {
      label: "4. Security of Your Information",
      value: "4. Security of Your Information",
      kind: "text"
    },
    "021": {
      label: "We use administrative, technical, and physical security measures to help protect your pers",
      value: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.",
      kind: "text"
    },
    "022": {
      label: "5. Contact Us",
      value: "5. Contact Us",
      kind: "text"
    },
    "023": {
      label: "If you have questions or comments about this Privacy Policy, please contact us at:",
      value: "If you have questions or comments about this Privacy Policy, please contact us at: ",
      kind: "text"
    },
    "024": {
      label: "mailto:privacy@eminence.dev",
      value: "mailto:privacy@eminence.dev",
      kind: "link"
    },
    "025": {
      label: "privacy@eminence.dev",
      value: "privacy@eminence.dev",
      kind: "text"
    },
    "effective-date": {
      label: "Effective date",
      value: "September 8, 2026",
      kind: "text"
    }
  },
  "product-detail": {
    "001": {
      label: "Back to Products",
      value: "Back to Products",
      kind: "text"
    },
    "002": {
      label: "Request Demo",
      value: "Request Demo",
      kind: "text"
    },
    "003": {
      label: "Visit Website",
      value: "Visit Website",
      kind: "text"
    },
    "004": {
      label: "Overview",
      value: "Overview",
      kind: "text"
    },
    "005": {
      label: "Built on modern architectural principles,",
      value: "Built on modern architectural principles, ",
      kind: "text"
    },
    "006": {
      label: "was initially developed to solve internal challenges at EMINENCE before being packaged as ",
      value: " was initially developed to solve internal challenges at EMINENCE before being packaged as a robust enterprise solution. It integrates seamlessly into existing workflows while providing unparalleled visibility and control.",
      kind: "text"
    },
    "007": {
      label: "The platform prioritizes security, speed, and developer experience above all else. Every f",
      value: "The platform prioritizes security, speed, and developer experience above all else. Every feature has been battle-tested in high-traffic production environments.",
      kind: "text"
    },
    "008": {
      label: "Key Features",
      value: "Key Features",
      kind: "text"
    },
    "009": {
      label: "Enterprise-grade security",
      value: "Enterprise-grade security",
      kind: "text"
    },
    "010": {
      label: "High availability architecture",
      value: "High availability architecture",
      kind: "text"
    },
    "011": {
      label: "Comprehensive API access",
      value: "Comprehensive API access",
      kind: "text"
    },
    "012": {
      label: "Status",
      value: "Status",
      kind: "text"
    }
  },
  products: {
    "001": {
      label: "Proprietary",
      value: "Proprietary ",
      kind: "text"
    },
    "002": {
      label: "Products",
      value: "Products",
      kind: "text"
    },
    "003": {
      label: "Specialized software solutions engineered internally to solve complex operational challeng",
      value: "Specialized software solutions engineered internally to solve complex operational challenges. Available for enterprise deployment.",
      kind: "text"
    },
    "004": {
      label: "View Details",
      value: "View Details ",
      kind: "text"
    }
  },
  terms: {
    "001": {
      label: "Terms of Service",
      value: "Terms of Service",
      kind: "text"
    },
    "002": {
      label: "Last updated:",
      value: "Last updated: ",
      kind: "text"
    },
    "003": {
      label: 'These Terms of Service ("Terms") govern your access to and use of the services, websites, ',
      value: 'These Terms of Service ("Terms") govern your access to and use of the services, websites, and applications offered by EMINENCE (the "Service"). Please read these Terms carefully before using the Service.',
      kind: "text"
    },
    "004": {
      label: "1. Acceptance of Terms",
      value: "1. Acceptance of Terms",
      kind: "text"
    },
    "005": {
      label: "By accessing or using the Service, you agree to be bound by these Terms and our Privacy Po",
      value: "By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.",
      kind: "text"
    },
    "006": {
      label: "2. Use of Service",
      value: "2. Use of Service",
      kind: "text"
    },
    "007": {
      label: "You agree to use the Service only for lawful purposes and in accordance with these Terms. ",
      value: "You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for all of your activity in connection with the Service.",
      kind: "text"
    },
    "008": {
      label: "You must not:",
      value: "You must not:",
      kind: "text"
    },
    "009": {
      label: "Use the Service in any way that violates any applicable local, national, or international ",
      value: "Use the Service in any way that violates any applicable local, national, or international law or regulation.",
      kind: "text"
    },
    "010": {
      label: "Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.",
      value: "Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.",
      kind: "text"
    },
    "011": {
      label: "Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of th",
      value: "Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service.",
      kind: "text"
    },
    "012": {
      label: "3. Intellectual Property",
      value: "3. Intellectual Property",
      kind: "text"
    },
    "013": {
      label: "The Service and its entire contents, features, and functionality (including but not limite",
      value: "The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by EMINENCE, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
      kind: "text"
    },
    "014": {
      label: "4. Disclaimer of Warranties",
      value: "4. Disclaimer of Warranties",
      kind: "text"
    },
    "015": {
      label: 'The Service is provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties of ',
      value: 'The Service is provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties of any kind, either express or implied. EMINENCE disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      kind: "text"
    },
    "016": {
      label: "5. Limitation of Liability",
      value: "5. Limitation of Liability",
      kind: "text"
    },
    "017": {
      label: "In no event shall EMINENCE, its affiliates, or their respective officers, directors, emplo",
      value: "In no event shall EMINENCE, its affiliates, or their respective officers, directors, employees, or agents be liable for any indirect, consequential, special, incidental, or punitive damages arising out of or related to your use of the Service.",
      kind: "text"
    },
    "018": {
      label: "6. Changes to Terms",
      value: "6. Changes to Terms",
      kind: "text"
    },
    "019": {
      label: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time",
      value: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
      kind: "text"
    },
    "020": {
      label: "7. Contact Information",
      value: "7. Contact Information",
      kind: "text"
    },
    "021": {
      label: "Questions about the Terms of Service should be sent to us at",
      value: "Questions about the Terms of Service should be sent to us at ",
      kind: "text"
    },
    "022": {
      label: "mailto:legal@eminence.dev",
      value: "mailto:legal@eminence.dev",
      kind: "link"
    },
    "023": {
      label: "legal@eminence.dev",
      value: "legal@eminence.dev",
      kind: "text"
    },
    "024": {
      label: ".",
      value: ".",
      kind: "text"
    },
    "effective-date": {
      label: "Effective date",
      value: "September 8, 2026",
      kind: "text"
    }
  },
  testimonials: {
    "001": {
      label: "Client",
      value: "Client ",
      kind: "text"
    },
    "002": {
      label: "Success",
      value: "Success",
      kind: "text"
    },
    "003": {
      label: "We measure our success entirely by the impact we have on our clients' businesses. Here is ",
      value: "We measure our success entirely by the impact we have on our clients' businesses. Here is what they have to say.",
      kind: "text"
    },
    "004": {
      label: '"',
      value: '"',
      kind: "text"
    },
    "005": {
      label: '"',
      value: '"',
      kind: "text"
    }
  },
  "services-cloud-hosting": {
    "001": {
      label: "Dedicated Infrastructure",
      value: "Dedicated Infrastructure",
      kind: "text"
    },
    "002": {
      label: "Isolated environments tailored for high-performance workloads, offering complete control a",
      value: "Isolated environments tailored for high-performance workloads, offering complete control and uncompromised security.",
      kind: "text"
    },
    "003": {
      label: "Multi-Cloud Strategy",
      value: "Multi-Cloud Strategy",
      kind: "text"
    },
    "004": {
      label: "Seamless deployment across AWS, GCP, and Azure. We architect for redundancy and vendor ind",
      value: "Seamless deployment across AWS, GCP, and Azure. We architect for redundancy and vendor independence.",
      kind: "text"
    },
    "005": {
      label: "Managed Databases",
      value: "Managed Databases",
      kind: "text"
    },
    "006": {
      label: "Automated backups, scaling, and maintenance for PostgreSQL, Redis, MongoDB, and specialize",
      value: "Automated backups, scaling, and maintenance for PostgreSQL, Redis, MongoDB, and specialized data stores.",
      kind: "text"
    },
    "007": {
      label: "Enterprise Security",
      value: "Enterprise Security",
      kind: "text"
    },
    "008": {
      label: "Zero-trust architecture, DDoS protection, WAF, and automated compliance auditing out of th",
      value: "Zero-trust architecture, DDoS protection, WAF, and automated compliance auditing out of the box.",
      kind: "text"
    },
    "009": {
      label: "Edge Compute",
      value: "Edge Compute",
      kind: "text"
    },
    "010": {
      label: "Deploy logic globally with our edge network integration, reducing latency to milliseconds ",
      value: "Deploy logic globally with our edge network integration, reducing latency to milliseconds for global users.",
      kind: "text"
    },
    "011": {
      label: "Observability",
      value: "Observability",
      kind: "text"
    },
    "012": {
      label: "Deep insights with integrated metrics, logs, and traces. AI-powered anomaly detection aler",
      value: "Deep insights with integrated metrics, logs, and traces. AI-powered anomaly detection alerts you before issues occur.",
      kind: "text"
    },
    "013": {
      label: "Infrastructure as a Service",
      value: "Infrastructure as a Service",
      kind: "text"
    },
    "014": {
      label: "Bulletproof",
      value: "Bulletproof ",
      kind: "text"
    },
    "015": {
      label: "Cloud Hosting",
      value: "Cloud Hosting",
      kind: "text"
    },
    "016": {
      label: "Mission-critical infrastructure engineered for scale. We manage the complexity of cloud op",
      value: "Mission-critical infrastructure engineered for scale. We manage the complexity of cloud operations so you can focus on shipping product.",
      kind: "text"
    },
    "017": {
      label: "Deploy with EMINENCE",
      value: "Deploy with EMINENCE",
      kind: "text"
    },
    "018": {
      label: "Engineered for Reliability",
      value: "Engineered for Reliability",
      kind: "text"
    },
    "019": {
      label: "Our infrastructure stack is built on industry best practices, combining raw performance wi",
      value: "Our infrastructure stack is built on industry best practices, combining raw performance with unparalleled stability.",
      kind: "text"
    },
    "020": {
      label: "Modern Stack, Zero Compromise",
      value: "Modern Stack, Zero Compromise",
      kind: "text"
    },
    "021": {
      label: "We don't do shared hosting. Every deployment is containerized, orchestrated via Kubernetes",
      value: "We don't do shared hosting. Every deployment is containerized, orchestrated via Kubernetes, and geographically distributed. Whether you need a HIPAA-compliant healthcare platform or a low-latency fintech backend, our architecture adapts.",
      kind: "text"
    },
    "022": {
      label: "Request Architecture Review",
      value: "Request Architecture Review",
      kind: "text"
    },
    "023": {
      label: "cluster-status",
      value: "cluster-status",
      kind: "text"
    },
    "024": {
      label: "kubectl get nodes -o wide",
      value: " kubectl get nodes -o wide",
      kind: "text"
    },
    "025": {
      label: "READY",
      value: "READY",
      kind: "text"
    },
    "026": {
      label: "node-us-east-1a",
      value: "node-us-east-1a",
      kind: "text"
    },
    "027": {
      label: "v1.28.0",
      value: "v1.28.0",
      kind: "text"
    },
    "028": {
      label: "node-us-east-1b",
      value: "node-us-east-1b",
      kind: "text"
    },
    "029": {
      label: "v1.28.0",
      value: "v1.28.0",
      kind: "text"
    },
    "030": {
      label: "node-us-east-1c",
      value: "node-us-east-1c",
      kind: "text"
    },
    "031": {
      label: "v1.28.0",
      value: "v1.28.0",
      kind: "text"
    },
    "032": {
      label: "eminence scale --replicas=10",
      value: " eminence scale --replicas=10",
      kind: "text"
    },
    "033": {
      label: "SUCCESS",
      value: "SUCCESS",
      kind: "text"
    },
    "034": {
      label: "Scaling deployment/api-server...",
      value: "Scaling deployment/api-server...",
      kind: "text"
    },
    "035": {
      label: "Traffic routed via Anycast edge",
      value: "Traffic routed via Anycast edge",
      kind: "text"
    },
    "036": {
      label: "System operating at optimal parameters",
      value: "System operating at optimal parameters",
      kind: "text"
    },
    "037": {
      label: "Stop managing servers.",
      value: "Stop managing servers.",
      kind: "text"
    },
    "038": {
      label: "Let EMINENCE handle your infrastructure while your team focuses on writing code.",
      value: "Let EMINENCE handle your infrastructure while your team focuses on writing code.",
      kind: "text"
    },
    "039": {
      label: "Talk to an Infrastructure Expert",
      value: "Talk to an Infrastructure Expert",
      kind: "text"
    },
    "item-1": {
      label: "99.999% SLA Guarantee",
      value: "99.999% SLA Guarantee",
      kind: "text"
    },
    "item-2": {
      label: "Automated CI/CD Pipelines",
      value: "Automated CI/CD Pipelines",
      kind: "text"
    },
    "item-3": {
      label: "24/7/365 SRE Support",
      value: "24/7/365 SRE Support",
      kind: "text"
    },
    "item-4": {
      label: "Transparent Billing",
      value: "Transparent Billing",
      kind: "text"
    }
  },
  "services-consultancy": {
    "001": {
      label: "Consultation Request Sent",
      value: "Consultation Request Sent",
      kind: "text"
    },
    "002": {
      label: "Request Failed",
      value: "Request Failed",
      kind: "text"
    },
    "003": {
      label: "We couldn't send your consultation request. Please try again or email info@eminence.co.ug.",
      value: "We couldn't send your consultation request. Please try again or email info@eminence.co.ug.",
      kind: "text"
    },
    "004": {
      label: "Architecture Audits",
      value: "Architecture Audits",
      kind: "text"
    },
    "005": {
      label: "Deep-dive analysis of your current systems to identify bottlenecks, security flaws, and sc",
      value: "Deep-dive analysis of your current systems to identify bottlenecks, security flaws, and scaling limitations.",
      kind: "text"
    },
    "006": {
      label: "Team Augmentation",
      value: "Team Augmentation",
      kind: "text"
    },
    "007": {
      label: "Embedding senior engineering leadership into your teams to level up practices and deliver ",
      value: "Embedding senior engineering leadership into your teams to level up practices and deliver critical milestones.",
      kind: "text"
    },
    "008": {
      label: "Digital Transformation",
      value: "Digital Transformation",
      kind: "text"
    },
    "009": {
      label: "Strategic roadmapping to transition legacy enterprises into agile, technology-first organi",
      value: "Strategic roadmapping to transition legacy enterprises into agile, technology-first organizations.",
      kind: "text"
    },
    "010": {
      label: "Strategic Advisory",
      value: "Strategic Advisory",
      kind: "text"
    },
    "011": {
      label: "Clarity in",
      value: "Clarity in ",
      kind: "text"
    },
    "012": {
      label: "Complexity",
      value: "Complexity",
      kind: "text"
    },
    "013": {
      label: "Senior engineering leadership and strategic guidance for organizations facing critical tec",
      value: "Senior engineering leadership and strategic guidance for organizations facing critical technical inflection points.",
      kind: "text"
    },
    "014": {
      label: "Schedule a Session",
      value: "Schedule a Session",
      kind: "text"
    },
    "015": {
      label: "https://ui-avatars.com/api/?name=Eminence+Expert&background=0F6E56&color=fff",
      value: "https://ui-avatars.com/api/?name=Eminence+Expert&background=0F6E56&color=fff",
      kind: "image"
    },
    "016": {
      label: "Expert",
      value: "Expert",
      kind: "text"
    },
    "017": {
      label: "Principal Architect",
      value: "Principal Architect",
      kind: "text"
    },
    "018": {
      label: "Available for advisory",
      value: "Available for advisory",
      kind: "text"
    },
    "019": {
      label: "Topic",
      value: "Topic",
      kind: "text"
    },
    "020": {
      label: "Microservices Transition Strategy",
      value: "Microservices Transition Strategy",
      kind: "text"
    },
    "021": {
      label: "Duration",
      value: "Duration",
      kind: "text"
    },
    "022": {
      label: "60 Minutes",
      value: "60 Minutes",
      kind: "text"
    },
    "023": {
      label: "Advisory Focus Areas",
      value: "Advisory Focus Areas",
      kind: "text"
    },
    "024": {
      label: "We bring decades of collective engineering experience to solve high-stakes business challe",
      value: "We bring decades of collective engineering experience to solve high-stakes business challenges.",
      kind: "text"
    },
    "025": {
      label: "Book a Discovery Session",
      value: "Book a Discovery Session",
      kind: "text"
    },
    "026": {
      label: "A complimentary 45-minute consultation with a Principal Engineer to evaluate your technica",
      value: "A complimentary 45-minute consultation with a Principal Engineer to evaluate your technical needs.",
      kind: "text"
    },
    "027": {
      label: "Name",
      value: "Name",
      kind: "text"
    },
    "028": {
      label: "Jane Doe",
      value: "Jane Doe",
      kind: "text"
    },
    "029": {
      label: "Email",
      value: "Email",
      kind: "text"
    },
    "030": {
      label: "jane@company.com",
      value: "jane@company.com",
      kind: "text"
    },
    "031": {
      label: "Company",
      value: "Company",
      kind: "text"
    },
    "032": {
      label: "Acme Corp",
      value: "Acme Corp",
      kind: "text"
    },
    "033": {
      label: "Phone (Optional)",
      value: "Phone (Optional)",
      kind: "text"
    },
    "034": {
      label: "+256 700 000000",
      value: "+256 700 000000",
      kind: "text"
    },
    "035": {
      label: "Primary Topic",
      value: "Primary Topic",
      kind: "text"
    },
    "036": {
      label: "Select a topic...",
      value: "Select a topic...",
      kind: "text"
    },
    "037": {
      label: "Architecture Review",
      value: "Architecture Review",
      kind: "text"
    },
    "038": {
      label: "Cloud Migration Strategy",
      value: "Cloud Migration Strategy",
      kind: "text"
    },
    "039": {
      label: "Scaling Challenges",
      value: "Scaling Challenges",
      kind: "text"
    },
    "040": {
      label: "Team Augmentation",
      value: "Team Augmentation",
      kind: "text"
    },
    "041": {
      label: "Other",
      value: "Other",
      kind: "text"
    },
    "042": {
      label: "Preferred Date",
      value: "Preferred Date",
      kind: "text"
    },
    "043": {
      label: "Pick a date",
      value: "Pick a date",
      kind: "text"
    },
    "044": {
      label: "Preferred Time",
      value: "Preferred Time",
      kind: "text"
    },
    "045": {
      label: "Timezone",
      value: "Timezone",
      kind: "text"
    },
    "046": {
      label: "Additional Details (Optional)",
      value: "Additional Details (Optional)",
      kind: "text"
    },
    "047": {
      label: "Tell us briefly what you would like to discuss.",
      value: "Tell us briefly what you would like to discuss.",
      kind: "text"
    },
    "048": {
      label: "Website",
      value: "Website",
      kind: "text"
    },
    "item-1": {
      label: "Non-disclosure agreement guaranteed",
      value: "Non-disclosure agreement guaranteed",
      kind: "text"
    },
    "item-2": {
      label: "Direct access to senior leadership",
      value: "Direct access to senior leadership",
      kind: "text"
    },
    "item-3": {
      label: "Actionable technical roadmap delivered",
      value: "Actionable technical roadmap delivered",
      kind: "text"
    },
    "item-4": {
      label: "No commitment required",
      value: "No commitment required",
      kind: "text"
    }
  },
  "services-software-solutions": {
    "001": {
      label: "Enterprise Web Applications",
      value: "Enterprise Web Applications",
      kind: "text"
    },
    "002": {
      label: "Complex, scalable web platforms built with React, Node.js, and modern distributed architec",
      value: "Complex, scalable web platforms built with React, Node.js, and modern distributed architectures.",
      kind: "text"
    },
    "003": {
      label: "Mobile Experiences",
      value: "Mobile Experiences",
      kind: "text"
    },
    "004": {
      label: "Native and cross-platform mobile applications that deliver flawless performance on iOS and",
      value: "Native and cross-platform mobile applications that deliver flawless performance on iOS and Android.",
      kind: "text"
    },
    "005": {
      label: "UX/UI System Design",
      value: "UX/UI System Design",
      kind: "text"
    },
    "006": {
      label: "Comprehensive design systems that ensure consistency, accessibility, and delight across al",
      value: "Comprehensive design systems that ensure consistency, accessibility, and delight across all touchpoints.",
      kind: "text"
    },
    "007": {
      label: "System Integration",
      value: "System Integration",
      kind: "text"
    },
    "008": {
      label: "Connecting disparate legacy systems into unified, modern APIs via GraphQL and REST.",
      value: "Connecting disparate legacy systems into unified, modern APIs via GraphQL and REST.",
      kind: "text"
    },
    "009": {
      label: "Legacy Modernization",
      value: "Legacy Modernization",
      kind: "text"
    },
    "010": {
      label: "Safe, systematic rewriting of outdated monoliths into modular, maintainable microservices.",
      value: "Safe, systematic rewriting of outdated monoliths into modular, maintainable microservices.",
      kind: "text"
    },
    "011": {
      label: "MVP Acceleration",
      value: "MVP Acceleration",
      kind: "text"
    },
    "012": {
      label: "Rapid prototyping and development for startups needing to prove product-market fit quickly",
      value: "Rapid prototyping and development for startups needing to prove product-market fit quickly.",
      kind: "text"
    },
    "013": {
      label: "Custom Development",
      value: "Custom Development",
      kind: "text"
    },
    "014": {
      label: "Software that",
      value: "Software that ",
      kind: "text"
    },
    "015": {
      label: "Transforms",
      value: "Transforms",
      kind: "text"
    },
    "016": {
      label: "We don't just write code. We build elegant, robust, and scalable software solutions that d",
      value: "We don't just write code. We build elegant, robust, and scalable software solutions that drive real business value and outpace the competition.",
      kind: "text"
    },
    "017": {
      label: "Start a Project",
      value: "Start a Project",
      kind: "text"
    },
    "018": {
      label: "Code as Craft",
      value: "Code as Craft",
      kind: "text"
    },
    "019": {
      label: "At EMINENCE, we treat software engineering as a discipline requiring immense precision. We",
      value: "At EMINENCE, we treat software engineering as a discipline requiring immense precision. We abhor bloated codebases and technical debt.",
      kind: "text"
    },
    "020": {
      label: "Our process is rooted in modern agile methodologies, test-driven development, and continuo",
      value: "Our process is rooted in modern agile methodologies, test-driven development, and continuous integration. The result? Software that works exactly as intended, is easy to maintain, and scales effortlessly.",
      kind: "text"
    },
    "021": {
      label: "0%",
      value: "0%",
      kind: "text"
    },
    "022": {
      label: "Compromise on Quality",
      value: "Compromise on Quality",
      kind: "text"
    },
    "023": {
      label: "100%",
      value: "100%",
      kind: "text"
    },
    "024": {
      label: "Test Coverage Goal",
      value: "Test Coverage Goal",
      kind: "text"
    },
    "025": {
      label: "import",
      value: "import ",
      kind: "text"
    },
    "026": {
      label: "core",
      value: " core ",
      kind: "text"
    },
    "027": {
      label: "from",
      value: " from ",
      kind: "text"
    },
    "028": {
      label: "'@eminence/engine'",
      value: "'@eminence/engine'",
      kind: "text"
    },
    "029": {
      label: ";",
      value: ";",
      kind: "text"
    },
    "030": {
      label: "import",
      value: "import ",
      kind: "text"
    },
    "031": {
      label: "ScalableArch",
      value: " ScalableArch ",
      kind: "text"
    },
    "032": {
      label: "from",
      value: " from ",
      kind: "text"
    },
    "033": {
      label: "'@eminence/patterns'",
      value: "'@eminence/patterns'",
      kind: "text"
    },
    "034": {
      label: ";",
      value: ";",
      kind: "text"
    },
    "035": {
      label: "export default function",
      value: "export default function ",
      kind: "text"
    },
    "036": {
      label: "System",
      value: "System",
      kind: "text"
    },
    "037": {
      label: "()",
      value: "() ",
      kind: "text"
    },
    "038": {
      label: "const",
      value: "const",
      kind: "text"
    },
    "039": {
      label: "architecture =",
      value: " architecture = ",
      kind: "text"
    },
    "040": {
      label: "new",
      value: "new",
      kind: "text"
    },
    "041": {
      label: "ScalableArch",
      value: "ScalableArch",
      kind: "text"
    },
    "042": {
      label: "();",
      value: "();",
      kind: "text"
    },
    "043": {
      label: "architecture.",
      value: "architecture.",
      kind: "text"
    },
    "044": {
      label: "use",
      value: "use",
      kind: "text"
    },
    "045": {
      label: "(core.",
      value: "(core.",
      kind: "text"
    },
    "046": {
      label: "ResiliencePlugin",
      value: "ResiliencePlugin",
      kind: "text"
    },
    "047": {
      label: ");",
      value: ");",
      kind: "text"
    },
    "048": {
      label: "architecture.",
      value: "architecture.",
      kind: "text"
    },
    "049": {
      label: "optimize",
      value: "optimize",
      kind: "text"
    },
    "050": {
      label: "(",
      value: "(",
      kind: "text"
    },
    "051": {
      label: "'performance'",
      value: "'performance'",
      kind: "text"
    },
    "052": {
      label: ");",
      value: ");",
      kind: "text"
    },
    "053": {
      label: "// Build for the future, deploy today.",
      value: "// Build for the future, deploy today.",
      kind: "text"
    },
    "054": {
      label: "return",
      value: "return ",
      kind: "text"
    },
    "055": {
      label: "architecture.",
      value: "architecture.",
      kind: "text"
    },
    "056": {
      label: "build",
      value: "build",
      kind: "text"
    },
    "057": {
      label: "();",
      value: "();",
      kind: "text"
    },
    "058": {
      label: "~",
      value: "~",
      kind: "text"
    },
    "059": {
      label: "npm run deploy:production",
      value: " npm run deploy:production",
      kind: "text"
    },
    "060": {
      label: "Our Capabilities",
      value: "Our Capabilities",
      kind: "text"
    },
    "061": {
      label: "Full-stack expertise applied to solve highly specific business problems.",
      value: "Full-stack expertise applied to solve highly specific business problems.",
      kind: "text"
    },
    "062": {
      label: "Technologies We Master",
      value: "Technologies We Master",
      kind: "text"
    },
    "063": {
      label: "React / Next.js",
      value: "React / Next.js",
      kind: "text"
    },
    "064": {
      label: "Node / Nest",
      value: "Node / Nest",
      kind: "text"
    },
    "065": {
      label: "Go",
      value: "Go",
      kind: "text"
    },
    "066": {
      label: "PostgreSQL",
      value: "PostgreSQL",
      kind: "text"
    },
    "067": {
      label: "GraphQL",
      value: "GraphQL",
      kind: "text"
    },
    "068": {
      label: "TypeScript",
      value: "TypeScript",
      kind: "text"
    },
    "069": {
      label: "Build something extraordinary.",
      value: "Build something extraordinary.",
      kind: "text"
    },
    "070": {
      label: "Bring us your hardest technical challenges. We'll engineer the solution.",
      value: "Bring us your hardest technical challenges. We'll engineer the solution.",
      kind: "text"
    },
    "071": {
      label: "Discuss Your Project",
      value: "Discuss Your Project",
      kind: "text"
    }
  },
  layout: {
    "001": {
      label: "EMINENCE",
      value: "EMINENCE",
      kind: "text"
    },
    "002": {
      label: "Get in Touch",
      value: "Get in Touch",
      kind: "text"
    },
    "003": {
      label: "Get in Touch",
      value: "Get in Touch",
      kind: "text"
    },
    "004": {
      label: "Subscribed successfully!",
      value: "Subscribed successfully!",
      kind: "text"
    },
    "005": {
      label: "Check your inbox for confirmation.",
      value: "Check your inbox for confirmation.",
      kind: "text"
    },
    "006": {
      label: "Subscription failed",
      value: "Subscription failed",
      kind: "text"
    },
    "007": {
      label: "Please try again later.",
      value: "Please try again later.",
      kind: "text"
    },
    "008": {
      label: "Engineering the Future, One Solution at a Time. Precision, depth, and results you can trus",
      value: "Engineering the Future, One Solution at a Time. Precision, depth, and results you can trust.",
      kind: "text"
    },
    "009": {
      label: "#",
      value: "#",
      kind: "link"
    },
    "010": {
      label: "#",
      value: "#",
      kind: "link"
    },
    "011": {
      label: "#",
      value: "#",
      kind: "link"
    },
    "012": {
      label: "Company",
      value: "Company",
      kind: "text"
    },
    "013": {
      label: "About Us",
      value: "About Us",
      kind: "text"
    },
    "014": {
      label: "Careers",
      value: "Careers",
      kind: "text"
    },
    "015": {
      label: "Blog",
      value: "Blog",
      kind: "text"
    },
    "016": {
      label: "Contact",
      value: "Contact",
      kind: "text"
    },
    "017": {
      label: "Services",
      value: "Services",
      kind: "text"
    },
    "018": {
      label: "Software Solutions",
      value: "Software Solutions",
      kind: "text"
    },
    "019": {
      label: "Cloud Hosting",
      value: "Cloud Hosting",
      kind: "text"
    },
    "020": {
      label: "Consultancy",
      value: "Consultancy",
      kind: "text"
    },
    "021": {
      label: "Our Products",
      value: "Our Products",
      kind: "text"
    },
    "022": {
      label: "Newsletter",
      value: "Newsletter",
      kind: "text"
    },
    "023": {
      label: "Stay updated with our latest news and engineering insights.",
      value: "Stay updated with our latest news and engineering insights.",
      kind: "text"
    },
    "024": {
      label: "Enter your email",
      value: "Enter your email",
      kind: "text"
    },
    "025": {
      label: "\xA9",
      value: "\xA9 ",
      kind: "text"
    },
    "026": {
      label: "EMINENCE Inc. All rights reserved.",
      value: " EMINENCE Inc. All rights reserved.",
      kind: "text"
    },
    "027": {
      label: "Privacy Policy",
      value: "Privacy Policy",
      kind: "text"
    },
    "028": {
      label: "Terms of Service",
      value: "Terms of Service",
      kind: "text"
    },
    "nav-1": {
      label: "Navigation: Services",
      value: "Services",
      kind: "text"
    },
    "nav-2": {
      label: "Navigation: Software Solutions",
      value: "Software Solutions",
      kind: "text"
    },
    "nav-3": {
      label: "Navigation: Cloud Hosting",
      value: "Cloud Hosting",
      kind: "text"
    },
    "nav-4": {
      label: "Navigation: Consultancy",
      value: "Consultancy",
      kind: "text"
    },
    "nav-5": {
      label: "Navigation: Products",
      value: "Products",
      kind: "text"
    },
    "nav-6": {
      label: "Navigation: Blog",
      value: "Blog",
      kind: "text"
    },
    "nav-7": {
      label: "Navigation: About",
      value: "About",
      kind: "text"
    },
    "nav-8": {
      label: "Navigation: Careers",
      value: "Careers",
      kind: "text"
    },
    "nav-9": {
      label: "Navigation: Testimonials",
      value: "Testimonials",
      kind: "text"
    }
  },
  "chat-widget": {
    "001": {
      label: "Failed to send message",
      value: "Failed to send message",
      kind: "text"
    },
    "002": {
      label: "Chat with us",
      value: "Chat with us",
      kind: "text"
    },
    "003": {
      label: "Sending...",
      value: "Sending...",
      kind: "text"
    },
    "004": {
      label: "Name",
      value: "Name",
      kind: "text"
    },
    "005": {
      label: "Email",
      value: "Email",
      kind: "text"
    },
    "006": {
      label: "Type your message...",
      value: "Type your message...",
      kind: "text"
    }
  },
  seo: {
    title: {
      label: "Default browser title",
      value: "EMINENCE Website",
      kind: "text"
    },
    description: {
      label: "Default search and social description",
      value: "EMINENCE Website \u2014 built on Replit. Update this description to reflect the app.",
      kind: "text"
    }
  }
};

// src/lib/content-model.ts
var field = (key, type = "text", required = true, choices) => ({
  key,
  label: key.replace(/([A-Z])/g, " $1").replace(/^./, (x) => x.toUpperCase()),
  type,
  required,
  choices
});
var contentFields = {
  products: [
    field("slug"),
    field("name"),
    field("tagline", "long"),
    field("description", "long"),
    field("category"),
    field("status", "choice", true, ["Live", "Beta", "Coming Soon"]),
    field("features", "list"),
    field("url", "link", false)
  ],
  posts: [
    field("slug"),
    field("title"),
    field("excerpt", "long"),
    field("author"),
    field("publishedAt"),
    field("category"),
    field("readTime"),
    field("body", "long", false)
  ],
  testimonials: [
    field("clientName"),
    field("company"),
    field("role"),
    field("quote", "long"),
    field("rating", "number"),
    field("service")
  ],
  roles: [
    field("title"),
    field("department"),
    field("location"),
    field("type"),
    field("description", "long"),
    field("postedAt")
  ],
  stats: [
    "clientsServed",
    "projectsDelivered",
    "teamSize",
    "yearsActive",
    "countriesReached",
    "satisfactionRate"
  ].map((key) => field(key, "number"))
};
var safeLink = (value) => !/[\u0000-\u0020]/.test(value) && (/^https?:\/\/[^/]+/i.test(value) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^tel:\+?[\d()-]+$/.test(value) || value === "#");
function fieldsFor(kind, id) {
  if (kind !== "pages") return contentFields[kind];
  const fields = pageDefaults[id];
  if (!fields) return void 0;
  return Object.entries(fields).map(([key, data]) => ({
    key,
    label: data.label,
    type: data.kind === "image" ? "image" : data.kind === "link" ? "link" : data.value.length > 110 ? "long" : "text",
    required: true
  }));
}
function validateContent(kind, id, input) {
  const fields = fieldsFor(kind, id);
  if (!fields) throw new Error("Unknown content group");
  const shape = {};
  for (const f of fields) {
    let schema;
    if (f.type === "number")
      schema = z.number().int().min(f.key === "rating" ? 1 : 0).max(
        f.key === "rating" ? 5 : f.key === "satisfactionRate" ? 100 : 1e9
      );
    else if (f.type === "list")
      schema = z.array(z.string().min(1).max(2e3)).max(50);
    else if (f.type === "choice")
      schema = z.string().refine((v) => f.choices.includes(v), "Choose a supported value");
    else {
      schema = z.string().max(f.key === "body" ? 5e4 : f.type === "long" ? 1e4 : 2e3);
      if (f.required) schema = schema.min(1);
      if (f.type === "link" || f.type === "image")
        schema = schema.refine(
          (v) => v === "" && !f.required || (f.type === "image" ? /^https?:\/\/[^\s]+$/.test(v) : safeLink(v)),
          "Enter a valid URL"
        );
      if (f.key === "slug")
        schema = schema.refine(
          (v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v),
          "Use lowercase words separated by hyphens"
        );
      if (f.key === "publishedAt" || f.key === "postedAt")
        schema = schema.refine(
          (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)),
          "Use YYYY-MM-DD"
        );
    }
    shape[f.key] = f.required ? schema : schema.nullish();
  }
  if (kind !== "pages" && kind !== "stats") shape.id = z.literal(id).optional();
  const result = z.object(shape).strict().safeParse(input);
  return result;
}

// src/routes/site-content.ts
import { z as z2 } from "zod";
var siteContentRouter = Router5();
async function publicRecords(kind) {
  const rows = await db.select().from(siteContentTable).where(
    and(
      eq(siteContentTable.kind, kind),
      eq(siteContentTable.published, true)
    )
  ).orderBy(asc(siteContentTable.publishedPosition), asc(siteContentTable.id));
  return rows.map((row) => row.publishedData);
}
siteContentRouter.get("/site/pages", async (_req, res) => {
  const rows = await db.select().from(siteContentTable).where(
    and(
      eq(siteContentTable.kind, "pages"),
      eq(siteContentTable.published, true)
    )
  );
  res.setHeader("Cache-Control", "no-cache");
  res.json(Object.fromEntries(rows.map((row) => [row.id, row.publishedData])));
});
siteContentRouter.get("/admin/content/schema", requireAdmin, (_req, res) => {
  res.json({
    collections: contentFields,
    pages: Object.fromEntries(
      Object.keys(pageDefaults).map((id) => [id, fieldsFor("pages", id)])
    )
  });
});
siteContentRouter.get(
  "/admin/content/:kind",
  requireAdmin,
  async (req, res) => {
    const kind = String(req.params.kind);
    if (kind !== "pages" && !contentFields[kind]) {
      res.status(404).json({ error: "Unknown content group" });
      return;
    }
    res.json(
      await db.select().from(siteContentTable).where(eq(siteContentTable.kind, kind)).orderBy(asc(siteContentTable.position), asc(siteContentTable.id))
    );
  }
);
var commandSchema = z2.object({
  data: z2.record(z2.unknown()),
  version: z2.number().int().min(0),
  action: z2.enum(["save", "publish", "unpublish"]).default("save"),
  position: z2.number().int().min(0).max(1e5).default(0)
}).strict();
siteContentRouter.put(
  "/admin/content/:kind/:id",
  requireAdmin,
  async (req, res) => {
    const kind = String(req.params.kind);
    const id = String(req.params.id);
    if (id.length > 100 || !fieldsFor(kind, id)) {
      res.status(404).json({ error: "Unknown content group or page" });
      return;
    }
    const command = commandSchema.safeParse(req.body);
    if (!command.success) {
      res.status(400).json({ error: "Invalid content request" });
      return;
    }
    const validated = validateContent(kind, id, command.data.data);
    if (!validated.success) {
      res.status(400).json({
        error: validated.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")
      });
      return;
    }
    const { version, action, position } = command.data;
    const data = validated.data;
    if (kind !== "pages" && kind !== "stats") data.id = id;
    const result = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(73180422)`);
      const [existing] = await tx.select().from(siteContentTable).where(
        and(eq(siteContentTable.kind, kind), eq(siteContentTable.id, id))
      );
      if ((existing?.version ?? 0) !== version)
        return {
          status: 409,
          error: "This content changed in another tab. Reload before saving."
        };
      if (!existing && (kind === "pages" || kind === "stats"))
        return { status: 404, error: "Content record does not exist" };
      if (data.slug) {
        const duplicates = await tx.select().from(siteContentTable).where(
          and(
            eq(siteContentTable.kind, kind),
            sql`${siteContentTable.id} <> ${id}`,
            sql`(${siteContentTable.data}->>'slug' = ${String(data.slug)} OR ${siteContentTable.publishedData}->>'slug' = ${String(data.slug)})`
          )
        );
        if (duplicates.length)
          return { status: 409, error: "This URL slug is already in use" };
      }
      if ((kind === "pages" || kind === "stats") && action === "unpublish")
        return { status: 400, error: "Fixed pages cannot be hidden" };
      const values = {
        kind,
        id,
        data,
        publishedPosition: action === "publish" ? position : existing?.publishedPosition ?? 0,
        position: kind === "pages" ? 0 : position,
        version: version + 1,
        updatedAt: /* @__PURE__ */ new Date(),
        published: action === "publish" ? true : action === "unpublish" ? false : existing?.published ?? false,
        publishedData: action === "publish" ? data : existing?.publishedData ?? null
      };
      const [saved] = await tx.insert(siteContentTable).values(values).onConflictDoUpdate({
        target: [siteContentTable.kind, siteContentTable.id],
        set: values
      }).returning();
      return { status: 200, saved };
    });
    res.status(result.status).json(result.saved ?? { error: result.error });
  }
);
siteContentRouter.delete(
  "/admin/content/:kind/:id",
  requireAdmin,
  async (req, res) => {
    const kind = String(req.params.kind), id = String(req.params.id);
    if (!contentFields[kind] || kind === "stats") {
      res.status(400).json({
        error: "Fixed pages and company statistics cannot be deleted"
      });
      return;
    }
    const version = Number(req.body?.version);
    if (!Number.isInteger(version) || version < 1) {
      res.status(400).json({ error: "Version is required" });
      return;
    }
    const removed = await db.delete(siteContentTable).where(
      and(
        eq(siteContentTable.kind, kind),
        eq(siteContentTable.id, id),
        eq(siteContentTable.version, version)
      )
    ).returning();
    res.status(removed.length ? 200 : 409).json(
      removed.length ? { success: true } : { error: "Content changed. Reload before deleting." }
    );
  }
);

// src/routes/careers.ts
var router4 = Router6();
router4.get("/careers/roles", async (req, res) => {
  res.json(ListRolesResponse.parse(await publicRecords("roles")));
});
router4.post("/careers/apply", async (req, res) => {
  const parsed = SubmitApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      { errors: parsed.error.message },
      "Invalid job application body"
    );
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
import { Router as Router7 } from "express";
var router5 = Router7();
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
import { Router as Router8 } from "express";
var router6 = Router8();
for (const [path2, kind] of Object.entries({
  "/products": "products",
  "/testimonials": "testimonials",
  "/blog/posts": "posts",
  "/stats": "stats"
})) {
  router6.get(path2, async (_req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    const records = await publicRecords(kind);
    res.json(kind === "stats" ? records[0] ?? {} : records);
  });
}
var content_default = router6;

// src/routes/bookings.ts
import { Router as Router9 } from "express";
import { desc, eq as eq2 } from "drizzle-orm";
var router7 = Router9();
var notificationRecipient2 = process.env["CONTACT_NOTIFICATION_TO"] || "info@eminence.co.ug";
function serializeBooking(booking) {
  return {
    ...booking,
    status: booking.status,
    preferredAt: booking.preferredAt.toISOString(),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString()
  };
}
router7.post("/bookings", publicFormRateLimit, async (req, res) => {
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
        message: "Your consultation request has been received."
      })
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
  let localTime;
  try {
    localTime = new Intl.DateTimeFormat("en-UG", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: data.timezone
    }).format(preferredAt);
  } catch {
    res.status(400).json({ error: "A valid timezone is required." });
    return;
  }
  const [booking] = await db.insert(consultationBookingsTable).values({
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone ?? null,
    topic: data.topic,
    message: data.message ?? null,
    preferredAt,
    timezone: data.timezone,
    status: "new"
  }).returning();
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
      notificationRecipient2,
      internalSubject,
      internalHtml,
      data.email
    ),
    sendSystemEmail(
      data.email,
      "We received your EMINENCE consultation request",
      acknowledgementHtml,
      notificationRecipient2
    )
  ]);
  deliveries.forEach((delivery, index) => {
    if (delivery.status === "rejected") {
      req.log.error(
        { err: delivery.reason, bookingId: booking?.id, emailType: index === 0 ? "internal" : "acknowledgement" },
        "Booking email failed"
      );
    }
  });
  req.log.info({ bookingId: booking?.id }, "Consultation booking submitted");
  res.json(
    SubmitBookingResponse.parse({
      success: true,
      message: "Your consultation request has been received. Our team will follow up by email."
    })
  );
});
router7.get("/admin/bookings", requireAdmin, async (_req, res) => {
  const bookings = await db.select().from(consultationBookingsTable).orderBy(desc(consultationBookingsTable.createdAt));
  res.json(ListBookingsResponse.parse(bookings.map(serializeBooking)));
});
router7.patch(
  "/admin/bookings/:id",
  requireAdmin,
  async (req, res) => {
    const bookingId = req.params.id;
    if (typeof bookingId !== "string") {
      res.status(400).json({ error: "A valid booking ID is required." });
      return;
    }
    const parsed = UpdateBookingBody.safeParse(req.body);
    if (!parsed.success || !parsed.data.status && parsed.data.internalNotes === void 0) {
      res.status(400).json({ error: parsed.success ? "No changes provided." : parsed.error.message });
      return;
    }
    const [updated] = await db.update(consultationBookingsTable).set({
      ...parsed.data.status ? { status: parsed.data.status } : {},
      ...parsed.data.internalNotes !== void 0 ? { internalNotes: parsed.data.internalNotes } : {},
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq2(consultationBookingsTable.id, bookingId)).returning();
    if (!updated) {
      res.status(404).json({ error: "Booking not found." });
      return;
    }
    res.json(UpdateBookingResponse.parse(serializeBooking(updated)));
  }
);
var bookings_default = router7;

// src/routes/booking-replies.ts
import { Router as Router10 } from "express";
import { z as z3 } from "zod";
import { eq as eq3, desc as desc2 } from "drizzle-orm";
var bookingRepliesRouter = Router10();
var inputSchema = z3.object({
  id: z3.string().uuid(),
  subject: z3.string().trim().min(1).max(200).refine((v) => !/[\r\n]/.test(v)),
  message: z3.string().trim().min(1).max(1e4),
  kind: z3.enum(["message", "confirm", "propose"]),
  appointmentAt: z3.string().datetime({ offset: true }).optional()
}).strict().superRefine((v, ctx) => {
  if (v.kind !== "message" && (!v.appointmentAt || Date.parse(v.appointmentAt) <= Date.now()))
    ctx.addIssue({
      code: "custom",
      message: "Choose a future appointment time",
      path: ["appointmentAt"]
    });
});
bookingRepliesRouter.get(
  "/admin/bookings/:id/replies",
  requireAdmin,
  async (req, res) => {
    if (!z3.string().uuid().safeParse(req.params.id).success) {
      res.status(400).json({ error: "Invalid booking ID" });
      return;
    }
    res.json(
      await db.select().from(bookingRepliesTable).where(eq3(bookingRepliesTable.bookingId, String(req.params.id))).orderBy(desc2(bookingRepliesTable.createdAt))
    );
  }
);
bookingRepliesRouter.post(
  "/admin/bookings/:id/replies",
  requireAdmin,
  async (req, res) => {
    const parsed = inputSchema.safeParse(req.body);
    if (!parsed.success || !z3.string().uuid().safeParse(req.params.id).success) {
      res.status(400).json({
        error: parsed.success ? "Invalid booking ID" : parsed.error.issues.map((i) => i.message).join("; ")
      });
      return;
    }
    const bookingId = String(req.params.id);
    const [booking] = await db.select().from(consultationBookingsTable).where(eq3(consultationBookingsTable.id, bookingId));
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    const data = parsed.data;
    const [record2] = await db.insert(bookingRepliesTable).values({
      ...data,
      appointmentAt: data.appointmentAt ? new Date(data.appointmentAt) : null,
      bookingId,
      recipient: booking.email
    }).onConflictDoNothing().returning();
    if (!record2) {
      const [existing] = await db.select().from(bookingRepliesTable).where(eq3(bookingRepliesTable.id, data.id));
      if (existing?.bookingId !== bookingId || existing.subject !== data.subject || existing.message !== data.message || existing.kind !== data.kind || existing.appointmentAt?.toISOString() !== (data.appointmentAt ? new Date(data.appointmentAt).toISOString() : void 0)) {
        res.status(409).json({ error: "This response ID has already been used" });
        return;
      }
      res.status(existing.status === "sent" ? 200 : 409).json(
        existing.status === "sent" ? existing : {
          error: "This send was already attempted. Check response history before composing another email."
        }
      );
      return;
    }
    let appointment = "";
    if (data.appointmentAt) {
      const when = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: booking.timezone
      }).format(new Date(data.appointmentAt));
      appointment = `<p><strong>${data.kind === "confirm" ? "Confirmed appointment" : "Proposed appointment"}:</strong> ${escapeHtml(when)} (${escapeHtml(booking.timezone)})</p>`;
    }
    try {
      await sendSystemEmail(
        booking.email,
        data.subject,
        `<p>Hello ${escapeHtml(booking.name)},</p>${appointment}<p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p><p>EMINENCE Services</p>`,
        process.env.CONTACT_NOTIFICATION_TO || process.env.SMTP_USER,
        true
      );
    } catch (error) {
      req.log.error(
        { err: error, replyId: record2.id },
        "Booking reply was not confirmed by mail server"
      );
      await db.update(bookingRepliesTable).set({
        status: "failed",
        error: "Mail server acceptance was not confirmed. Check email configuration and delivery logs before sending again."
      }).where(eq3(bookingRepliesTable.id, record2.id));
      res.status(502).json({
        error: "Email sending failed or could not be confirmed. Your response is saved in history; the booking status was not changed."
      });
      return;
    }
    const saved = await db.transaction(async (tx) => {
      const [reply] = await tx.update(bookingRepliesTable).set({ status: "sent", sentAt: /* @__PURE__ */ new Date() }).where(eq3(bookingRepliesTable.id, record2.id)).returning();
      await tx.update(consultationBookingsTable).set({
        status: data.kind === "confirm" ? "scheduled" : booking.status === "new" ? "contacted" : booking.status,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq3(consultationBookingsTable.id, bookingId));
      return reply;
    });
    res.json(saved);
  }
);

// src/routes/index.ts
var router8 = Router11();
router8.use(bookingRepliesRouter);
router8.use(siteContentRouter);
router8.use(adminAuthRouter);
router8.use(health_default);
router8.use(contact_default);
router8.use(newsletter_default);
router8.use(careers_default);
router8.use(chat_default);
router8.use(content_default);
router8.use(bookings_default);
var routes_default = router8;

// src/app.ts
var app = express();
app.set("trust proxy", 1);
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
var publicCors = cors();
app.use((req, res, next) => {
  if (/^\/api\/admin(?:\/|$)/i.test(req.path)) {
    next();
    return;
  }
  publicCors(req, res, next);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes_default);
var publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");
app.use(express.static(publicDir, { index: "index.html" }));
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path === "/api" || req.path.startsWith("/api/") || path.extname(req.path)) {
    next();
    return;
  }
  res.sendFile(path.join(publicDir, "index.html"), (err) => {
    if (err) next(err);
  });
});
var app_default = app;

// src/lib/initialize-content.ts
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { sql as sql2, eq as eq4 } from "drizzle-orm";
import { fileURLToPath as fileURLToPath2 } from "node:url";

// src/data/catalog-defaults.ts
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

// src/data/blog-body.ts
var defaultBlogBody = `## The Challenge

When building systems at scale, the conventional wisdom often falls short. What works for a thousand users completely breaks down at a million. In this article, we explore the architectural decisions that enabled us to solve this specific challenge.

As engineers, we frequently encounter trade-offs. The CAP theorem reminds us we can't have it all. However, by carefully analyzing access patterns and domain constraints, we found a path forward that compromised neither performance nor reliability.

### Architectural Approach

Our initial thought was to simply scale horizontally. Add more nodes, put a load balancer in front, and call it a day. But horizontal scaling only works if your data tier can handle the concurrent connections.

> "The complexity of a system is a reflection of the organization that built it. We needed to simplify the organization to simplify the architecture."

Instead of throwing more hardware at the problem, we decided to fundamentally rethink the data flow. We implemented an event-driven architecture using an append-only log, paired with read-optimized materialized views.

## Results and Learnings

- **99.9% reduction** in database locking issues
- **Sub-50ms latency** at the 99th percentile
- **Linear scalability** without coordination overhead

The biggest takeaway wasn't the specific technology choice, but the methodology. By stepping back and measuring the actual bottlenecks instead of assuming we knew them, we saved months of engineering effort.`;

// src/lib/initialize-content.ts
async function seedContent() {
  await db.transaction(async (tx) => {
    await tx.execute(sql2`select pg_advisory_xact_lock(73180421)`);
    const seedName = "existing-website-v1";
    if ((await tx.select().from(siteSeedsTable).where(eq4(siteSeedsTable.name, seedName))).length)
      return;
    const collections = {
      products: PRODUCTS,
      posts: BLOG_POSTS,
      testimonials: TESTIMONIALS,
      roles: OPEN_ROLES
    };
    for (const [kind, records] of Object.entries(collections)) {
      for (const [position, record2] of records.entries()) {
        const data = {
          ...record2,
          ...kind === "posts" ? { body: defaultBlogBody } : {}
        };
        await tx.insert(siteContentTable).values({
          kind,
          id: record2.id,
          data,
          publishedData: data,
          published: true,
          position,
          publishedPosition: position
        }).onConflictDoNothing();
      }
    }
    await tx.insert(siteContentTable).values({
      kind: "stats",
      id: "company",
      data: STATS,
      publishedData: STATS,
      published: true
    }).onConflictDoNothing();
    for (const [id, fields] of Object.entries(pageDefaults)) {
      const data = Object.fromEntries(
        Object.entries(fields).map(([key, field2]) => [key, field2.value])
      );
      await tx.insert(siteContentTable).values({
        kind: "pages",
        id,
        data,
        publishedData: data,
        published: true
      }).onConflictDoNothing();
    }
    await tx.insert(siteSeedsTable).values({ name: seedName });
  });
}
async function initializeContent() {
  await migrate(db, {
    migrationsFolder: fileURLToPath2(new URL("./migrations", import.meta.url))
  });
  await seedContent();
}

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
await initializeContent();
app_default.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
//# sourceMappingURL=index.mjs.map
