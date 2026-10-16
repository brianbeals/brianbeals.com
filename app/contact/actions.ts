"use server";

import { headers } from "next/headers";
import { guardChecks, rateLimiter, sendToBrian } from "@/lib/form-mail";
import { buildContactEmail } from "./email";
import { TRAP, validate, type Errors } from "./fields";

// Sends a contact-form message to Brian by email through Resend, and keeps
// nothing. Same path and the same guards as the readiness checklist
// (lib/form-mail.ts): a tripped honeypot or timer still sends, marked
// "[check: ...]" in the subject; only the rate limit refuses, and says so.
//
// CONTACT_DRY_RUN=1 skips the send and reports success. Local checks only; never
// set it on Vercel.

const FROM = "Brian Beals, LLC <contact@forms.brianbeals.com>";
const limited = rateLimiter();

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Errors }
  | { status: "sent" }
  | { status: "error"; message: string };

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const get = (n: string) => String(form.get(n) || "");
  const checks = guardChecks(form, TRAP);

  const ip = ((await headers()).get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    console.log("contact: refused, rate limit");
    return {
      status: "error",
      message: "Too many messages from this connection. Wait ten minutes, or email brian@brianbeals.com.",
    };
  }

  const errors = validate(get);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const email = buildContactEmail(get, checks);
  console.log(`contact: sending${checks.length ? `, check=${checks.join("|").replace(/ /g, "-")}` : ""}`);

  if (process.env.CONTACT_DRY_RUN === "1") return { status: "sent" };

  if (!process.env.RESEND_API_KEY)
    return { status: "error", message: "Sending is not set up. Email brian@brianbeals.com instead." };
  const ok = await sendToBrian("contact", {
    from: FROM,
    replyTo: get("email").trim() || undefined,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
  if (!ok)
    return {
      status: "error",
      message: "Your message could not be sent. Try again in a minute, or email brian@brianbeals.com.",
    };
  return { status: "sent" };
}
