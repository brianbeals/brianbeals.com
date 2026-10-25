// Free-test alerts from the site (2026-10-25): the dead-man's switch for the engine
// on the Mac mini, Resend delivery failures, and server-side errors on the
// /free-test form. The engine sends its own (a11y-audit free_test/engine.py).
//
// Every alert goes to brian@brianbeals.com only (sendToBrian's fixed address), from
// alerts@forms.brianbeals.com, with a subject starting "[free-test ALERT]". Never
// from freetest@: the Proton filter files freetest@ mail that begins "[free-test]"
// into the engine's queue, where an alert would be read as a request and rejected.
//
// STATE lives in a Redis store over Upstash's REST API (Vercel Marketplace, "Upstash
// for Redis", which sets KV_REST_API_URL and KV_REST_API_TOKEN, or UPSTASH_REDIS_REST_URL and
// UPSTASH_REDIS_REST_TOKEN): the last heartbeat,
// the open outage, the form-error count and its 15-minute window, and the webhook
// ids already handled. Without it the heartbeat and watch routes answer 503, and
// form errors fall back to this instance's memory.
//
// Locally, with FREE_TEST_ALERT_OUTBOX or FREE_TEST_OUTBOX set (refused on Vercel),
// each alert is written there as an .eml instead of sent, as the free-test events are.

import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { sendToBrian } from "@/lib/form-mail";

export const ALERT_FROM = '"Free Test alerts" <alerts@forms.brianbeals.com>';
export const ALERT_PREFIX = "[free-test ALERT]";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function localOutbox(): string {
  const dir = process.env.FREE_TEST_ALERT_OUTBOX || process.env.FREE_TEST_OUTBOX || "";
  return dir && !process.env.VERCEL ? dir : "";
}

/* One alert to Brian. True when it was accepted for delivery. */
export async function alertBrian(subject: string, text: string): Promise<boolean> {
  const s = `${ALERT_PREFIX} ${subject}`;
  const outbox = localOutbox();
  if (outbox) {
    mkdirSync(outbox, { recursive: true });
    const eml =
      `From: ${ALERT_FROM}\r\nTo: brian@brianbeals.com\r\nSubject: ${s}\r\n` +
      `MIME-Version: 1.0\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${text.replace(/\n/g, "\r\n")}`;
    writeFileSync(join(outbox, `${Date.now()}-alert-${randomUUID()}.eml`), eml);
    return true;
  }
  return sendToBrian("free-test alert", {
    from: ALERT_FROM,
    subject: s,
    text,
    html: `<pre style="white-space:pre-wrap;font:14px/1.5 -apple-system,Segoe UI,sans-serif">${esc(text)}</pre>`,
  });
}

/* ---- the store ------------------------------------------------------------ */

// The integration names them KV_REST_API_* or UPSTASH_REDIS_REST_*, by how it was set up; either works.
const kvUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const kvToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
export const kvEnabled = () => Boolean(kvUrl() && kvToken());

/* One Redis command over the REST API, e.g. kv("SET", "k", "v", "NX", "EX", "900"). */
export async function kv(...args: (string | number)[]): Promise<unknown> {
  const res = await fetch(kvUrl(), {
    method: "POST",
    headers: { Authorization: `Bearer ${kvToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(args.map(String)),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`store answered ${res.status}`);
  return ((await res.json()) as { result?: unknown }).result ?? null;
}

/* ---- form errors: one email per 15 minutes, with a count -------------------- */

const WINDOW_S = 15 * 60;
const memory = { count: 0, until: 0 };

/* Logs the error, then emails Brian unless one went in the last 15 minutes. The
   email carries how many errors there were since the last one went out; errors
   inside a window are counted into the next email. */
export async function formError(kind: string, detail: string, typed: { url?: string; email?: string }) {
  const site = (typed.url || "").trim().slice(0, 200) || "(none)";
  const addr = (typed.email || "").trim().slice(0, 200) || "(none)";
  console.error(`free-test form error: ${kind}: ${detail}`);
  let send = false;
  let n = 1;
  try {
    if (kvEnabled()) {
      await kv("INCR", "ft:formerr:n");
      send = (await kv("SET", "ft:formerr:lock", "1", "NX", "EX", WINDOW_S)) === "OK";
      if (send) n = Number(await kv("GETDEL", "ft:formerr:n")) || 1;
    } else {
      memory.count += 1;
      if (Date.now() >= memory.until) {
        send = true;
        n = memory.count;
        memory.count = 0;
        memory.until = Date.now() + WINDOW_S * 1000;
      }
    }
  } catch (e) {
    console.error(`free-test form error: the store failed (${e instanceof Error ? e.message : "unknown"})`);
    send = true;
  }
  if (!send) return;
  await alertBrian(
    `form error: ${kind}`,
    `The /free-test form failed on the server.\n\n` +
      `${n === 1 ? "1 error" : `${n} errors`} since the last alert (at most one alert per 15 minutes).\n\n` +
      `This one: ${kind}: ${detail}\nTyped site: ${site}\nTyped email: ${addr}\n\n` +
      `Next step: check the Vercel function logs for /free-test, then write to ${addr} by hand if the ` +
      `request matters; their form showed an error, so they know it didn't go through.`,
  );
}
