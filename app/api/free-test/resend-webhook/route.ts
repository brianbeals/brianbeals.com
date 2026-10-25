import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { alertBrian, kv, kvEnabled } from "@/lib/free-test-alert";

// Resend's delivery webhooks (2026-10-25): email.bounced, email.complained and
// email.delivery_delayed. The webhook covers the whole Resend account, so only
// mail from freetest@forms.brianbeals.com (the free test's confirmations,
// reminders, reports and notes, sent by the engine on the mini) raises an alert;
// the rest is acknowledged and dropped. Each alert names the recipient, which
// email it was, and why.
//
// Signed by Svix: RESEND_WEBHOOK_SECRET is the "whsec_..." signing secret Resend
// shows for the endpoint. The signature is HMAC-SHA256 of "<svix-id>.<svix-timestamp>.
// <raw body>" under the base64 key after "whsec_", sent as "v1,<base64>"; the
// timestamp must be within five minutes. A retried delivery (same svix-id) is
// alerted once.

const EVENTS: Record<string, string> = {
  "email.bounced": "bounced",
  "email.complained": "marked as spam",
  "email.delivery_delayed": "delivery delayed",
};

function verified(secret: string, id: string, ts: string, body: string, header: string): boolean {
  if (!id || !/^\d+$/.test(ts) || Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const want = createHmac("sha256", key).update(`${id}.${ts}.${body}`).digest();
  return header.split(" ").some((part) => {
    const [v, sig] = part.split(",");
    const got = Buffer.from(sig || "", "base64");
    return v === "v1" && got.length === want.length && timingSafeEqual(got, want);
  });
}

/* Which free-test email it was, by its subject (a11y-audit free_test/emails.py). */
function which(subject: string): string {
  if (subject.startsWith("Confirm ")) return "the confirmation email";
  if (subject.startsWith("Reminder: confirm")) return "the reminder to confirm";
  if (subject.startsWith("Free accessibility test")) return "the report";
  if (subject.startsWith("Your free accessibility check")) return "the could-not-run or held note";
  if (subject.startsWith("Your free accessibility test")) return "the manual-review reply";
  return `"${subject}"`;
}

type Payload = {
  type?: string;
  data?: {
    from?: string;
    to?: string[] | string;
    subject?: string;
    bounce?: { message?: string; type?: string; subType?: string };
  };
};

export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET || "";
  if (!secret) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const body = await req.text();
  const id = req.headers.get("svix-id") || "";
  if (!verified(secret, id, req.headers.get("svix-timestamp") || "", body, req.headers.get("svix-signature") || ""))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let p: Payload;
  try {
    p = JSON.parse(body) as Payload;
  } catch {
    return NextResponse.json({ error: "not JSON" }, { status: 400 });
  }
  const what = EVENTS[p.type || ""];
  const d = p.data || {};
  if (!what || !String(d.from || "").includes("freetest@forms.brianbeals.com"))
    return NextResponse.json({ ignored: true });

  if (kvEnabled()) {
    try {
      if ((await kv("SET", `ft:wh:${id}`, "1", "NX", "EX", 86400)) !== "OK") return NextResponse.json({ duplicate: true });
    } catch {
      console.error("free-test webhook: the store failed; alerting without the duplicate check");
    }
  }
  const to = (Array.isArray(d.to) ? d.to : [d.to || ""]).filter(Boolean).join(", ") || "(unknown)";
  const subject = String(d.subject || "");
  const b = d.bounce || {};
  const reason =
    p.type === "email.bounced"
      ? [b.type, b.subType, b.message].filter(Boolean).join(": ") || "no reason given"
      : p.type === "email.complained"
        ? "the recipient's mail service reported it as spam"
        : "the receiving server hasn't accepted it yet; Resend keeps retrying";
  const sent = await alertBrian(
    `${what}: ${to}, ${which(subject)}`,
    `Resend reports that ${which(subject)} to ${to} was ${what}.\n\n` +
      `Recipient: ${to}\nEmail: ${which(subject)} (subject "${subject}")\nReason: ${reason}\n\n` +
      (p.type === "email.delivery_delayed"
        ? "Next step: nothing yet; a bounce alert follows if it fails for good."
        : `Next step: they didn't get it. Reply to ${to} from your own mailbox, or ask for another address.`),
  );
  if (sent) return NextResponse.json({ ok: true });
  // Let Resend's retry through: forget this delivery so it isn't taken for a duplicate.
  if (kvEnabled()) await kv("DEL", `ft:wh:${id}`).catch(() => null);
  return NextResponse.json({ error: "alert not sent" }, { status: 502 });
}
