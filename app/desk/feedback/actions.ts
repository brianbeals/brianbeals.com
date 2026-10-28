"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { sessionRole } from "@/lib/desk";
import { rateLimiter, sendToBrian } from "@/lib/form-mail";
import { MAX_COMMENT, buildFeedbackEmail, feedbackPath } from "./email";

// A read-only viewer's note about a desk page (2026-10-27), emailed to Brian
// through Resend (lib/form-mail.ts) and kept nowhere. Signed-in sessions only: a
// server action can be posted from anywhere, so the session is checked here, not
// just by the middleware. At most 5 an hour per connection and 20 an hour per
// instance, in memory, reset on a cold start.
//
// DESK_FEEDBACK_DRY_RUN=1 skips the send and reports success. Local checks only;
// never set it on Vercel.

const FROM = "Brian Beals, LLC <feedback@forms.brianbeals.com>";
const perIp = rateLimiter(5, 60 * 60_000);
const perInstance = rateLimiter(20, 60 * 60_000);

export async function sendFeedback(form: FormData): Promise<void> {
  const get = (n: string) => String(form.get(n) || "");
  const from = feedbackPath(get("from"));
  const back = (q: Record<string, string>) => redirect(`/desk/feedback?${new URLSearchParams({ from, ...q })}`);

  if (!(await sessionRole())) redirect(`/login?next=${encodeURIComponent(`/desk/feedback?from=${from}`)}`);
  const comment = get("comment").trim();
  if (!comment) back({ problem: "empty" });
  if (comment.length > MAX_COMMENT) back({ problem: "long" });

  const ip = ((await headers()).get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (perIp(ip) || perInstance("all")) {
    console.log("desk-feedback: refused, rate limit");
    back({ problem: "limit" });
  }

  const mail = buildFeedbackEmail(from, comment, get("name"));
  console.log("desk-feedback: sending");
  if (process.env.DESK_FEEDBACK_DRY_RUN === "1") back({ sent: "1" });
  const ok = await sendToBrian("desk-feedback", { from: FROM, ...mail });
  back(ok ? { sent: "1" } : { problem: "send" });
}
