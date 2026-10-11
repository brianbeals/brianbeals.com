"use client";

import { useEffect, useRef, useState } from "react";

const NAVY = "#1E3A5F";

export default function PromptCopy() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  // Two status regions, used in turn. See copy().
  const [slot, setSlot] = useState<0 | 1 | null>(null);
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
      // Every press announces, not only the first. One region set to the
      // same text again is silent. Clearing it and setting it 150 ms later
      // worked in VoiceOver but not in NVDA with Edge (October 10, 2026
      // capture), presumably because Chromium batched the two updates and the
      // region never looked empty. So the message moves to the other region
      // each press and the first is emptied: always new text in a region.
      setSlot((s) => (s === 0 ? 1 : 0));
      timers.current = [
        setTimeout(() => {
          setCopied(false);
          setSlot(null);
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
            region. Both regions are rendered empty from the start, because one
            inserted along with its text is often not announced at all. */}
        {([0, 1] as const).map((n) => (
          <span key={n} role="status" aria-live="polite" className="sr-only">
            {slot === n ? "Prompt copied to the clipboard" : ""}
          </span>
        ))}
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
