"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { rateLimiter } from "@/lib/form-mail";
import { approveOk, enabled, ipHash, sendEvent, tokenShape, turnstileOk } from "@/lib/free-test";
import { TRAP, orgKey, validate, type Errors } from "./fields";

// The free test's three actions: a request from the form, a confirmation from the
// link in the confirmation email, and Brian's approval from the review draft. Each
// sends one signed event to the Proton queue (lib/free-test.ts) and keeps nothing.
//
// SAME RESPONSE ON EVERY INTAKE PATH (SPEC "Intake" 6). Once the fields are
// well formed and Turnstile passes, a request always ends in the same "check your
// email" message: a tripped honeypot and this instance's rate limit send nothing
// and say the same thing, and the engine's own gates (free mail, another domain,
// its rate limits, a private address) are decided on the mini, out of sight.

const limited = rateLimiter();

export type RequestState =
  | { status: "idle" }
  | { status: "invalid"; errors: Errors }
  | { status: "sent" }
  | { status: "error"; message: string };

const clientIp = async () => ((await headers()).get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";

export async function requestFreeTest(_prev: RequestState, form: FormData): Promise<RequestState> {
  if (!enabled()) return { status: "error", message: "The free check is not open yet. Email brian@brianbeals.com." };
  const get = (n: string) => String(form.get(n) || "");

  const errors = validate(get);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const ip = await clientIp();
  if (!(await turnstileOk(get("cf-turnstile-response"), ip)))
    return {
      status: "error",
      message: "The check that you're a person didn't finish. Wait for it to show a tick, then send again.",
    };

  if (get(TRAP) !== "") {
    console.log("free-test: honeypot filled, not sent");
    return { status: "sent" };
  }
  if (limited(ip)) {
    console.log("free-test: instance rate limit, not sent");
    return { status: "sent" };
  }

  const org = orgKey(get("org"));
  const ok = await sendEvent("request", {
    url: get("url").trim(),
    email: get("email").trim().toLowerCase(),
    ip_hash: ipHash(ip),
    ...(org ? { org } : {}),
  });
  if (!ok)
    return {
      status: "error",
      message: "Your request could not be sent. Try again in a minute, or email brian@brianbeals.com.",
    };
  return { status: "sent" };
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
