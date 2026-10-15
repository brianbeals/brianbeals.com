import { NextRequest, NextResponse } from "next/server";
import { injectDeskBar, type DeskSection } from "@/lib/desk-bar";
import { DeskError, PRIVATE_HEADERS, contentType, deskProblem, readSource, safePath, signedIn, type Source } from "@/lib/desk";

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

export function proxy(src: Source, allow: (path: string) => boolean, section: DeskSection) {
  return async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const path = safePath((await ctx.params).path || []);
    if (!(await signedIn())) return unauthorized(req, path || ".html");
    if (!path || !allow(path) || !contentType(path))
      return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
    const problem = deskProblem();
    if (problem) return problemResponse(problem, path, section);
    try {
      const body = await readSource(src, path);
      if (!body) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
      // Pages get the desk bar injected at the top; the dashboards' own builds stay as they are.
      const out: BodyInit = path.endsWith(".html")
        ? injectDeskBar(new TextDecoder().decode(body), section)
        : (body as BodyInit);
      return new NextResponse(out, {
        headers: { ...PRIVATE_HEADERS, "Content-Type": contentType(path)! },
      });
    } catch (e) {
      console.error(`desk: ${src.repo} read failed: ${(e as Error).message}`);
      const msg = e instanceof DeskError ? e.message : "Could not read the dashboard from GitHub.";
      return problemResponse(msg, path, section, 502);
    }
  };
}

/* A plain page (or JSON, for a data file) saying what is wrong, with the desk bar,
   never the raw error or anything about the token's value. */
export function problemResponse(message: string, path: string, section: DeskSection, status = 503) {
  if (!path.endsWith(".html"))
    return NextResponse.json({ error: message }, { status, headers: PRIVATE_HEADERS });
  const esc = message.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const html =
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<meta name="color-scheme" content="light dark"><meta name="robots" content="noindex,nofollow"><title>Desk</title>' +
    "<style>body{margin:0;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}main{max-width:40rem;margin:0 auto;padding:24px 16px}</style>" +
    `</head><body><main id="main"><h1>Desk</h1><p role="alert">${esc}</p></main></body></html>`;
  return new NextResponse(injectDeskBar(html, section), {
    status,
    headers: { ...PRIVATE_HEADERS, "Content-Type": "text/html; charset=utf-8" },
  });
}
