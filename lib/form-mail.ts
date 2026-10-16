// Shared by the site's two forms, the readiness checklist
// (app/accessibility/before-we-start/actions.ts) and the contact form
// (app/contact/actions.ts). Each sends one email to Brian through Resend and
// keeps nothing: no database, no log of what was submitted, no copy to the sender.
//
// RESEND_API_KEY is a Vercel Production secret. It is read here and nowhere else,
// never logged, never returned. Without it each form's page shows its email-me
// fallback instead of a send button, so a send is only attempted when it exists.

const TO = "brian@brianbeals.com";

/* A per-IP limit kept in this instance's memory, one per form. It resets on a
   cold start and is not shared between instances: it stops a loop hammering one
   instance, nothing more. */
export function rateLimiter(perWindow = 5, windowMs = 10 * 60_000) {
  const hits = new Map<string, number[]>();
  return function limited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    if (recent.length >= perWindow) {
      hits.set(ip, recent);
      return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5_000) hits.clear();
    return false;
  };
}

/* The spam guards that never drop a submission (see the readiness action's note of
   2026-10-15): a filled honeypot or a submit inside the minimum fill time only
   marks the email "[check: <reasons>]". */
export const MIN_FILL_MS = 5_000;

export function guardChecks(form: FormData, trap: string): string[] {
  const checks: string[] = [];
  if ((form.get(trap) || "") !== "") checks.push("trap filled");
  const started = Number(form.get("t") || 0);
  if (!started) checks.push("no timer");
  else if (Date.now() - started < MIN_FILL_MS) checks.push("under 5s");
  return checks;
}

/* One email to Brian. Returns true when Resend accepted it. `label` names the form
   in the one log line a failure writes; nothing about the submission is logged. */
export async function sendToBrian(
  label: string,
  mail: { from: string; replyTo?: string; subject: string; text: string; html: string },
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: mail.from,
        to: [TO],
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }),
    });
    if (!res.ok) {
      // Status only. The response body can echo request details.
      console.error(`${label}: Resend returned ${res.status}`);
      return false;
    }
    return true;
  } catch {
    console.error(`${label}: Resend request failed`);
    return false;
  }
}
