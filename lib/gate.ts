// Stateless signed-cookie gate. Works in both Edge (middleware) and Node (route
// handlers) because it uses Web Crypto (globalThis.crypto.subtle), available in both.
// No imports, so scripts/test_gate.mjs runs it under plain `node --test`.
//
// TWO ROLES (2026-10-27). SITE_GATE_PASSWORD signs in the owner (Brian), for 30
// days. SITE_GATE_VIEWER_PASSWORD, when set and not empty, signs in a read-only
// viewer for 14 days: the desk and everything under it, nothing that starts a job,
// sends mail or writes data (viewerBlocked below, the free-test owner fast path,
// /desk/hand-check). Unset or empty, viewer login is off and every viewer cookie
// already issued fails.
//
// The cookie is `${role}.${expiryMs}.${sig}`. The role is inside the HMAC, so a
// viewer cannot edit its cookie into an owner one. A viewer's signature also covers
// an epoch derived from the viewer password and SITE_GATE_VIEWER_VERSION: change
// either and every viewer session dies, the owner's untouched. Cookies from before
// roles (`${expiryMs}.${sig}`) no longer verify; the owner signs in once more.

export const COOKIE_NAME = "bb_gate";

export type Role = "owner" | "viewer";
type Env = Record<string, string | undefined>;

const DAY = 24 * 60 * 60 * 1000;
export const TTL_MS: Record<Role, number> = { owner: 30 * DAY, viewer: 14 * DAY };

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

const secretOf = (env: Env) => env.SITE_GATE_SECRET || "";
const viewerPassword = (env: Env) => env.SITE_GATE_VIEWER_PASSWORD || "";

/* The viewer epoch: an HMAC of the viewer password and version, never the password
   itself, so nothing about it is recoverable from a cookie. Null when viewers are off. */
async function viewerEpoch(env: Env): Promise<string | null> {
  const pw = viewerPassword(env);
  if (!pw) return null;
  return hmacHex(secretOf(env), `viewer-epoch\n${env.SITE_GATE_VIEWER_VERSION || ""}\n${pw}`);
}

async function message(role: Role, exp: string, env: Env): Promise<string | null> {
  if (role === "owner") return `owner.${exp}`;
  const epoch = await viewerEpoch(env);
  return epoch ? `viewer.${exp}.${epoch}` : null;
}

/* Which role a typed password signs in, or null. Compared as HMACs so the time
   taken says nothing about how much of a password matched. The owner wins if both
   passwords are ever set the same. */
export async function roleForPassword(typed: unknown, env: Env = process.env): Promise<Role | null> {
  const secret = secretOf(env);
  if (!secret || typeof typed !== "string" || !typed) return null;
  const t = await hmacHex(secret, `pw\n${typed}`);
  const owner = env.SITE_GATE_PASSWORD || "";
  if (owner && timingSafeEqual(t, await hmacHex(secret, `pw\n${owner}`))) return "owner";
  const viewer = viewerPassword(env);
  if (viewer && timingSafeEqual(t, await hmacHex(secret, `pw\n${viewer}`))) return "viewer";
  return null;
}

/* A cookie value for the role, valid for its TTL from now; null if it cannot be
   signed (no secret, or a viewer while viewers are off). */
export async function signSession(role: Role, env: Env = process.env, now = Date.now()): Promise<string | null> {
  const secret = secretOf(env);
  if (!secret) return null;
  const exp = String(now + TTL_MS[role]);
  const msg = await message(role, exp, env);
  if (!msg) return null;
  return `${role}.${exp}.${await hmacHex(secret, msg)}`;
}

/* The role a cookie value carries, or null if it is missing, expired, forged, or a
   viewer's from before the viewer password or version changed. */
export async function verifySession(
  value: string | undefined,
  env: Env = process.env,
  now = Date.now(),
): Promise<Role | null> {
  const secret = secretOf(env);
  if (!secret || !value) return null;
  const m = /^(owner|viewer)\.(\d{1,15})\.([0-9a-f]{64})$/.exec(value);
  if (!m) return null;
  const role = m[1] as Role;
  if (Number(m[2]) < now) return null;
  const msg = await message(role, m[2], env);
  if (!msg) return null;
  return timingSafeEqual(m[3], await hmacHex(secret, msg)) ? role : null;
}

/* Gated paths a viewer is refused, with the read-only page. /tools is everything
   gated there (the public /tools/voice-critique never reaches the gate);
   /desk/hand-check is the hand check's start page. The free-test owner fast path is
   a server action on the public /free-test, refused in app/free-test/actions.ts. */
export function viewerBlocked(path: string): boolean {
  const under = (p: string) => path === p || path.startsWith(`${p}/`);
  return under("/tools") || under("/desk/hand-check");
}
