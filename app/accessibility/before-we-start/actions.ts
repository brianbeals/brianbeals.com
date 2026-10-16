"use server";

import { headers } from "next/headers";
import { buildEmail } from "./email";
import { TRAP, answers, validate, type Errors } from "./fields";
import { guardChecks, rateLimiter, sendToBrian } from "@/lib/form-mail";

// Sends a submitted readiness checklist to Brian by email through Resend, and
// keeps nothing. The Resend call, the rate limit and the guards are shared with
// the contact form in lib/form-mail.ts, which also says where RESEND_API_KEY lives.
//
// READINESS_DRY_RUN=1 skips the send and reports success. Local checks only;
// never set it on Vercel.

const FROM = "Brian Beals, LLC <readiness@forms.brianbeals.com>";

// NEVER DROP SILENTLY (2026-10-15). The honeypot and the timer used to discard a
// submission and still show the confirmation. Safari AutoFill filled the honeypot
// (then named company_website, labelled "Company website") and the submit came in
// under the timer, so a real prospect's checklist vanished while the page said it
// was received. Now a tripped guard still sends, with "[check: <reasons>]" at the
// front of the subject, and Brian decides. Only a hard rate-limit breach is
// refused, and that is said on the page. A reason code is logged; nothing about
// the submission is.
const limited = rateLimiter();

export type SendState =
  | { status: "idle" }
  | { status: "invalid"; errors: Errors }
  | { status: "sent"; answers: [string, string][] }
  | { status: "error"; message: string };

export async function sendReadiness(_prev: SendState, form: FormData): Promise<SendState> {
  const get = (n: string) => form.getAll(n).map(String);
  const list = answers(get);

  const checks = guardChecks(form, TRAP);

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

  if (!process.env.RESEND_API_KEY)
    return { status: "error", message: "Sending is not set up. Email the checklist to brian@brianbeals.com." };
  const ok = await sendToBrian("readiness", {
    from: FROM,
    replyTo,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
  if (!ok)
    return {
      status: "error",
      message: "The checklist could not be sent. Try again in a minute, or email brian@brianbeals.com.",
    };
  return { status: "sent", answers: list };
}
