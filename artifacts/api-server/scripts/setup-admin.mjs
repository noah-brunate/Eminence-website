import { randomBytes, scrypt } from "node:crypto";
import { readFile, writeFile, chmod } from "node:fs/promises";
import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });
try {
  const email = (
    process.argv[2] || (await rl.question("Administrator email: "))
  )
    .trim()
    .toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Enter a valid email address.");
  const password = randomBytes(24).toString("base64url");
  const salt = randomBytes(16).toString("hex");
  // OWASP scrypt parameters; keep admin-password.ts in sync.
  const derived = await new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      64,
      { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 },
      (err, key) => (err ? reject(err) : resolve(key)),
    );
  });
  const passwordHash = `scrypt:131072:8:1:${salt}:${derived.toString("hex")}`;
  const file = new URL("../.env", import.meta.url);
  let contents = await readFile(file, "utf8");
  for (const [name, value] of Object.entries({
    ADMIN_EMAIL: email,
    ADMIN_PASSWORD_HASH: passwordHash,
  })) {
    const pattern = new RegExp(`^${name}=.*$`, "m");
    contents = pattern.test(contents)
      ? contents.replace(pattern, () => `${name}=${value}`)
      : `${contents.trimEnd()}\n${name}=${value}\n`;
  }
  contents = contents.replace(/^ADMIN_API_KEY=.*\n?/gm, "");
  await writeFile(file, contents, { mode: 0o600 });
  await chmod(file, 0o600);
  console.log(
    `Administrator configured.\nEmail: ${email}\nPassword: ${password}\nSave this password in your password manager. Restart the API server to apply it.`,
  );
} finally {
  rl.close();
}
