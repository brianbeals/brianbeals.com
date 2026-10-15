import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/gate";

// Sign out: clear the gate cookie and land on the public home page. The cookie
// is set by /api/login with these same attributes; a cookie only clears when the
// path matches.
export function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
