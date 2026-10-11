"use client";

import { useEffect, useRef, useState } from "react";

const NAVY = "#1E3A5F";

export default function PromptCopy() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

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
      timers.current.forEach(clearTimeout);
      setCopied(true);
      // A second press inside two seconds left the text unchanged, so neither
      // VoiceOver nor NVDA announced it (October 10, 2026 capture). Clear the
      // region first, then set it, so every press is a change to announce.
      setStatus("");
      timers.current = [
        setTimeout(() => setStatus("Prompt copied to the clipboard"), 150),
        setTimeout(() => {
          setCopied(false);
          setStatus("");
        }, 2000),
      ];
    } catch {
      // Clipboard can be blocked; the user can still select the text manually.
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold" style={{ color: "var(--head)" }}>
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
        {/* 4.1.3 Status Messages. The button's text change alone is not
            reliably announced, so the confirmation also goes to a polite live
            region. The region is rendered empty from the start, because one
            inserted along with its text is often not announced at all. */}
        <span role="status" aria-live="polite" className="sr-only">
          {status}
        </span>
      </div>
      {/* 2.1.1 Keyboard. This block scrolls (max-h-96 overflow-auto), so a
          keyboard user needs to be able to focus it to scroll it. Without
          tabIndex it is reachable by mouse wheel only. The group role and
          label give it a name once it is in the tab order. */}
      <pre
        tabIndex={0}
        role="group"
        aria-label="The prompt, scrollable"
        className="max-h-96 overflow-auto rounded-lg border border-neutral-200 bg-white p-4 text-xs leading-relaxed whitespace-pre-wrap text-neutral-800"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}
      >
        {text || "Loading…"}
      </pre>
    </div>
  );
}
