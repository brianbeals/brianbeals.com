import { NextRequest, NextResponse } from "next/server";

// /desk/state opens the dashboard, whose links are relative to /desk/state/.
export function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/desk/state/state.html", req.url));
}
