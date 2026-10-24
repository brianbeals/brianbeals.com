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
// points at /free-test), the covers are the play control (2026-10-24): one <button>
// holding both covers, a navy play circle centered over them (72px, 56px on a phone)
// and the visible caption "Hear both (1:54)" under them, so a press anywhere on the
// covers plays and there is one tab stop. The free check stays the hero's one filled
// button; this one reads as a video, not a second call to action. Its name starts
// with the caption, "Hear both (1:54)", so it meets 2.5.3 Label in Name, then gives
// the length in words. The covers' alt text, which a button's name would swallow,
// becomes its description. Hover and keyboard focus darken the circle and scale it
// slightly (no scale under prefers-reduced-motion); focus also rings the circle white
// then navy (11.6:1 against the white covers, and the white gap against the navy
// circle), inside the site's own ring around the whole button. Pressing it
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
// stay unlabeled. With the labels the covers went from 222px to 206px wide at 1440.
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

const COVERS_ALT = "Two copies of the same city guide, side by side. They look identical.";

const link = "underline underline-offset-4 hover:no-underline";

// The two covers, with the first one's alt text when they stand alone, or none
// inside the play button, whose description carries it.
function covers(alt: boolean) {
  return COVERS.map((c, i) => (
    <Image
      key={c.src}
      src={c.src}
      alt={alt && i === 0 ? COVERS_ALT : ""}
      width={900}
      height={1165}
      preload
      sizes="(min-width: 640px) 206px, calc(50vw - 32px)"
      className="block w-full h-auto rounded-sm border shadow-lg"
      style={{ borderColor: "var(--rule)" }}
    />
  ));
}

export default function HeroDemo({ demo }: { demo: boolean }) {
  const [start, setStart] = useState(0);
  const playing = start > 0;
  return (
    <>
      <div className="mt-5 mx-auto grid max-w-[560px]">
        <div
          className={`[grid-area:1/1] mx-auto grid w-full max-w-[444px] grid-cols-2 gap-x-4 sm:gap-x-8 ${playing ? "invisible" : ""}`}
        >
          {demo ? (
            <button
              type="button"
              onClick={() => setStart((n) => n + 1)}
              aria-label={`Hear both (${LENGTH}), play the ${LENGTH_SPOKEN} demo`}
              aria-describedby="hero-covers-desc"
              className="group col-span-2 block w-full cursor-pointer rounded-sm outline-offset-4"
            >
              <span className="relative grid grid-cols-2 gap-x-4 sm:gap-x-8">
                {covers(false)}
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-full bg-[#1E3A5F] shadow-[0_4px_14px_rgba(0,0,0,0.35)] motion-safe:transition-transform group-hover:bg-[#13263F] group-focus-visible:bg-[#13263F] motion-safe:group-hover:scale-110 motion-safe:group-focus-visible:scale-110 group-focus-visible:shadow-[0_0_0_3px_#FFFFFF,0_0_0_6px_#1E3A5F]">
                    <svg focusable="false" viewBox="0 0 24 24" className="ml-1 h-6 w-6 sm:h-8 sm:w-8" fill="#FFFFFF">
                      <path d="M6 3.5v17l14-8.5z" />
                    </svg>
                  </span>
                </span>
              </span>
              <span
                className="mt-3 block text-base sm:text-lg font-semibold group-hover:underline underline-offset-4"
                style={{ color: "var(--link)" }}
              >
                Hear both ({LENGTH})
              </span>
              <span id="hero-covers-desc" hidden>
                {COVERS_ALT}
              </span>
            </button>
          ) : (
            covers(true)
          )}
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
          <p className={`mt-4 mx-auto ${LINE_CLASS}`}>{LINE}</p>
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
