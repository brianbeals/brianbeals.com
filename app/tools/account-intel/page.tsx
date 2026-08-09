"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "idle" | "dispatching" | "queued" | "running" | "done" | "error";
type HistoryItem = { runId: number; company: string; createdAt: string };

const POLL_MS = 5000;
const MAX_POLLS = 180; // ~15 minutes

export default function AccountIntel() {
  const [company, setCompany] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState("");
  const [runId, setRunId] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopPolling() {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = null;
  }

  const loadHistory = useCallback(async () => {
    const res = await fetch("/api/account-intel/history", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { runs: HistoryItem[] };
      setHistory(data.runs || []);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await loadHistory();
    })();
    return () => stopPolling();
  }, [loadHistory]);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    stopPolling();
    setRunId(null);
    setPhase("dispatching");
    setMessage("Starting the research run...");

    const res = await fetch("/api/account-intel/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company }),
    });
    if (!res.ok) {
      setPhase("error");
      setMessage("Could not start the run. Check the worker configuration.");
      return;
    }
    const { dispatchedAt } = (await res.json()) as { dispatchedAt: number };
    setPhase("queued");
    setMessage("Queued. The research agent is spinning up...");

    let polls = 0;
    pollRef.current = setInterval(async () => {
      polls += 1;
      if (polls > MAX_POLLS) {
        stopPolling();
        setPhase("error");
        setMessage("Timed out waiting for the run. Check GitHub Actions.");
        return;
      }
      const s = await fetch(`/api/account-intel/status?since=${dispatchedAt}`, {
        cache: "no-store",
      });
      if (!s.ok) return;
      const data = (await s.json()) as {
        state: string;
        conclusion?: string | null;
        runId?: number;
      };
      if (data.state === "in_progress") {
        setPhase("running");
        setMessage("Researching from public sources. This takes a few minutes...");
      } else if (data.state === "completed") {
        stopPolling();
        if (data.conclusion === "success" && data.runId) {
          setRunId(data.runId);
          setPhase("done");
          setMessage("");
          loadHistory();
        } else {
          setPhase("error");
          setMessage("The run finished without a report. Check the Action logs.");
        }
      }
    }, POLL_MS);
  }

  function view(item: HistoryItem) {
    stopPolling();
    setCompany(item.company);
    setRunId(item.runId);
    setPhase("done");
    setMessage("");
  }

  const working = phase === "dispatching" || phase === "queued" || phase === "running";

  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl font-semibold tracking-tight mb-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Account Intelligence
        </h1>
        <p className="text-gray-600 mb-8">
          Name a company. Get a researched profile from public sources: divisions, technology
          initiatives, and key contacts, as a report and an Excel workbook.
        </p>

        <form onSubmit={run} className="flex gap-3 mb-6">
          {/* 3.3.2 / 4.1.2. The placeholder is not the accessible name. */}
          <label htmlFor="company-name" className="sr-only">
            Company name
          </label>
          <input
            id="company-name"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            disabled={working}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-base disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={working || !company.trim()}
            className="rounded-md px-5 py-2 text-white font-medium disabled:opacity-50"
            style={{ background: "var(--btn-bg)" }}
          >
            {working ? "Working..." : "Run"}
          </button>
        </form>

        {/* 4.1.3 Status Messages. The live region is always in the DOM so screen
            readers announce progress and errors without focus moving. */}
        <div
          role="status"
          aria-live="polite"
          className={message ? "rounded-md px-4 py-3 mb-6 text-sm" : undefined}
          style={
            message
              ? {
                  background: phase === "error" ? "var(--pill-err-bg)" : "var(--pill-ok-bg)",
                  color: phase === "error" ? "var(--err)" : "var(--head)",
                }
              : undefined
          }
        >
          {message}
        </div>

        {phase === "done" && runId && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold" style={{ color: "var(--head)" }}>
                Report
              </h2>
              <a
                href={`/api/account-intel/result?runId=${runId}&file=archive`}
                className="text-sm font-medium"
                style={{ color: "var(--link)" }}
              >
                Download Excel ↓
              </a>
            </div>
            <iframe
              title="Account intelligence report"
              src={`/api/account-intel/result?runId=${runId}`}
              className="w-full rounded-md border border-gray-200"
              style={{ height: "70vh", background: "#fff", colorScheme: "light" }}
            />
          </div>
        )}

        {history.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--head)" }}>
              History
            </h2>
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
              {history.map((h) => (
                <li key={h.runId}>
                  <button
                    onClick={() => view(h)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <span className="font-medium" style={{ color: "var(--head)" }}>
                      {h.company}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(h.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-2">
              Reports are kept for 90 days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
