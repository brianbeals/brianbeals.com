import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, TTL_MS, roleForPassword, signSession } from "@/lib/gate";

// One form, two passwords (lib/gate.ts): SITE_GATE_PASSWORD signs in the owner for
// 30 days, SITE_GATE_VIEWER_PASSWORD (when set) a read-only viewer for 14. Neither
// password is ever logged or echoed.
export async function POST(req: NextRequest) {
  if (!process.env.SITE_GATE_PASSWORD || !process.env.SITE_GATE_SECRET) {
    return NextResponse.json({ error: "gate not configured" }, { status: 500 });
  }

  const body = (await req.json().catch(() => ({}))) as { password?: unknown };
  const role = await roleForPassword(body.password);
  const value = role ? await signSession(role) : null;
  if (!role || !value) {
    // small constant delay to slow brute force
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: TTL_MS[role] / 1000,
  });
  return res;
}
