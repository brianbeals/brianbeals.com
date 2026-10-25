// The free test's half on Vercel (docs/free-test/SPEC.md, build step 3). The site
// keeps nothing: each request, confirmation and approval becomes one signed email
// to Brian's Proton folder "Free Test Requests", which the engine on the Mac mini
// reads over IMAP (a11y-audit free_test/). The Proton filter files a message there
// only when it is From freetest@forms.brianbeals.com and its subject begins
// "[free-test]".
//
// SIGNED MESSAGES. Anyone can mail that folder, so the engine acts only on a body
// carrying this block with a valid HMAC-SHA256 over the exact JSON line, a
// timestamp under 24 hours old, and an id it has never seen:
//
//   -----BEGIN FREE-TEST-----
//   {"data":{...},"id":"<uuid4>","ts":<unix seconds>,"type":"request","v":1}
//   -----END FREE-TEST-----
//   sig=<hex>
//
// The engine verifies the line it reads, so the key order does not have to match
// Python's; it does anyway (sorted, no spaces, non-ASCII escaped), so a line
// written here and one written by free_test/signing.py are byte for byte alike.
//
// Everything is off unless FREE_TEST_ENABLED is "true" AND the secret, both
// Turnstile keys and RESEND_API_KEY are set. Off, every free-test route is a 404.
// FREE_TEST_SECRET, TURNSTILE_SECRET_KEY and RESEND_API_KEY are never logged or
// returned.

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { sendToBrian } from "@/lib/form-mail";

export const FROM = '"Brian Beals, LLC" <freetest@forms.brianbeals.com>';
const BEGIN = "-----BEGIN FREE-TEST-----";
const END = "-----END FREE-TEST-----";

/* "owner" (2026-10-25) is sent only for a form posted with a valid /desk session
   (actions.ts); the engine runs it at once and mails the report to Brian alone. */
export type EventType = "request" | "confirmed" | "approved" | "owner";

const secret = () => process.env.FREE_TEST_SECRET || "";

export function enabled(): boolean {
  return (
    process.env.FREE_TEST_ENABLED === "true" &&
    secret().length >= 32 &&
    Boolean(process.env.TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY) &&
    Boolean(process.env.RESEND_API_KEY || localOutbox())
  );
}

export const turnstileSiteKey = () => process.env.TURNSTILE_SITE_KEY || "";

const mac = (text: string) => createHmac("sha256", secret()).update(text).digest("hex");

function sameHex(a: string, b: string): boolean {
  if (!/^[0-9a-f]{64}$/.test(a) || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

/* Sorted keys at every level and non-ASCII as \uXXXX, as Python's json.dumps
   with sort_keys=True and ensure_ascii does. */
function sorted(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sorted);
  if (v && typeof v === "object")
    return Object.fromEntries(
      Object.keys(v as object)
        .sort()
        .map((k) => [k, sorted((v as Record<string, unknown>)[k])]),
    );
  return v;
}
const asciiJson = (v: unknown) =>
  JSON.stringify(sorted(v)).replace(/[\u0080-\uffff]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));

export function signBlock(type: EventType, data: Record<string, string>, ts = Date.now()): string {
  const line = asciiJson({ v: 1, type, id: randomUUID(), ts: Math.floor(ts / 1000), data });
  return `${BEGIN}\n${line}\n${END}\nsig=${mac(line)}\n`;
}

/* The salted hash the engine rate-limits by. The raw address never leaves here. */
export const ipHash = (ip: string) => mac(`ip:${ip}`);

/* Brian's approve link: /free-test/approve?id=<job>&sig=<hex of "approve:<job>">. */
export function approveOk(job: string, sig: string): boolean {
  if (!/^[0-9a-f-]{36}$/.test(job)) return false;
  return sameHex(sig, mac(`approve:${job}`));
}

/* A confirmation token as the engine issues it: secrets.token_urlsafe(32). */
export const tokenShape = (t: string) => /^[A-Za-z0-9_-]{40,60}$/.test(t);

/* Local runs only: FREE_TEST_OUTBOX names a folder, and each event is written
   there as an .eml file instead of going through Resend. Point it at the
   engine's queue (FREE_TEST_QUEUE=dir:<same folder>) to run site, engine and
   Mailpit end to end on one machine. Refused on Vercel. */
function localOutbox(): string {
  const dir = process.env.FREE_TEST_OUTBOX || "";
  return dir && !process.env.VERCEL ? dir : "";
}

/* One signed event to the queue. True when it was accepted for delivery. */
export async function sendEvent(type: EventType, data: Record<string, string>): Promise<boolean> {
  const block = signBlock(type, data);
  const subject = `[free-test] ${type}`;
  const outbox = localOutbox();
  if (outbox) {
    mkdirSync(outbox, { recursive: true });
    const eml =
      `From: ${FROM}\r\nTo: brian@brianbeals.com\r\nSubject: ${subject}\r\n` +
      `MIME-Version: 1.0\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${block.replace(/\n/g, "\r\n")}`;
    writeFileSync(join(outbox, `${Date.now()}-${randomUUID()}.eml`), eml);
    return true;
  }
  const html = `<pre>${block.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</pre>`;
  return sendToBrian("free-test", { from: FROM, subject, text: block, html });
}

/* Cloudflare Turnstile, checked on the server for every request. */
export async function turnstileOk(token: string, ip: string): Promise<boolean> {
  const key = process.env.TURNSTILE_SECRET_KEY;
  if (!key || !token) return false;
  try {
    const body = new URLSearchParams({ secret: key, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    if (!res.ok) {
      console.error(`free-test: Turnstile returned ${res.status}`);
      return false;
    }
    return Boolean(((await res.json()) as { success?: boolean }).success);
  } catch {
    console.error("free-test: Turnstile request failed");
    return false;
  }
}
