"use client";

import { useState } from "react";
import { INTRO, NOTE, SCENES } from "@/app/free-test/transcript";

// The screen reader demo (a11y-audit docs/demo/video, the web cut, whose end-card QR
// carries ?ref=video), on the home page, /free-test and /accessibility. Self-hosted,
// no player script: public/video/. This cut has no captions burned in: the browser
// draws them from the default track, so they can be turned off or resized (burned in
// as well, Safari showed two sets). The image inside <video> is fallback for a
// browser that cannot play it, and carries the poster's alt text. width, height and
// aspect-video reserve the 16:9 box before the poster loads, so nothing shifts.
//
// The duration badge sits over the poster until the video first plays, then goes.
// It is real text in the reading order ("Length 1:54", what the player shows for 114.7 s). Change LENGTH with a recut.
// Under the player, before the transcript: one plain semibold line (2026-10-22).
const LENGTH = "1:54";

const link = "underline underline-offset-4 hover:no-underline";

// "Narrator: ..." and "Screen reader: ..." lines get the speaker in bold; the
// bracketed lines, what is on screen, stay as written.
function Line({ text }: { text: string }) {
  const m = /^(Narrator|Screen reader): (.*)$/.exec(text);
  return m ? (
    <p>
      <strong>{m[1]}:</strong> {m[2]}
    </p>
  ) : (
    <p style={{ color: "var(--muted-ink)" }}>{text}</p>
  );
}

export default function DemoVideo({ labelledBy }: { labelledBy: string }) {
  const [played, setPlayed] = useState(false);
  return (
    <div>
      <div className="relative">
        <video
          controls
          preload="metadata"
          poster="/video/screen-reader-demo-poster.jpg"
          width={1920}
          height={1080}
          playsInline
          aria-labelledby={labelledBy}
          onPlay={() => setPlayed(true)}
          className="block w-full h-auto aspect-video rounded-sm border bg-black"
          style={{ borderColor: "var(--rule)" }}
        >
          <source src="/video/screen-reader-demo.mp4" type="video/mp4" />
          <track kind="captions" src="/video/screen-reader-demo.vtt" srcLang="en" label="English" default />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/video/screen-reader-demo-poster.jpg"
            alt="Two copies of the same city guide side by side, titled Listen to what a screen reader hears."
            width={1920}
            height={1080}
          />
          <a href="/video/screen-reader-demo.mp4">Download the video (MP4, 3.9 MB)</a>
        </video>
        {played ? null : (
          <span
            className="pointer-events-none absolute right-2 top-2 rounded px-2 py-0.5 text-sm font-semibold"
            style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
          >
            <span className="sr-only">Length </span>
            {LENGTH}
          </span>
        )}
      </div>
      <p className="mt-3 text-base sm:text-lg leading-relaxed font-semibold text-neutral-800">
        Hear what your documents sound like. Nobody should have to listen to nonsense.
      </p>
      <details className="mt-3 text-base sm:text-lg">
        <summary className={`cursor-pointer ${link}`} style={{ color: "var(--link)" }}>
          Read the transcript
        </summary>
        <div className="mt-4 space-y-3 leading-relaxed text-neutral-800">
          <p>{INTRO}</p>
          <p>{NOTE}</p>
          {SCENES.map((scene, i) => (
            <div key={i} className="space-y-1 pt-3">
              {scene.map((line, j) => (
                <Line key={j} text={line} />
              ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
