import { NextRequest, NextResponse } from "next/server";
import { DESK, PRIVATE_HEADERS, deskConfigured, readSource, signedIn } from "@/lib/desk";
import { unauthorized } from "@/lib/desk-proxy";

// A full source document from the desk repo (docs/<slug>.html), served as its
// own page, with a link back to the desk added after <body>.
export const dynamic = "force-dynamic";

const BACK =
  '<p style="margin:0;padding:10px 16px;font:15px -apple-system,Segoe UI,sans-serif;background:#1E3A5F">' +
  '<a href="/desk" style="color:#FFFFFF;text-decoration:underline">Back to the desk</a></p>';

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  if (!(await signedIn())) return unauthorized(req, ".html");
  const { slug } = await ctx.params;
  if (!/^[a-z0-9-]+$/.test(slug)) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
  if (!deskConfigured())
    return new NextResponse("The desk is not connected: DESK_GH_TOKEN is not set in Vercel.", {
      status: 503,
      headers: PRIVATE_HEADERS,
    });
  try {
    const bytes = await readSource(DESK, `docs/${slug}.html`);
    if (!bytes) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
    let html = new TextDecoder().decode(bytes);
    // After the document's own skip link when it has one, so that stays first.
    const skip = /<a[^>]*class="[^"]*skip[^"]*"[^>]*>[\s\S]*?<\/a>/i;
    if (skip.test(html)) html = html.replace(skip, (m) => m + BACK);
    else if (/<body[^>]*>/i.test(html)) html = html.replace(/<body[^>]*>/i, (m) => m + BACK);
    else html = BACK + html;
    return new NextResponse(html, { headers: { ...PRIVATE_HEADERS, "Content-Type": "text/html; charset=utf-8" } });
  } catch (e) {
    console.error(`desk: doc read failed: ${(e as Error).message}`);
    return new NextResponse("Could not read the desk from GitHub.", { status: 502, headers: PRIVATE_HEADERS });
  }
}
