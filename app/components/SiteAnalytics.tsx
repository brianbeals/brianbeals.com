"use client";

import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Vercel Web Analytics for every page (2026-10-24), plus two things the bare
// <Analytics /> did not do.
//
// Owner opt-out: ?notrack=1 on any URL sets localStorage bb_notrack=1 and ?notrack=0
// clears it, so Brian's own visits stay out of the numbers on each browser he uses.
// beforeSend drops every page view and custom event while it is set. Storage can
// throw (private windows, blocked site data); then the flag reads as off and only the
// URL itself can switch tracking off for that page.
//
// Engagement: engaged_30s and engaged_120s, once per page view, when the tab has been
// visible that long in total. visibilitychange pauses the clock, so a background tab
// never counts.

const KEY = "bb_notrack";
const MARKS = [
  [30, "engaged_30s"],
  [120, "engaged_120s"],
] as const;

// Applies a ?notrack= in the address, then reports whether tracking is off.
export function notrack(): boolean {
  const param = new URLSearchParams(window.location.search).get("notrack");
  try {
    if (param === "1") localStorage.setItem(KEY, "1");
    if (param === "0") localStorage.removeItem(KEY);
    return localStorage.getItem(KEY) === "1";
  } catch {
    return param === "1";
  }
}

function Engagement() {
  const pathname = usePathname();
  useEffect(() => {
    let total = 0;
    let since: number | null = null;
    let next = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const elapsed = () => total + (since === null ? 0 : performance.now() - since);
    const tick = () => {
      while (next < MARKS.length && elapsed() >= MARKS[next][0] * 1000) {
        track(MARKS[next][1], { page: pathname });
        next++;
      }
      clearTimeout(timer);
      if (since !== null && next < MARKS.length) {
        timer = setTimeout(tick, MARKS[next][0] * 1000 - elapsed());
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        if (since === null) since = performance.now();
      } else if (since !== null) {
        total += performance.now() - since;
        since = null;
      }
      tick();
    };

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname]);
  return null;
}

export default function SiteAnalytics() {
  return (
    <>
      <Analytics beforeSend={(event) => (notrack() ? null : event)} />
      <Engagement />
    </>
  );
}

// The footer's "tracking off" note, shown only while the flag is set. It reads the
// flag after mount, so the static HTML never carries it.
export function TrackingNote() {
  const [off, setOff] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOff(notrack());
  }, []);
  return off ? <span>Tracking off on this browser</span> : null;
}
