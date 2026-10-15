import { NextRequest, NextResponse } from "next/server";

// /desk/fed opens Module 1. The modules link to each other by relative file name,
// so they have to be served from /desk/fed/<file>.
export function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/desk/fed/index.html", req.url));
}
