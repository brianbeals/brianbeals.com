import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/gate";

// One login for everything private: the desk (/desk, its documents, and the
// fed-intel and state-intel dashboards and data files under it) and /tools.
// Everything else on the site stays public. Account Intel, which this gate was
// built for, was retired 2026-10-15.
export const config = {
  matcher: ["/tools/:path*", "/desk", "/desk/:path*"],
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

  // Data and assets answer 401; pages go to the sign-in form.
  const last = path.split("/").pop() || "";
  if (last.includes(".") && !last.endsWith(".html")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("next", path);
  return NextResponse.redirect(url);
}
