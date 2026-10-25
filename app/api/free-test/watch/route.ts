import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { alertBrian, kv, kvEnabled } from "@/lib/free-test-alert";

// The dead-man's switch (2026-10-25). GitHub Actions calls this every 15 minutes
// (.github/workflows/free-test-watch.yml) with "Authorization: Bearer <CRON_SECRET>";
// a GitHub schedule rather than a Vercel cron because the Hobby plan allows a
// cron at most once a day. No heartbeat from the engine for 20 minutes: one alert,
// and ft:hb:down holds when the outage was noticed. A heartbeat again: one "all
// clear", and the flag goes. Nothing is sent before the first heartbeat ever
// arrives, so the deploy before the mini's pull is quiet.

export const dynamic = "force-dynamic";

const STALE_S = 20 * 60;
const et = (s: number) =>
  new Date(s * 1000).toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

function authorized(req: Request): boolean {
  const want = process.env.CRON_SECRET || "";
  const got = (req.headers.get("authorization") || "").replace(/^Bearer /, "");
  return Boolean(want) && got.length === want.length && timingSafeEqual(Buffer.from(got), Buffer.from(want));
}

export async function GET(req: Request) {
  if (!process.env.CRON_SECRET || !kvEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const now = Math.floor(Date.now() / 1000);
  const hb = Number(await kv("GET", "ft:hb")) || 0;
  const down = Number(await kv("GET", "ft:hb:down")) || 0;
  if (!hb) return NextResponse.json({ status: "no heartbeat yet" });
  const age = now - hb;
  const mins = Math.round(age / 60);

  if (age > STALE_S && !down) {
    const sent = await alertBrian(
      `engine heartbeat missing: nothing from the mini for ${mins} minutes`,
      `The free-test engine on the Mac mini hasn't checked in for ${mins} minutes. Its last heartbeat was ` +
        `${et(hb)} ET. It beats on every tick, about every two minutes, so requests aren't being read and ` +
        `scans aren't running.\n\n` +
        `Next step: check that the mini is on and online, that n8n is running and the Free Test workflow is ` +
        `active, and run "cd ~/Code/a11y-audit && python3 -m free_test.engine tick" there to see the error. ` +
        `You'll get one "all clear" when it beats again, and nothing more until then.`,
    );
    if (sent) await kv("SET", "ft:hb:down", String(now));
    return NextResponse.json({ status: "down", age, alerted: sent });
  }
  if (age <= STALE_S && down) {
    const sent = await alertBrian(
      `all clear: the engine is beating again`,
      `The free-test engine on the Mac mini checked in again at ${et(hb)} ET. It was silent for at least ` +
        `${Math.round((hb - down) / 60) + 20} minutes; the outage was noticed at ${et(down)} ET.\n\nRequests that came in meanwhile wait in the Free Test Requests folder and ` +
        `are handled in order; the engine's own watchdog says so if any stay stuck.`,
    );
    if (sent) await kv("DEL", "ft:hb:down");
    return NextResponse.json({ status: "recovered", age, alerted: sent });
  }
  return NextResponse.json({ status: down ? "down" : "ok", age });
}
