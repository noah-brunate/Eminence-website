import type { NextFunction, Request, Response } from "express";

type Entry = { count: number; resetAt: number };
const attempts = new Map<string, Entry>();

export function publicFormRateLimit(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const existing = attempts.get(key);
  const entry = !existing || existing.resetAt <= now
    ? { count: 0, resetAt: now + 15 * 60 * 1000 }
    : existing;

  entry.count += 1;
  attempts.set(key, entry);
  res.setHeader("X-RateLimit-Limit", "5");
  res.setHeader("X-RateLimit-Remaining", String(Math.max(0, 5 - entry.count)));

  if (entry.count > 5) {
    res.setHeader("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }

  if (attempts.size > 10_000) {
    for (const [attemptKey, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(attemptKey);
    }
  }

  next();
}
