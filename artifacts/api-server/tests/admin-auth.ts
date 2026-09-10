import assert from "node:assert/strict";
import express from "express";
import { scryptSync } from "node:crypto";
import { adminAuthRouter, requireAdmin } from "../src/lib/admin-auth";

process.env.ADMIN_EMAIL = "admin@example.com";
process.env.ADMIN_PASSWORD_HASH =
  "scrypt:131072:8:1:" +
  "ab".repeat(16) +
  ":" +
  scryptSync("test-password-only", "ab".repeat(16), 64, {
    N: 131072,
    r: 8,
    p: 1,
    maxmem: 268435456,
  }).toString("hex");
process.env.NODE_ENV = "production";
const app = express();
app.use(express.json());
app.use("/api", adminAuthRouter);
app.patch("/api/admin/protected", requireAdmin, (_req, res) =>
  res.json({ ok: true }),
);
const server = app.listen(0, "127.0.0.1");
await new Promise<void>((resolve) => server.once("listening", resolve));
const address = server.address() as { port: number };
const base = `http://127.0.0.1:${address.port}/api/admin`;
const login = (
  password = "test-password-only",
  headers: Record<string, string> = { "X-Admin-Request": "1" },
) =>
  fetch(`${base}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ email: "admin@example.com", password }),
  });
try {
  assert.equal((await fetch(`${base}/session`)).status, 401);
  assert.equal((await login("test-password-only", {})).status, 403);
  assert.equal(
    (
      await login("test-password-only", {
        "X-Admin-Request": "1",
        "Sec-Fetch-Site": "cross-site",
      })
    ).status,
    403,
  );
  assert.equal((await login("wrong")).status, 401);
  const response = await login();
  assert.equal(response.status, 200);
  const setCookie = response.headers.get("set-cookie")!;
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /Secure/);
  assert.match(setCookie, /SameSite=Strict/);
  const cookie = setCookie.split(";")[0];
  const { csrfToken } = (await response.json()) as { csrfToken: string };
  assert.equal(
    (await fetch(`${base}/session`, { headers: { Cookie: cookie } })).status,
    200,
  );
  assert.equal(
    (
      await fetch(`${base}/protected`, {
        method: "PATCH",
        headers: { Cookie: cookie },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await fetch(`${base}/protected`, {
        method: "PATCH",
        headers: { Cookie: cookie, "X-CSRF-Token": csrfToken },
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await fetch(`${base}/logout`, {
        method: "POST",
        headers: { Cookie: cookie, "X-CSRF-Token": csrfToken },
      })
    ).status,
    200,
  );
  assert.equal(
    (await fetch(`${base}/session`, { headers: { Cookie: cookie } })).status,
    401,
  );
  assert.equal(
    (
      await fetch(`${base}/session`, {
        headers: { Authorization: "Bearer old-api-key" },
      })
    ).status,
    401,
  );
  const nextLogin = await login();
  const nextCookie = nextLogin.headers.get("set-cookie")!.split(";")[0];
  const realNow = Date.now;
  Date.now = () => realNow() + 9 * 60 * 60 * 1000;
  assert.equal(
    (await fetch(`${base}/session`, { headers: { Cookie: nextCookie } }))
      .status,
    401,
  );
  Date.now = realNow;
  for (let i = 0; i < 5; i++) assert.equal((await login("wrong")).status, 401);
  assert.equal((await login()).status, 429);
  console.log(
    "Passed: login, cookie protection, session restore, CSRF, logout, legacy key rejection, expiry, and rate limiting.",
  );
} finally {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
}
