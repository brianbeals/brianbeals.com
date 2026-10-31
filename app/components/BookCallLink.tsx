"use client";

import { track } from "@vercel/analytics";
import { BOOKING_URL } from "@/lib/identity";

// A link to the Proton booking page (BOOKING_URL, same tab; it went to /contact until
// 2026-10-31) that records a "book_call_click" event in Vercel Web Analytics
// (2026-10-23), with where it was clicked, so the home page's call-to-action change
// can be compared over two weeks. The other two events in that comparison are
// "demo_play" (DemoVideo) and "free_check_submitted" (FreeTestForm). Custom events
// show in the dashboard only on a Pro or Enterprise plan.
export default function BookCallLink({
  placement,
  className,
  style,
  children,
}: {
  placement: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a
      href={BOOKING_URL}
      className={className}
      style={style}
      onClick={() => track("book_call_click", { placement })}
    >
      {children}
    </a>
  );
}
