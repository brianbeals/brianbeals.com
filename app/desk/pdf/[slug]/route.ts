import { NextRequest, NextResponse } from "next/server";
import { DESK, DeskError, PRIVATE_HEADERS, deskProblem, readSource, signedIn } from "@/lib/desk";
import { problemResponse, unauthorized } from "@/lib/desk-proxy";

// A PDF from the desk repo (docs/<slug>.pdf), served inline behind the gate. Added
// 2026-10-16 for the two general (AI, analytics and automation) capability
// statements when they came off the public site. A signed-out click goes to the
// sign-in page, and a read failure shows the desk's HTML problem page, as on
// /desk/doc.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  if (!(await signedIn())) return unauthorized(req, ".html");
  const { slug } = await ctx.params;
  if (!/^[a-z0-9-]+$/.test(slug)) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
  const problem = deskProblem();
  if (problem) return problemResponse(problem, ".html", "ids");
  try {
    const bytes = await readSource(DESK, `docs/${slug}.pdf`);
    if (!bytes) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
    return new NextResponse(new Blob([bytes as BlobPart], { type: "application/pdf" }), {
      headers: { ...PRIVATE_HEADERS, "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="${slug}.pdf"` },
    });
  } catch (e) {
    console.error(`desk: pdf read failed: ${(e as Error).message}`);
    return problemResponse(e instanceof DeskError ? e.message : "Could not read the desk from GitHub.", ".html", "ids", 502);
  }
}
