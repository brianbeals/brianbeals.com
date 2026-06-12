import { NextRequest, NextResponse } from "next/server";
import { GH, GH_API, ghHeaders, ghConfigured } from "@/lib/account-intel";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!ghConfigured()) {
    return NextResponse.json({ error: "worker not configured" }, { status: 500 });
  }
  const body = (await req.json().catch(() => ({}))) as { company?: string };
  const company = (body.company || "").trim();
  if (!company || company.length > 120) {
    return NextResponse.json({ error: "provide a company name" }, { status: 400 });
  }

  const dispatchedAt = Date.now();
  const res = await fetch(
    `${GH_API}/repos/${GH.owner}/${GH.repo}/actions/workflows/${GH.workflow}/dispatches`,
    {
      method: "POST",
      headers: ghHeaders(),
      body: JSON.stringify({ ref: GH.ref, inputs: { company } }),
    },
  );

  if (res.status !== 204) {
    const detail = await res.text();
    return NextResponse.json(
      { error: "dispatch failed", status: res.status, detail: detail.slice(0, 300) },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, dispatchedAt });
}
