import { build } from "esbuild";
import { mkdir, rm } from "node:fs/promises";
import { pathToFileURL, fileURLToPath } from "node:url";
const output = fileURLToPath(
  new URL("../node_modules/.cache/admin-auth-test.mjs", import.meta.url),
);
await mkdir(new URL("../node_modules/.cache/", import.meta.url), {
  recursive: true,
});
try {
  await build({
    entryPoints: [
      fileURLToPath(new URL("../tests/admin-auth.ts", import.meta.url)),
    ],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
  });
  await import(pathToFileURL(output).href);
} finally {
  await rm(output, { force: true });
}
