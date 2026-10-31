"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  TOPICS,
  topicLabel,
  viewFrom,
  viewHref,
  type Essay,
  type View,
} from "./essays";
import SubHeading from "@/app/components/SubHeading";

// The topic filter on /writing. Since 2026-10-31 the query string carries it
// (?topic=all|accessibility|ai|building, essays.ts viewFrom) and the page opens
// on Accessibility. The server renders the view it was asked for, so without
// JavaScript the controls are plain links that load each view. The older hash
// links (/writing#accessibility, from emails and capability statements) still
// open their topic once the page hydrates.

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("hashchange", listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("popstate", listener);
  };
}

function readView(): View {
  return viewFrom(
    new URLSearchParams(window.location.search).get("topic"),
    window.location.hash.slice(1),
  );
}

function noop() {
  return () => {};
}

const pill =
  "inline-block rounded-full border px-4 py-1.5 text-sm underline-offset-4";

export default function EssayList({
  essays,
  initial,
}: {
  essays: Essay[];
  initial: View;
}) {
  const view = useSyncExternalStore(subscribe, readView, () => initial);
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const shown = view === "all" ? essays : essays.filter((e) => e.topic === view);

  // Two status regions, used in turn, so pressing the same filter twice still
  // announces in NVDA with Edge. Same pattern and reason as
  // app/tools/voice-critique/PromptCopy.tsx.
  const [status, setStatus] = useState<{ text: string; slot: 0 | 1 } | null>(
    null,
  );

  function choose(next: View) {
    if (next !== view || window.location.hash) {
      window.history.pushState(null, "", viewHref(next));
    }
    listeners.forEach((l) => l());
    const count =
      next === "all" ? essays.length : essays.filter((e) => e.topic === next).length;
    const noun = count === 1 ? "essay" : "essays";
    setStatus((s) => ({
      text: `Showing ${count} ${noun}, ${next === "all" ? "all topics" : topicLabel(next)}.`,
      slot: s?.slot === 0 ? 1 : 0,
    }));
  }

  // Accessibility first: the view the page opens on.
  const options: { slug: View; label: string }[] = [
    ...TOPICS.map((t) => ({ slug: t.slug as View, label: t.label })),
    { slug: "all", label: "All" },
  ];

  return (
    <>
      {view === "accessibility" && (
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          What public documents and websites actually show against the Title II and Section
          504 dates.
        </p>
      )}
      <div
        role="group"
        aria-label="Filter essays by topic"
        className="flex flex-wrap gap-2 mb-10"
      >
        {options.map((o) => {
          const pressed = o.slug === view;
          // Pressed shows by fill, border, weight, and underline, never by
          // color alone (1.4.1).
          const style = pressed
            ? {
                color: "var(--head)",
                backgroundColor: "var(--pill-ok-bg)",
                borderColor: "var(--head)",
              }
            : { color: "var(--head)", borderColor: "var(--field-border)" };
          const cls = `${pill} ${pressed ? "font-semibold underline decoration-2" : "hover:underline"}`;
          return hydrated ? (
            <button
              key={o.label}
              type="button"
              aria-pressed={pressed}
              onClick={() => choose(o.slug)}
              className={`${cls} cursor-pointer`}
              style={style}
            >
              {o.label}
            </button>
          ) : (
            <a
              key={o.label}
              href={viewHref(o.slug)}
              aria-current={pressed ? "true" : undefined}
              className={cls}
              style={style}
            >
              {o.label}
            </a>
          );
        })}
      </div>
      <p role="status" className="sr-only">
        {status?.slot === 0 ? status.text : ""}
      </p>
      <p role="status" className="sr-only">
        {status?.slot === 1 ? status.text : ""}
      </p>
      <ul className="space-y-10">
        {shown.map((e) => (
          <li key={e.slug}>
            <Link href={`/writing/${e.slug}`} className="block group">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: "var(--muted-ink)" }}
              >
                {topicLabel(e.topic)}
              </p>
              <SubHeading spacing="mt-0 mb-0">
                <span className="group-hover:underline underline-offset-4">{e.title}</span>
              </SubHeading>
              <p className="text-sm mt-1" style={{ color: "var(--muted-ink)" }}>
                {new Date(e.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </p>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-neutral-800">
                {e.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
