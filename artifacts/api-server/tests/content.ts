import assert from "node:assert/strict";
import { randomUUID, scryptSync } from "node:crypto";
import path from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { eq } from "drizzle-orm";
import app from "../src/app";
import {
  db,
  pool,
  siteContentTable,
  consultationBookingsTable,
  bookingRepliesTable,
} from "@workspace/db";
import { seedContent } from "../src/lib/initialize-content";
import { sent } from "./mock-mail";
import { pageDefaults } from "../src/data/page-defaults";

process.env.ADMIN_EMAIL = "admin@example.com";
process.env.ADMIN_PASSWORD_HASH =
  "scrypt:131072:8:1:" +
  "ab".repeat(16) +
  ":" +
  scryptSync("cms-test-password", "ab".repeat(16), 64, {
    N: 131072,
    r: 8,
    p: 1,
    maxmem: 268435456,
  }).toString("hex");
process.env.NODE_ENV = "development";
let server: ReturnType<typeof app.listen> | undefined;
try {
  await migrate(db, { migrationsFolder: path.resolve("dist/migrations") });
  await seedContent();
  const before = await db.select().from(siteContentTable);
  await seedContent();
  assert.equal(
    (await db.select().from(siteContentTable)).length,
    before.length,
  );
  server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server!.once("listening", resolve);
    server!.once("error", reject);
  });
  const base = `http://127.0.0.1:${(server.address() as { port: number }).port}/api`;
  let cookie = "",
    csrf = "";
  async function request(
    url: string,
    method = "GET",
    body?: unknown,
    auth = true,
  ) {
    return fetch(base + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Cookie: cookie, "X-CSRF-Token": csrf } : {}),
        ...(url === "/admin/login" ? { "X-Admin-Request": "1" } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  }
  let res = await request("/admin/content/products");
  assert.equal(res.status, 401);
  res = await request("/admin/login", "POST", {
    email: "admin@example.com",
    password: "cms-test-password",
  });
  assert.equal(res.status, 200);
  cookie = res.headers.get("set-cookie")!.split(";")[0];
  csrf = ((await res.json()) as { csrfToken: string }).csrfToken;
  res = await request("/admin/content/products");
  const rows = (await res.json()) as Array<{
    id: string;
    data: Record<string, unknown>;
    version: number;
    position: number;
  }>;
  assert.equal(rows.length, 6);
  let row = rows[0];
  const changed = { ...row.data, name: "CMS integration test product" };
  res = await request(`/admin/content/products/${row.id}`, "PUT", {
    data: changed,
    version: row.version,
    position: 999,
    action: "save",
  });
  assert.equal(res.status, 200);
  let saved = (await res.json()) as typeof row;
  let products = (await (await request("/products")).json()) as Array<
    Record<string, unknown>
  >;
  assert.equal(products[0].name, row.data.name);
  assert.equal(products[0].id, row.id);
  res = await request(`/admin/content/products/${row.id}`, "PUT", {
    data: changed,
    version: row.version,
    position: 999,
    action: "publish",
  });
  assert.equal(res.status, 409);
  res = await request(`/admin/content/products/${row.id}`, "PUT", {
    data: changed,
    version: saved.version,
    position: 999,
    action: "publish",
  });
  assert.equal(res.status, 200);
  saved = (await res.json()) as typeof row;
  products = (await (await request("/products")).json()) as Array<
    Record<string, unknown>
  >;
  assert.equal(products.at(-1)!.name, changed.name);
  await seedContent();
  assert.equal(
    (
      await db
        .select()
        .from(siteContentTable)
        .where(eq(siteContentTable.id, row.id))
    )[0].data.name,
    changed.name,
  );
  res = await request(`/admin/content/products/${row.id}`, "PUT", {
    data: { ...changed, url: "javascript:alert(1)" },
    version: saved.version,
    position: 999,
    action: "save",
  });
  assert.equal(res.status, 400);
  res = await request(`/admin/content/products/${row.id}`, "PUT", {
    data: changed,
    version: saved.version,
    position: 999,
    action: "unpublish",
  });
  assert.equal(res.status, 200);
  saved = (await res.json()) as typeof row;
  products = (await (await request("/products")).json()) as Array<
    Record<string, unknown>
  >;
  assert.equal(products.length, 5);
  res = await request(`/admin/content/products/${row.id}`, "DELETE", {
    version: saved.version,
  });
  assert.equal(res.status, 200);
  await seedContent();
  assert.equal(
    (
      await db
        .select()
        .from(siteContentTable)
        .where(eq(siteContentTable.id, row.id))
    ).length,
    0,
  );
  const pages = (await (await request("/admin/content/pages")).json()) as Array<
    typeof row
  >;
  const page = pages.find((p) => p.id === "about")!;
  res = await request("/admin/content/pages/about", "PUT", {
    data: { ...page.data, layout: "new-design" },
    version: page.version,
    action: "publish",
  });
  assert.equal(res.status, 400);
  const key = Object.keys(pageDefaults.about)[0];
  res = await request("/admin/content/pages/about", "PUT", {
    data: { ...page.data, [key]: "Updated company copy" },
    version: page.version,
    action: "publish",
  });
  assert.equal(res.status, 200);
  assert.equal(
    (
      (await (await request("/site/pages")).json()) as Record<
        string,
        Record<string, string>
      >
    ).about[key],
    "Updated company copy",
  );
  const [booking] = await db
    .insert(consultationBookingsTable)
    .values({
      name: "Test Customer",
      email: "customer@example.invalid",
      company: "Test",
      topic: "Consultation",
      preferredAt: new Date(Date.now() + 86400000),
      timezone: "Africa/Kampala",
    })
    .returning();
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  res = await request(`/admin/bookings/${booking.id}/replies`, "POST", {
    id: randomUUID(),
    subject: "Test response",
    message: "Hello",
    kind: "message",
  });
  assert.equal(res.status, 502);
  assert.equal(sent.length, 0);
  assert.equal(
    (
      await db
        .select()
        .from(consultationBookingsTable)
        .where(eq(consultationBookingsTable.id, booking.id))
    )[0].status,
    "new",
  );
  process.env.SMTP_HOST = "mock-only";
  process.env.SMTP_USER = "sender@example.invalid";
  process.env.SMTP_PASS = "test";
  const reply = {
    id: randomUUID(),
    subject: "Appointment confirmed",
    message: "Hello <script>alert(1)</script>",
    kind: "confirm",
    appointmentAt: new Date(Date.now() + 2 * 86400000).toISOString(),
  };
  res = await request(`/admin/bookings/${booking.id}/replies`, "POST", reply);
  assert.equal(res.status, 200);
  assert.equal(sent.length, 1);
  assert.match(String(sent[0].html), /&lt;script&gt;/);
  assert.equal(sent[0].to, "customer@example.invalid");
  res = await request(`/admin/bookings/${booking.id}/replies`, "POST", reply);
  assert.equal(res.status, 200);
  assert.equal(sent.length, 1);
  assert.equal(
    (
      await db
        .select()
        .from(consultationBookingsTable)
        .where(eq(consultationBookingsTable.id, booking.id))
    )[0].status,
    "scheduled",
  );
  const replies = (await (
    await request(`/admin/bookings/${booking.id}/replies`)
  ).json()) as unknown[];
  assert.equal(replies.length, 2);
  const denied = await fetch(base + "/admin/content/pages/about", {
    method: "PUT",
    headers: { Cookie: cookie, "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(denied.status, 403);
  console.log(
    "PASS: repeatable seeding, non-overwriting edits, draft isolation, publish/unpublish/delete, ordering, version conflicts, fixed page fields, safe URLs, authenticated access, CSRF, SMTP failure, reply history, escaped email content and send idempotency. No real emails sent.",
  );
} finally {
  if (server) {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server!.close(() => resolve()));
  }
  await pool.end();
}
