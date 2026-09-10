import { db, siteContentTable, siteSeedsTable } from "@workspace/db";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { sql, eq } from "drizzle-orm";
import { fileURLToPath } from "node:url";
import {
  PRODUCTS,
  BLOG_POSTS,
  TESTIMONIALS,
  STATS,
  OPEN_ROLES,
} from "../data/catalog-defaults";
import { defaultBlogBody } from "../data/blog-body";
import { pageDefaults } from "../data/page-defaults";

export async function seedContent() {
  await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(73180421)`);
    const seedName = "existing-website-v1";
    if (
      (
        await tx
          .select()
          .from(siteSeedsTable)
          .where(eq(siteSeedsTable.name, seedName))
      ).length
    )
      return;
    const collections = {
      products: PRODUCTS,
      posts: BLOG_POSTS,
      testimonials: TESTIMONIALS,
      roles: OPEN_ROLES,
    };
    for (const [kind, records] of Object.entries(collections)) {
      for (const [position, record] of records.entries()) {
        const data = {
          ...record,
          ...(kind === "posts" ? { body: defaultBlogBody } : {}),
        } as Record<string, unknown>;
        await tx
          .insert(siteContentTable)
          .values({
            kind,
            id: record.id,
            data,
            publishedData: data,
            published: true,
            position,
            publishedPosition: position,
          })
          .onConflictDoNothing();
      }
    }
    await tx
      .insert(siteContentTable)
      .values({
        kind: "stats",
        id: "company",
        data: STATS,
        publishedData: STATS,
        published: true,
      })
      .onConflictDoNothing();
    for (const [id, fields] of Object.entries(pageDefaults)) {
      const data = Object.fromEntries(
        Object.entries(fields).map(([key, field]) => [key, field.value]),
      );
      await tx
        .insert(siteContentTable)
        .values({
          kind: "pages",
          id,
          data,
          publishedData: data,
          published: true,
        })
        .onConflictDoNothing();
    }
    await tx.insert(siteSeedsTable).values({ name: seedName });
  });
}

export async function initializeContent() {
  // Build copies committed migrations alongside the server bundle for deployment.
  await migrate(db, {
    migrationsFolder: fileURLToPath(new URL("./migrations", import.meta.url)),
  });
  await seedContent();
}
