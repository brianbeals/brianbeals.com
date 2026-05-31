// Stateless signed-cookie gate. Works in both Edge (middleware) and Node (route
// handlers) because it uses Web Crypto (globalThis.crypto.subtle), available in both.

export const COOKIE_NAME = "bb_gate";

const enc = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(sig);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Returns a cookie value `${expiryMs}.${sig}` valid for ttlMs from now.
export async function signSession(secret: string, ttlMs: number): Promise<string> {
  const exp = String(Date.now() + ttlMs);
  const sig = await hmacHex(secret, exp);
  return `${exp}.${sig}`;
}

export async function verifySession(secret: string, value: string): Promise<boolean> {
  const dot = value.indexOf(".");
  if (dot === -1) return false;
  const exp = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!/^\d+$/.test(exp)) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = await hmacHex(secret, exp);
  return timingSafeEqual(sig, expected);
}
