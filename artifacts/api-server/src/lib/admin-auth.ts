import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { verifyPassword } from "./admin-password";

const COOKIE = "eminence_admin_session";
const TTL = 8 * 60 * 60 * 1000;
const sessions = new Map<
  string,
  { csrf: string; expires: number; identity: string }
>();
const attempts = new Map<string, { count: number; expires: number }>();
let verifying = 0;
const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");
const identity = () =>
  digest(`${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD_HASH}`);
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/api/admin",
});
function sessionKey(req: Request): string {
  const raw = req.headers.cookie
    ?.split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  return digest(raw || "");
}
function session(req: Request) {
  const key = sessionKey(req);
  const value = sessions.get(key);
  if (value && value.expires > Date.now() && value.identity === identity())
    return value;
  sessions.delete(key);
  return undefined;
}
const cleanup = setInterval(() => {
  for (const [key, value] of sessions)
    if (value.expires <= Date.now()) sessions.delete(key);
  for (const [key, value] of attempts)
    if (value.expires <= Date.now()) attempts.delete(key);
}, 60_000);
cleanup.unref();

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.setHeader("Cache-Control", "no-store");
  const current = session(req);
  if (!current) {
    res.status(401).json({ error: "Please sign in." });
    return;
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const supplied = req.get("X-CSRF-Token") || "";
    if (
      !timingSafeEqual(
        Buffer.from(digest(supplied)),
        Buffer.from(digest(current.csrf)),
      )
    ) {
      res
        .status(403)
        .json({ error: "Invalid session token. Refresh and try again." });
      return;
    }
  }
  next();
}

export const adminAuthRouter = Router();
adminAuthRouter.use("/admin", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
adminAuthRouter.post("/admin/login", async (req, res): Promise<void> => {
  // A custom header plus no admin CORS support prevents cross-origin login requests.
  if (
    req.get("X-Admin-Request") !== "1" ||
    !req.is("application/json") ||
    req.get("Sec-Fetch-Site") === "cross-site"
  ) {
    res.status(403).json({ error: "Sign in from the admin page." });
    return;
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!email || !hash) {
    res
      .status(503)
      .json({
        error:
          "Administrator login is not configured. Run the administrator setup command on the API server.",
      });
    return;
  }
  const ip = req.ip || "unknown";
  let limit = attempts.get(ip);
  if (!limit || limit.expires <= Date.now()) {
    if (attempts.size >= 10000) {
      res
        .status(429)
        .json({ error: "Too many sign-in attempts. Try again later." });
      return;
    }
    limit = { count: 0, expires: Date.now() + 15 * 60 * 1000 };
    attempts.set(ip, limit);
  }
  if (limit.count >= 5 || verifying >= 2) {
    res.setHeader(
      "Retry-After",
      Math.max(1, Math.ceil((limit.expires - Date.now()) / 1000)),
    );
    res
      .status(429)
      .json({ error: "Too many sign-in attempts. Try again in 15 minutes." });
    return;
  }
  limit.count++;
  const { email: suppliedEmail, password } = req.body || {};
  if (
    typeof suppliedEmail !== "string" ||
    typeof password !== "string" ||
    password.length > 1024 ||
    suppliedEmail.length > 254
  ) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }
  verifying++;
  let valid = false;
  try {
    valid = await verifyPassword(hash, password);
  } catch {
    res
      .status(503)
      .json({
        error:
          "Administrator password configuration is invalid. Run administrator setup again.",
      });
    return;
  } finally {
    verifying--;
  }
  if (!valid || suppliedEmail.trim().toLowerCase() !== email) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }
  attempts.delete(ip);
  sessions.delete(sessionKey(req));
  if (sessions.size >= 1000) sessions.delete(sessions.keys().next().value!);
  const token = randomBytes(32).toString("hex");
  const csrf = randomBytes(32).toString("hex");
  sessions.set(digest(token), {
    csrf,
    expires: Date.now() + TTL,
    identity: identity(),
  });
  res.cookie(COOKIE, token, { ...cookieOptions(), maxAge: TTL });
  res.json({ email, csrfToken: csrf });
});
adminAuthRouter.get("/admin/session", requireAdmin, (req, res) => {
  res.json({ email: process.env.ADMIN_EMAIL, csrfToken: session(req)!.csrf });
});
adminAuthRouter.post("/admin/logout", requireAdmin, (req, res) => {
  sessions.delete(sessionKey(req));
  res.clearCookie(COOKIE, cookieOptions());
  res.json({ success: true });
});
