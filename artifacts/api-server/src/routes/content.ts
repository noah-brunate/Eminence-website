import { Router } from "express";
import { publicRecords } from "./site-content";
const router = Router();
for (const [path, kind] of Object.entries({
  "/products": "products",
  "/testimonials": "testimonials",
  "/blog/posts": "posts",
  "/stats": "stats",
})) {
  router.get(path, async (_req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    const records = await publicRecords(kind);
    res.json(kind === "stats" ? (records[0] ?? {}) : records);
  });
}
export default router;
