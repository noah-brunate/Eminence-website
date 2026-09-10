import { build } from "esbuild";
import pg from "pg";
import { randomBytes } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdir, rm } from "node:fs/promises";
const source = process.env.DATABASE_URL;
if (!source) throw new Error("Run with the API .env loaded.");
const database = "eminence_cms_test_" + randomBytes(6).toString("hex");
const maintenance = new pg.Client({
  connectionString: source,
  connectionTimeoutMillis: 5000,
});
const output = fileURLToPath(
  new URL("../node_modules/.cache/content-test.mjs", import.meta.url),
);
await maintenance.connect();
let created = false;
try {
  await maintenance.query(`CREATE DATABASE "${database}"`);
  created = true;
  const url = new URL(source);
  url.pathname = "/" + database;
  process.env.DATABASE_URL = url.href;
  await mkdir(new URL("../node_modules/.cache/", import.meta.url), {
    recursive: true,
  });
  await build({
    entryPoints: [
      fileURLToPath(new URL("../tests/content.ts", import.meta.url)),
    ],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    plugins: [
      {
        name: "external-dependencies",
        setup(b) {
          b.onResolve({ filter: /^[^./]|^\.[^./]/ }, (args) =>
            args.path.startsWith("@workspace/") || args.path === "nodemailer"
              ? undefined
              : { path: args.path, external: true },
          );
        },
      },
      {
        name: "mock-mail",
        setup(b) {
          b.onResolve({ filter: /^nodemailer$/ }, () => ({
            path: fileURLToPath(
              new URL("../tests/mock-mail.ts", import.meta.url),
            ),
          }));
        },
      },
    ],
  });
  process.env.LOG_LEVEL = "silent";
  await import(pathToFileURL(output).href);
} finally {
  process.env.DATABASE_URL = source;
  if (created)
    await maintenance.query(`DROP DATABASE "${database}" WITH (FORCE)`);
  await maintenance.end();
  await rm(output, { force: true });
}
