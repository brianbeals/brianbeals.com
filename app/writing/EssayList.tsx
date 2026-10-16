"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { TOPICS, topicLabel, type Essay, type Topic } from "./essays";
import SubHeading from "@/app/components/SubHeading";

// The topic filter on /writing. The URL hash carries the filter, so
// /writing#accessibility opens filtered and a link from an email or a
// capability statement can land there. Without JavaScript every essay shows
// and the controls are plain anchors to the hash, which change nothing.

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

function readHash(): string {
  return window.location.hash.slice(1);
}

// null on the server and during hydration: render the no-JavaScript version.
function serverHash(): string | null {
  return null;
}

function isTopic(value: string | null): value is Topic {
  return TOPICS.some((t) => t.slug === value);
}

const pill =
  "inline-block rounded-full border px-4 py-1.5 text-sm underline-offset-4";

export default function EssayList({ essays }: { essays: Essay[] }) {
  const hash = useSyncExternalStore(subscribe, readHash, serverHash);
  const hydrated = hash !== null;
  const active: Topic | null = isTopic(hash) ? hash : null;
  const shown = active ? essays.filter((e) => e.topic === active) : essays;

  // Two status regions, used in turn, so pressing the same filter twice still
  // announces in NVDA with Edge. Same pattern and reason as
  // app/tools/voice-critique/PromptCopy.tsx.
  const [status, setStatus] = useState<{ text: string; slot: 0 | 1 } | null>(
    null,
  );

  function choose(topic: Topic | null) {
    const url = topic
      ? `#${topic}`
      : window.location.pathname + window.location.search;
    if (topic !== active) window.history.pushState(null, "", url);
    listeners.forEach((l) => l());
    const count = topic
      ? essays.filter((e) => e.topic === topic).length
      : essays.length;
    const noun = count === 1 ? "essay" : "essays";
    setStatus((s) => ({
      text: `Showing ${count} ${noun}, ${topic ? topicLabel(topic) : "all topics"}.`,
      slot: s?.slot === 0 ? 1 : 0,
    }));
  }

  const options: { slug: Topic | null; label: string }[] = [
    { slug: null, label: "All" },
    ...TOPICS.map((t) => ({ slug: t.slug, label: t.label })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label="Filter essays by topic"
        className="flex flex-wrap gap-2 mb-10"
      >
        {options.map((o) => {
          const pressed = hydrated && o.slug === active;
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
            <a key={o.label} href={o.slug ? `#${o.slug}` : "#"} className={cls} style={style}>
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
