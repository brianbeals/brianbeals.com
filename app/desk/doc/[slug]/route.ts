import { NextRequest, NextResponse } from "next/server";
import { sectionForDoc, injectDeskBar } from "@/lib/desk-bar";
import { DESK, DeskError, PRIVATE_HEADERS, deskProblem, readSource, signedIn } from "@/lib/desk";
import { problemResponse, unauthorized } from "@/lib/desk-proxy";

// A full source document from the desk repo (docs/<slug>.html), served as its
// own page, with the desk bar (lib/desk-bar.ts) at the top.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  if (!(await signedIn())) return unauthorized(req, ".html");
  const { slug } = await ctx.params;
  if (!/^[a-z0-9-]+$/.test(slug)) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
  const section = sectionForDoc(slug);
  const problem = deskProblem();
  if (problem) return problemResponse(problem, ".html", section);
  try {
    const bytes = await readSource(DESK, `docs/${slug}.html`);
    if (!bytes) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
    // The desk bar replaces the old "Back to the desk" strip.
    const html = injectDeskBar(new TextDecoder().decode(bytes), section);
    return new NextResponse(html, { headers: { ...PRIVATE_HEADERS, "Content-Type": "text/html; charset=utf-8" } });
  } catch (e) {
    console.error(`desk: doc read failed: ${(e as Error).message}`);
    return problemResponse(e instanceof DeskError ? e.message : "Could not read the desk from GitHub.", ".html", section, 502);
  }
}
