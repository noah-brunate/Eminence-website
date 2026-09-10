import { scrypt, timingSafeEqual } from "node:crypto";

// OWASP scrypt parameters; keep setup-admin.mjs in sync.
export async function verifyPassword(
  encoded: string,
  password: string,
): Promise<boolean> {
  const match = /^scrypt:131072:8:1:([a-f0-9]{32}):([a-f0-9]{128})$/.exec(
    encoded,
  );
  if (!match) throw new Error("Invalid password hash configuration");
  const salt = match[1]!;
  const expected = Buffer.from(match[2]!, "hex");
  const actual = await new Promise<Buffer>((resolve, reject) => {
    scrypt(
      password,
      salt,
      64,
      { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 },
      (error, key) => (error ? reject(error) : resolve(key)),
    );
  });
  return timingSafeEqual(actual, expected);
}
