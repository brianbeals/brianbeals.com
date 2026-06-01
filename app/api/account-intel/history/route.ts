import { NextResponse } from "next/server";
import { GH, GH_API, ghHeaders, ghConfigured } from "@/lib/account-intel";

export const runtime = "nodejs";

// Lists past successful runs so the tool can show clickable history.
// The run's display title is set to "account-intel: <company>" by the workflow.
export async function GET() {
  if (!ghConfigured()) {
    return NextResponse.json({ error: "worker not configured" }, { status: 500 });
  }
  const res = await fetch(
    `${GH_API}/repos/${GH.owner}/${GH.repo}/actions/workflows/${GH.workflow}/runs?event=workflow_dispatch&per_page=40`,
    { headers: ghHeaders(), cache: "no-store" },
  );
  if (!res.ok) {
    return NextResponse.json({ error: "history fetch failed", status: res.status }, { status: 502 });
  }
  const data = (await res.json()) as { workflow_runs?: GhRun[] };
  const runs = (data.workflow_runs || [])
    .filter((r) => r.status === "completed" && r.conclusion === "success")
    .map((r) => ({
      runId: r.id,
      company: parseCompany(r.display_title || r.name || ""),
      createdAt: r.created_at,
    }));
  return NextResponse.json({ runs });
}

function parseCompany(title: string): string {
  const m = title.match(/account-intel:\s*(.+)$/i);
  return (m ? m[1] : title).trim() || "Unknown";
}

type GhRun = {
  id: number;
  name: string;
  display_title: string;
  status: string;
  conclusion: string | null;
  created_at: string;
};
