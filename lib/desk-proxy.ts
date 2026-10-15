import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_HEADERS, contentType, deskConfigured, readSource, safePath, signedIn, type Source } from "@/lib/desk";

// Serves files from a private repo behind the gate: the fed-intel modules at
// /desk/fed/..., state-intel's built dashboard at /desk/state/.... Signed out, a
// data file gets 401 and a page goes to /login (the middleware does the same
// first; this is the second check).

export function unauthorized(req: NextRequest, path: string) {
  if (!path.endsWith(".html")) return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: PRIVATE_HEADERS });
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export function proxy(src: Source, allow: (path: string) => boolean) {
  return async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const path = safePath((await ctx.params).path || []);
    if (!(await signedIn())) return unauthorized(req, path || ".html");
    if (!path || !allow(path) || !contentType(path))
      return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
    if (!deskConfigured())
      return new NextResponse("The desk is not connected: DESK_GH_TOKEN is not set in Vercel.", {
        status: 503,
        headers: PRIVATE_HEADERS,
      });
    try {
      const body = await readSource(src, path);
      if (!body) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
      return new NextResponse(body as BodyInit, {
        headers: { ...PRIVATE_HEADERS, "Content-Type": contentType(path)! },
      });
    } catch (e) {
      console.error(`desk: ${src.repo} read failed: ${(e as Error).message}`);
      return new NextResponse("Could not read the dashboard from GitHub.", { status: 502, headers: PRIVATE_HEADERS });
    }
  };
}
