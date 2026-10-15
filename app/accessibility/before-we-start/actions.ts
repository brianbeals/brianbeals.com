"use server";

import { headers } from "next/headers";
import { buildEmail } from "./email";
import { TRAP, answers, validate, type Errors } from "./fields";

// Sends a submitted readiness checklist to Brian by email through Resend, and
// keeps nothing. No database, no log of the answers, no copy to the submitter.
//
// RESEND_API_KEY is a Vercel Production secret. It is read here and nowhere
// else, never logged, never returned. Without it the page shows the print-and-
// email fallback instead of a send button (page.tsx), so this path is only
// reached when the key exists.
//
// READINESS_DRY_RUN=1 skips the send and reports success. Local checks only;
// never set it on Vercel.

const FROM = "Brian Beals, LLC <readiness@forms.brianbeals.com>";
const TO = "brian@brianbeals.com";

// Spam guards. A honeypot field people never see, a minimum time between the
// form rendering and the submit, and a per-IP limit. The limit lives in this
// instance's memory, so it resets on a cold start and is not shared between
// instances: it stops a loop hammering one instance, nothing more.
//
// NEVER DROP SILENTLY (2026-10-15). The honeypot and the timer used to discard a
// submission and still show the confirmation. Safari AutoFill filled the honeypot
// (then named company_website, labelled "Company website") and the submit came in
// under the timer, so a real prospect's checklist vanished while the page said it
// was received. Now a tripped guard still sends, with "[check: <reasons>]" at the
// front of the subject, and Brian decides. Only a hard rate-limit breach is
// refused, and that is said on the page. A reason code is logged; nothing about
// the submission is.
const MIN_FILL_MS = 5_000;
const WINDOW_MS = 10 * 60_000;
const PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return false;
}

export type SendState =
  | { status: "idle" }
  | { status: "invalid"; errors: Errors }
  | { status: "sent"; answers: [string, string][] }
  | { status: "error"; message: string };

export async function sendReadiness(_prev: SendState, form: FormData): Promise<SendState> {
  const get = (n: string) => form.getAll(n).map(String);
  const list = answers(get);

  const checks: string[] = [];
  if ((form.get(TRAP) || "") !== "") checks.push("trap filled");
  const started = Number(form.get("t") || 0);
  if (!started) checks.push("no timer");
  else if (Date.now() - started < MIN_FILL_MS) checks.push("under 5s");

  const ip = ((await headers()).get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    console.log("readiness: refused, rate limit");
    return {
      status: "error",
      message: "Too many submissions from this connection. Wait ten minutes, or email brian@brianbeals.com.",
    };
  }

  const errors = validate(get);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const email = buildEmail(get, list, checks);
  const replyTo = get("contact_email")[0].trim();
  console.log(`readiness: sending${checks.length ? `, check=${checks.join("|").replace(/ /g, "-")}` : ""}`);

  if (process.env.READINESS_DRY_RUN === "1") return { status: "sent", answers: list };

  const key = process.env.RESEND_API_KEY;
  if (!key) return { status: "error", message: "Sending is not set up. Email the checklist to brian@brianbeals.com." };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: replyTo,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });
    if (!res.ok) {
      // Status only. The response body can echo request details; the key is never in it,
      // but nothing about the submission belongs in a log either.
      console.error(`readiness: Resend returned ${res.status}`);
      return {
        status: "error",
        message: "The checklist could not be sent. Try again in a minute, or email brian@brianbeals.com.",
      };
    }
  } catch {
    console.error("readiness: Resend request failed");
    return {
      status: "error",
      message: "The checklist could not be sent. Try again in a minute, or email brian@brianbeals.com.",
    };
  }
  return { status: "sent", answers: list };
}
