import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { kv, kvEnabled } from "@/lib/free-test-alert";

// The engine's heartbeat (2026-10-25): every tick on the Mac mini, about every two
// minutes, POSTs {ts, sig}, sig being HMAC-SHA256 of "heartbeat:<ts>" under
// FREE_TEST_SECRET, the secret both sides already hold. A good one is stored as
// ft:hb; /api/free-test/watch reads it. ts must be within five minutes of now.

export async function POST(req: Request) {
  const secret = process.env.FREE_TEST_SECRET || "";
  if (secret.length < 32 || !kvEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const body = (await req.json().catch(() => ({}))) as { ts?: unknown; sig?: unknown };
  const ts = Number(body.ts);
  const sig = String(body.sig || "");
  const want = createHmac("sha256", secret).update(`heartbeat:${ts}`).digest("hex");
  const fresh = Number.isInteger(ts) && Math.abs(Date.now() / 1000 - ts) <= 300;
  const ok = fresh && /^[0-9a-f]{64}$/.test(sig) && timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(want, "hex"));
  if (!ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    await kv("SET", "ft:hb", String(ts));
  } catch {
    console.error("free-test heartbeat: the store failed");
    return NextResponse.json({ error: "store failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
