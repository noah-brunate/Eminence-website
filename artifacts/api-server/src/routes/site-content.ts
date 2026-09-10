import { Router } from "express";
import { randomUUID } from "node:crypto";
import { and, eq, asc, sql } from "drizzle-orm";
import { db, siteContentTable } from "@workspace/db";
import { requireAdmin } from "../lib/admin-auth";
import {
  fieldsFor,
  validateContent,
  contentFields,
} from "../lib/content-model";
import { pageDefaults } from "../data/page-defaults";
import { z } from "zod";

export const siteContentRouter = Router();
export async function publicRecords(kind: string) {
  const rows = await db
    .select()
    .from(siteContentTable)
    .where(
      and(
        eq(siteContentTable.kind, kind),
        eq(siteContentTable.published, true),
      ),
    )
    .orderBy(asc(siteContentTable.publishedPosition), asc(siteContentTable.id));
  return rows.map((row) => row.publishedData!);
}
siteContentRouter.get("/site/pages", async (_req, res) => {
  const rows = await db
    .select()
    .from(siteContentTable)
    .where(
      and(
        eq(siteContentTable.kind, "pages"),
        eq(siteContentTable.published, true),
      ),
    );
  res.setHeader("Cache-Control", "no-cache");
  res.json(Object.fromEntries(rows.map((row) => [row.id, row.publishedData])));
});
siteContentRouter.get("/admin/content/schema", requireAdmin, (_req, res) => {
  res.json({
    collections: contentFields,
    pages: Object.fromEntries(
      Object.keys(pageDefaults).map((id) => [id, fieldsFor("pages", id)]),
    ),
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
      await db
        .select()
        .from(siteContentTable)
        .where(eq(siteContentTable.kind, kind))
        .orderBy(asc(siteContentTable.position), asc(siteContentTable.id)),
    );
  },
);
const commandSchema = z
  .object({
    data: z.record(z.unknown()),
    version: z.number().int().min(0),
    action: z.enum(["save", "publish", "unpublish"]).default("save"),
    position: z.number().int().min(0).max(100000).default(0),
  })
  .strict();
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
      res
        .status(400)
        .json({
          error: validated.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; "),
        });
      return;
    }
    const { version, action, position } = command.data;
    const data = validated.data as Record<string, unknown>;
    if (kind !== "pages" && kind !== "stats") data.id = id;
    const result = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(73180422)`);
      const [existing] = await tx
        .select()
        .from(siteContentTable)
        .where(
          and(eq(siteContentTable.kind, kind), eq(siteContentTable.id, id)),
        );
      if ((existing?.version ?? 0) !== version)
        return {
          status: 409,
          error: "This content changed in another tab. Reload before saving.",
        };
      if (!existing && (kind === "pages" || kind === "stats"))
        return { status: 404, error: "Content record does not exist" };
      if (data.slug) {
        const duplicates = await tx
          .select()
          .from(siteContentTable)
          .where(
            and(
              eq(siteContentTable.kind, kind),
              sql`${siteContentTable.id} <> ${id}`,
              sql`(${siteContentTable.data}->>'slug' = ${String(data.slug)} OR ${siteContentTable.publishedData}->>'slug' = ${String(data.slug)})`,
            ),
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
        publishedPosition:
          action === "publish" ? position : (existing?.publishedPosition ?? 0),
        position: kind === "pages" ? 0 : position,
        version: version + 1,
        updatedAt: new Date(),
        published:
          action === "publish"
            ? true
            : action === "unpublish"
              ? false
              : (existing?.published ?? false),
        publishedData:
          action === "publish" ? data : (existing?.publishedData ?? null),
      };
      const [saved] = await tx
        .insert(siteContentTable)
        .values(values)
        .onConflictDoUpdate({
          target: [siteContentTable.kind, siteContentTable.id],
          set: values,
        })
        .returning();
      return { status: 200, saved };
    });
    res.status(result.status).json(result.saved ?? { error: result.error });
  },
);
siteContentRouter.delete(
  "/admin/content/:kind/:id",
  requireAdmin,
  async (req, res) => {
    const kind = String(req.params.kind),
      id = String(req.params.id);
    if (!contentFields[kind] || kind === "stats") {
      res
        .status(400)
        .json({
          error: "Fixed pages and company statistics cannot be deleted",
        });
      return;
    }
    const version = Number(req.body?.version);
    if (!Number.isInteger(version) || version < 1) {
      res.status(400).json({ error: "Version is required" });
      return;
    }
    const removed = await db
      .delete(siteContentTable)
      .where(
        and(
          eq(siteContentTable.kind, kind),
          eq(siteContentTable.id, id),
          eq(siteContentTable.version, version),
        ),
      )
      .returning();
    res
      .status(removed.length ? 200 : 409)
      .json(
        removed.length
          ? { success: true }
          : { error: "Content changed. Reload before deleting." },
      );
  },
);
