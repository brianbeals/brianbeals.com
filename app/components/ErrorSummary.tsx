"use client";

import type { Ref } from "react";
import SubHeading from "./SubHeading";

/**
 * The error summary both forms show on a failed submit (2026-10-17). The form
 * moves focus to the "There are 2 problems" heading, whose description is the
 * list of errors, so VoiceOver reads the heading and then every error on arrival.
 * Heard by ear, October 17: a focused summary box, even with role="alert", was
 * announced as "There are 3 problems and 1 more item alert" with the list unread;
 * before that, "3 answers need attention and 1 more item group".
 *
 * One link per error, naming the field and then the fix ("How to reach you:
 * enter an email address or a phone number, so I can reply"). A link moves focus
 * to its field and scrolls it into view; the inline error beside the field stays.
 */
export type SummaryItem = { target: string; label: string; message: string };

/* "Enter your name." -> "enter your name" */
const fix = (m: string) => (m.charAt(0).toLowerCase() + m.slice(1)).replace(/\.$/, "");

export default function ErrorSummary({
  items,
  ref,
  level = 2,
  className = "doc-note stop bg-white mb-6",
}: {
  items: SummaryItem[];
  ref: Ref<HTMLHeadingElement>;
  /* 2 on /contact; 3 inside the readiness checklist, which sits under its own h2. */
  level?: 2 | 3;
  className?: string;
}) {
  const n = items.length;
  return (
    <div className={className}>
      <SubHeading
        level={level}
        id="error-summary-title"
        ref={ref}
        tabIndex={-1}
        describedBy="error-summary-list"
        spacing="mt-0 mb-2"
      >
        {n === 1 ? "There is 1 problem" : `There are ${n} problems`}
      </SubHeading>
      <ul id="error-summary-list" className="list-disc pl-6">
        {items.map((it) => (
          <li key={it.target + it.label}>
            <a
              href={`#${it.target}`}
              className="underline underline-offset-4"
              style={{ color: "var(--link)" }}
              onClick={(ev) => {
                const el = document.getElementById(it.target);
                if (!el) return;
                ev.preventDefault();
                el.scrollIntoView({ block: "center" });
                el.focus();
              }}
            >
              {it.label}: {fix(it.message)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
