"use client";

import Image from "next/image";
import { useState } from "react";
import DemoVideo from "./DemoVideo";
import { LENGTH, LENGTH_SPOKEN, LINE, LINE_CLASS } from "./demoLength";

// The home page hero's lower half (2026-10-22): the two demo city guides side by
// side at the same size with no labels, because they look the same (page 2 of each
// PDF, the page the quotes come from, built by scripts/build_home_hero.py), and under
// each, in small italic text, the exact line NVDA read from that guide in the demo's
// reading-order scene (a11y-audit docs/demo/speech/*.lines.json). The first cover's
// alt text covers both, so the second is empty.
//
// While the demo is up (`demo`, the free test being on, since the video's end card
// points at /free-test), a primary "Hear both" button sits under them. Its name
// starts with its visible text, "Hear both (1:54)", so it meets 2.5.3 Label in Name,
// then gives the length in words. Pressing it
// mounts the demo player in the covers' place and plays it with focus on it; that is
// the viewer's own press, not autoplay. The covers stay in the same grid cell,
// hidden, so the cell keeps their height and nothing below moves. Before playback
// the transcript is a link to its text file; after, the player's own "Read the
// transcript" disclosure takes its place and the link is hidden in its spot.
//
// Since 2026-10-22 the quotes sit under one label, "What a screen reader reads
// aloud:", centered across both covers, and the jump in the broken guide is a
// bracketed stage direction, upright and muted, where the speech is italic.
//
// Each quote has a small bold label above it, matching the video's banners: "Not
// accessible" in its red, "Accessible" in its green (--verdict-bad, --verdict-good).
// The cross and the check carry the difference without color (1.4.1) and are hidden
// from screen readers, which hear just the words. They are drawn, not the ✕ and ✓
// characters, since axe returns a lone symbol as contrast "needs review". The covers
// stay unlabeled. With the labels the covers went from 222px to 206px wide at 1440,
// so "Hear both" still ends above the fold at 1440x900.
const COVERS = [
  {
    src: "/home-hero-broken-page2.png",
    verdict: { glyph: "M4 4l8 8M12 4l-8 8", text: "Not accessible", color: "var(--verdict-bad)" },
    heard: ["\u2026start a business and a", "Every Saturday from 8 AM to noon, the"],
    jump: "[jumps to the sidebar]",
  },
  {
    src: "/home-hero-fixed-page2.png",
    verdict: { glyph: "M3 8.5l3.5 3.5L13 4.5", text: "Accessible", color: "var(--verdict-good)" },
    heard: ["\u2026start a business and a better place to grow one."],
    jump: "",
  },
];

const link = "underline underline-offset-4 hover:no-underline";

export default function HeroDemo({ demo }: { demo: boolean }) {
  const [start, setStart] = useState(0);
  const playing = start > 0;
  return (
    <>
      <div className="mt-5 mx-auto grid max-w-[560px]">
        <div
          className={`[grid-area:1/1] mx-auto grid w-full max-w-[444px] grid-cols-2 gap-x-4 sm:gap-x-8 ${playing ? "invisible" : ""}`}
        >
          {COVERS.map((c, i) => (
            <Image
              key={c.src}
              src={c.src}
              alt={i === 0 ? "Two copies of the same city guide, side by side. They look identical." : ""}
              width={900}
              height={1165}
              preload
              sizes="(min-width: 640px) 206px, calc(50vw - 32px)"
              className="block w-full h-auto rounded-sm border shadow-lg"
              style={{ borderColor: "var(--rule)" }}
            />
          ))}
          <p className="col-span-2 mt-2 text-sm sm:text-base text-neutral-800">What a screen reader reads aloud:</p>
          {COVERS.map((c) => (
            <div key={c.src} className="mt-1">
              <p
                className="inline-flex items-center gap-1 text-sm font-bold"
                style={{ color: c.verdict.color }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 16 16"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={c.verdict.glyph} />
                </svg>
                {c.verdict.text}
              </p>
              <p className="text-sm italic leading-snug text-neutral-800">
                {c.heard[0]}
                {c.jump ? (
                  <>
                    {" "}
                    <span className="not-italic" style={{ color: "var(--muted-ink)" }}>
                      {c.jump}
                    </span>{" "}
                    {c.heard[1]}
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>
        {playing ? (
          <div className="[grid-area:1/1] text-left">
            <DemoVideo label="Screen reader demo" line={false} start={start} />
          </div>
        ) : null}
      </div>
      {demo ? (
        <>
          <button
            type="button"
            onClick={() => setStart((n) => n + 1)}
            aria-label={`Hear both (${LENGTH}), play the ${LENGTH_SPOKEN} demo`}
            className="btn-cta mt-4 inline-flex items-center gap-2 rounded px-5 py-2.5 font-semibold hover:underline underline-offset-4"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
            Hear both ({LENGTH})
          </button>
          <p className={`mt-3 mx-auto ${LINE_CLASS}`}>{LINE}</p>
          {/* Hidden, not removed, once the player shows, so nothing below moves. */}
          <p className={`mt-2 mx-auto text-base ${playing ? "invisible" : ""}`}>
            <a href="/video/screen-reader-demo-transcript.txt" className={link} style={{ color: "var(--link)" }}>
              Read the transcript
            </a>
          </p>
        </>
      ) : null}
    </>
  );
}
