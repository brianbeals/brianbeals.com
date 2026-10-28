"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { sessionRole } from "@/lib/desk";
import { rateLimiter } from "@/lib/form-mail";
import { approveOk, enabled, ipHash, sendEvent, tokenShape, turnstileVerify } from "@/lib/free-test";
import { formError } from "@/lib/free-test-alert";
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
//
// READ-ONLY VIEWERS (2026-10-27). A session signed in with the viewer password
// (lib/gate.ts) is refused here outright, before any event: neither the owner path
// nor the public one runs while it is signed in. The message says to sign out.

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

/* FAILING LOUDLY (2026-10-25). A failure on our side (the request event not sent,
   Turnstile's siteverify erroring, anything thrown) is logged and alerted through
   formError (lib/free-test-alert.ts): one email per 15 minutes with a count, the
   typed site and email. A visitor failing the Turnstile check is not an error. */
export async function requestFreeTest(_prev: RequestState, form: FormData): Promise<RequestState> {
  try {
    return await handleRequest(form);
  } catch (e) {
    await formError("server error", e instanceof Error ? `${e.name}: ${e.message}`.slice(0, 200) : "unknown", {
      url: String(form.get("url") || ""),
      email: String(form.get("email") || ""),
    }).catch(() => null);
    return {
      status: "error",
      message: "Something went wrong on our side. Try again in a few minutes, or email brian@brianbeals.com.",
    };
  }
}

async function handleRequest(form: FormData): Promise<RequestState> {
  if (!enabled()) return { status: "error", message: "The free check is not open yet. Email brian@brianbeals.com." };
  const get = (n: string) => String(form.get(n) || "");

  const role = await sessionRole();
  if (role === "viewer")
    return {
      status: "error",
      message:
        "You're signed in with read-only desk access, which can't start a check. Sign out to use the public form, or email brian@brianbeals.com.",
    };
  const owner = role === "owner";
  const errors = validate(get);
  if (owner) delete errors.email;
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const ip = await clientIp();
  // The typed address goes in an alert only from the public path; an owner's is never read.
  const typed = { url: get("url"), email: owner ? "(owner check)" : get("email") };
  const check = await turnstileVerify(get("cf-turnstile-response"), ip);
  if (check.result === "error") {
    await formError("Turnstile verify error", check.why, typed);
    return {
      status: "error",
      message: "The security check couldn't be verified on our side. Try again in a minute, or email brian@brianbeals.com.",
    };
  }
  if (check.result !== "ok")
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
    if (!ok) await formError("send failure", "the owner event could not be sent", typed);
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
  if (!ok) await formError("send failure", "the request event could not be sent (Resend refused it or was unreachable)", typed);
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
  if (!ok) await formError("send failure", "a confirmation event could not be sent", {});
  redirect(ok ? "/free-test/confirmed" : `/free-test/confirm?token=${encodeURIComponent(token)}&problem=send`);
}

/* Brian's approval, from the link in the review draft, also behind a button. */
export async function approveFreeTest(form: FormData): Promise<void> {
  const job = String(form.get("id") || "");
  const sig = String(form.get("sig") || "");
  if (!enabled() || !approveOk(job, sig)) redirect("/free-test");
  const ok = await sendEvent("approved", { job });
  if (!ok) await formError("send failure", `the approval of job ${job} could not be sent`, {});
  const q = new URLSearchParams({ id: job, sig, [ok ? "done" : "problem"]: ok ? "1" : "send" });
  redirect(`/free-test/approve?${q}`);
}
