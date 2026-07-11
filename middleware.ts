import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/gate";

// Gate the tool page and its API. Everything else on the site stays public.
export const config = {
  matcher: ["/tools/:path*", "/api/account-intel/:path*"],
};

export async function middleware(req: NextRequest) {
  // Public tool: the voice-critique prompt page is linked publicly (GitHub one-click copy,
  // essays), so let it through the gate. The rest of /tools stays gated.
  const path = req.nextUrl.pathname;
  if (path === "/tools/voice-critique" || path.startsWith("/tools/voice-critique/")) {
    return NextResponse.next();
  }

  const secret = process.env.SITE_GATE_SECRET || "";
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const ok = Boolean(secret && cookie && (await verifySession(secret, cookie)));
  if (ok) return NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}
