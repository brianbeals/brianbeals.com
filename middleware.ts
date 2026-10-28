import { NextRequest, NextResponse } from "next/server";
import { readOnlyHtml } from "@/lib/desk-bar";
import { COOKIE_NAME, verifySession, viewerBlocked } from "@/lib/gate";

// One login for everything private: the desk (/desk, its documents, and the
// fed-intel and state-intel dashboards and data files under it) and /tools.
// Everything else on the site stays public. Account Intel, which this gate was
// built for, was retired 2026-10-15. Two roles since 2026-10-27 (lib/gate.ts): the
// owner, and a read-only viewer refused on the paths viewerBlocked() names.
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

  const role = await verifySession(req.cookies.get(COOKIE_NAME)?.value);
  const last = path.split("/").pop() || "";
  const data = last.includes(".") && !last.endsWith(".html");

  // A read-only viewer (lib/gate.ts) reads the desk; the owner-only paths answer 403,
  // a page with a polite note and data with JSON.
  if (role === "viewer" && viewerBlocked(path)) {
    const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };
    if (data) return NextResponse.json({ error: "read-only access" }, { status: 403, headers });
    return new NextResponse(readOnlyHtml(path), {
      status: 403,
      headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
    });
  }
  if (role) return NextResponse.next();

  // Data and assets answer 401; pages go to the sign-in form.
  if (data) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  // The query comes along, so a link like /desk/hand-check?d=...&p=... survives the sign-in
  // (2026-10-25); /login only follows a next that is a path on this site.
  url.searchParams.set("next", path + req.nextUrl.search);
  return NextResponse.redirect(url);
}
