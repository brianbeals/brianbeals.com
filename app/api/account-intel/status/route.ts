import { NextRequest, NextResponse } from "next/server";
import { GH, GH_API, ghHeaders, ghConfigured } from "@/lib/account-intel";

export const runtime = "nodejs";

// Finds the dispatch run created after `since` and reports its status.
// workflow_dispatch doesn't return a run id, so we correlate by creation time.
export async function GET(req: NextRequest) {
  if (!ghConfigured()) {
    return NextResponse.json({ error: "worker not configured" }, { status: 500 });
  }
  const since = Number(req.nextUrl.searchParams.get("since") || "0");

  const res = await fetch(
    `${GH_API}/repos/${GH.owner}/${GH.repo}/actions/workflows/${GH.workflow}/runs?event=workflow_dispatch&per_page=10`,
    { headers: ghHeaders(), cache: "no-store" },
  );
  if (!res.ok) {
    return NextResponse.json({ error: "status check failed", status: res.status }, { status: 502 });
  }
  const data = (await res.json()) as { workflow_runs?: GhRun[] };
  const runs = data.workflow_runs || [];

  // newest run created at or after the dispatch (60s buffer for clock skew)
  const match = runs
    .filter((r) => new Date(r.created_at).getTime() >= since - 60000)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  if (!match) {
    return NextResponse.json({ state: "pending" });
  }
  return NextResponse.json({
    state: match.status, // queued | in_progress | completed
    conclusion: match.conclusion, // success | failure | null
    runId: match.id,
  });
}

type GhRun = {
  id: number;
  status: string;
  conclusion: string | null;
  created_at: string;
};
