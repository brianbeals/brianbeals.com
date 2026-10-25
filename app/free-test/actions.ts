"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signedIn } from "@/lib/desk";
import { rateLimiter } from "@/lib/form-mail";
import { approveOk, enabled, ipHash, sendEvent, tokenShape, turnstileOk } from "@/lib/free-test";
import { TRAP, orgKey, refKey, validate, type Errors } from "./fields";

// The free test's three actions: a request from the form, a confirmation from the
// link in the confirmation email, and Brian's approval from the review draft. Each
// sends one signed event to the Proton queue (lib/free-test.ts) and keeps nothing.
//
// SAME RESPONSE ON EVERY INTAKE PATH (SPEC "Intake" 6). Once the fields are
// well formed and Turnstile passes, a request always ends in the same "check your
// email" message: a tripped honeypot and this instance's rate limit send nothing
// and say the same thing, and the engine's own gates (free mail, another domain,
// its rate limits, a private address) are decided on the mini, out of sight.
//
// OWNER FAST PATH (2026-10-25). A form posted with a valid /desk session (the
// bb_gate cookie, checked as the desk checks it) sends an "owner" event instead:
// no confirmation email, no review, the scan queued at once and the report with
// its PDF mailed to brian@brianbeals.com only. The session is the only proof. The
// typed address is never read, checked or sent, so typing Brian's address
// without a session gets the public path like anyone else. Turnstile and the
// honeypot still apply. At most 10 an hour, here per instance and again in the
// engine (owner_per_hour), which is the limit that holds across instances.

const limited = rateLimiter();
const ownerLimited = rateLimiter(10, 60 * 60_000);

export type RequestState =
  | { status: "idle" }
  | { status: "invalid"; errors: Errors }
  | { status: "sent"; email: string }
  | { status: "owner"; domain: string }
  | { status: "error"; message: string };

/* "www.leeschools.net/about" -> "leeschools.net", for the owner's Running line. */
const siteDomain = (url: string) =>
  url.trim().toLowerCase().replace(/^https?:\/\//, "").split(/[/?#:]/)[0].replace(/^www\./, "");

const clientIp = async () => ((await headers()).get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";

export async function requestFreeTest(_prev: RequestState, form: FormData): Promise<RequestState> {
  if (!enabled()) return { status: "error", message: "The free check is not open yet. Email brian@brianbeals.com." };
  const get = (n: string) => String(form.get(n) || "");

  const owner = await signedIn();
  const errors = validate(get);
  if (owner) delete errors.email;
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const ip = await clientIp();
  if (!(await turnstileOk(get("cf-turnstile-response"), ip)))
    return {
      status: "error",
      message: "The security check hasn't finished yet. Wait a few seconds, then send again.",
    };

  // The address as typed, for "We sent a confirmation link to …". Every path that
  // answers "sent" echoes it, so the screen gives nothing away.
  const sent: RequestState = { status: "sent", email: get("email").trim() };
  if (get(TRAP) !== "") {
    console.log("free-test: honeypot filled, not sent");
    return sent;
  }
  if (owner) {
    if (ownerLimited("owner")) {
      console.log("free-test: owner rate limit, not sent");
      return { status: "error", message: "Owner checks are limited to 10 an hour. Try again later." };
    }
    const ok = await sendEvent("owner", { url: get("url").trim(), ip_hash: ipHash(ip) });
    console.log(`free-test: owner check ${ok ? "sent" : "not sent"}`);
    return ok
      ? { status: "owner", domain: siteDomain(get("url")) }
      : { status: "error", message: "The owner check could not be sent. Try again in a minute." };
  }
  if (limited(ip)) {
    console.log("free-test: instance rate limit, not sent");
    return sent;
  }

  const org = orgKey(get("org"));
  const ref = refKey(get("ref"));
  const ok = await sendEvent("request", {
    url: get("url").trim(),
    email: get("email").trim().toLowerCase(),
    ip_hash: ipHash(ip),
    ...(org ? { org } : {}),
    ...(ref ? { ref } : {}),
  });
  if (!ok)
    return {
      status: "error",
      message: "Your request could not be sent. Try again in a minute, or email brian@brianbeals.com.",
    };
  return sent;
}

/* The confirmation link opens a page with a button; only the button's POST sends
   the event. A mail scanner that opens every link in a message (Safe Links and
   the like) must not be able to start a test on its own. */
export async function confirmFreeTest(form: FormData): Promise<void> {
  const token = String(form.get("token") || "");
  if (!enabled() || !tokenShape(token)) redirect("/free-test/confirm?problem=link");
  const ok = await sendEvent("confirmed", { token });
  redirect(ok ? "/free-test/confirmed" : `/free-test/confirm?token=${encodeURIComponent(token)}&problem=send`);
}

/* Brian's approval, from the link in the review draft, also behind a button. */
export async function approveFreeTest(form: FormData): Promise<void> {
  const job = String(form.get("id") || "");
  const sig = String(form.get("sig") || "");
  if (!enabled() || !approveOk(job, sig)) redirect("/free-test");
  const ok = await sendEvent("approved", { job });
  const q = new URLSearchParams({ id: job, sig, [ok ? "done" : "problem"]: ok ? "1" : "send" });
  redirect(`/free-test/approve?${q}`);
}
