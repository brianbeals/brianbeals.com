import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, signSession } from "@/lib/gate";

const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export async function POST(req: NextRequest) {
  const expected = process.env.SITE_GATE_PASSWORD || "";
  const secret = process.env.SITE_GATE_SECRET || "";
  if (!expected || !secret) {
    return NextResponse.json({ error: "gate not configured" }, { status: 500 });
  }

  const body = (await req.json().catch(() => ({}))) as { password?: string };
  if (body.password !== expected) {
    // small constant delay to slow brute force
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const value = await signSession(secret, TTL_MS);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: TTL_MS / 1000,
  });
  return res;
}
