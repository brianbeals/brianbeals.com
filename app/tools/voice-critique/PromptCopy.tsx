"use client";

import { useEffect, useState } from "react";

const NAVY = "#1E3A5F";

export default function PromptCopy() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/voice-critique-prompt.txt", { cache: "no-store" })
      .then((r) => r.text())
      .then((t) => {
        if (active) setText(t.trim());
      })
      .catch(() => {
        if (active) setText("");
      });
    return () => {
      active = false;
    };
  }, []);

  async function copy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the user can still select the text manually.
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold" style={{ color: NAVY }}>
          The prompt
        </span>
        <button
          onClick={copy}
          disabled={!text}
          className="rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          style={{ background: NAVY }}
        >
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
      <pre
        className="max-h-96 overflow-auto rounded-lg border border-neutral-200 bg-white p-4 text-xs leading-relaxed whitespace-pre-wrap text-neutral-800"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}
      >
        {text || "Loading…"}
      </pre>
    </div>
  );
}
