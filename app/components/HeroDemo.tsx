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
const COVERS = [
  { src: "/home-hero-broken-page2.png", heard: "…start a business and a / Every Saturday from 8 AM to noon, the" },
  { src: "/home-hero-fixed-page2.png", heard: "…start a business and a better place to grow one." },
];

const link = "underline underline-offset-4 hover:no-underline";

export default function HeroDemo({ demo }: { demo: boolean }) {
  const [start, setStart] = useState(0);
  const playing = start > 0;
  return (
    <>
      <div className="mt-6 mx-auto grid max-w-[560px]">
        <div className={`[grid-area:1/1] grid grid-cols-2 gap-4 sm:gap-8 ${playing ? "invisible" : ""}`}>
          {COVERS.map((c, i) => (
            <div key={c.src}>
              <Image
                src={c.src}
                alt={i === 0 ? "Two copies of the same city guide, side by side. They look identical." : ""}
                width={900}
                height={1165}
                preload
                sizes="(min-width: 640px) 264px, calc(50vw - 32px)"
                className="block w-full h-auto rounded-sm border shadow-lg"
                style={{ borderColor: "var(--rule)" }}
              />
              <p className="mt-2 text-sm italic leading-snug" style={{ color: "var(--muted-ink)" }}>
                {c.heard}
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
            className="btn-cta mt-6 inline-flex items-center gap-2 rounded px-5 py-2.5 font-semibold hover:underline underline-offset-4"
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
