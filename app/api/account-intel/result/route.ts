import { NextRequest, NextResponse } from "next/server";
import { unzipSync, strFromU8 } from "fflate";
import { GH, GH_API, ghHeaders, ghConfigured } from "@/lib/account-intel";

export const runtime = "nodejs";

// Downloads the run's artifact and returns either the rendered HTML report
// (default) or the raw zip archive (?file=archive) which also holds the .xlsx.
export async function GET(req: NextRequest) {
  if (!ghConfigured()) {
    return NextResponse.json({ error: "worker not configured" }, { status: 500 });
  }
  const runId = req.nextUrl.searchParams.get("runId");
  const file = req.nextUrl.searchParams.get("file") || "report";
  if (!runId || !/^\d+$/.test(runId)) {
    return NextResponse.json({ error: "missing runId" }, { status: 400 });
  }

  const listRes = await fetch(
    `${GH_API}/repos/${GH.owner}/${GH.repo}/actions/runs/${runId}/artifacts`,
    { headers: ghHeaders(), cache: "no-store" },
  );
  if (!listRes.ok) {
    return NextResponse.json({ error: "artifact list failed", status: listRes.status }, { status: 502 });
  }
  const listed = (await listRes.json()) as { artifacts?: { id: number; name: string }[] };
  const artifact = (listed.artifacts || []).find((a) => a.name === GH.artifactName);
  if (!artifact) {
    return NextResponse.json({ error: "report not ready" }, { status: 404 });
  }

  const zipRes = await fetch(
    `${GH_API}/repos/${GH.owner}/${GH.repo}/actions/artifacts/${artifact.id}/zip`,
    { headers: ghHeaders(), cache: "no-store", redirect: "follow" },
  );
  if (!zipRes.ok) {
    return NextResponse.json({ error: "artifact download failed", status: zipRes.status }, { status: 502 });
  }
  const zipBytes = new Uint8Array(await zipRes.arrayBuffer());

  if (file === "archive") {
    return new NextResponse(zipBytes, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=account-intel.zip",
      },
    });
  }

  const files = unzipSync(zipBytes);
  const htmlEntry = Object.keys(files).find((n) => n.endsWith("report.html"));
  if (!htmlEntry) {
    return NextResponse.json({ error: "no report.html in artifact" }, { status: 500 });
  }
  const htmlString = strFromU8(files[htmlEntry]);
  return new NextResponse(htmlString, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
