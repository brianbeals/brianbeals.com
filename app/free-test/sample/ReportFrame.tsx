"use client";

import { useEffect, useRef } from "react";

// The sample report email in a frame, so its own styles (inline, with a
// prefers-color-scheme block of its own) can't touch the site's or take on
// them. The frame grows to the email's height, so the page has one scroll.

export default function ReportFrame({ html, title }: { html: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let ro: ResizeObserver | undefined;
    const fit = () => {
      const doc = frame.contentDocument;
      if (doc?.body) frame.style.height = `${doc.documentElement.scrollHeight}px`;
    };
    const onLoad = () => {
      fit();
      ro?.disconnect();
      ro = new ResizeObserver(fit);
      if (frame.contentDocument?.body) ro.observe(frame.contentDocument.body);
    };
    frame.addEventListener("load", onLoad);
    if (frame.contentDocument?.readyState === "complete") onLoad();
    window.addEventListener("resize", fit);
    return () => {
      frame.removeEventListener("load", onLoad);
      window.removeEventListener("resize", fit);
      ro?.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      srcDoc={html}
      title={title}
      className="block w-full rounded border"
      style={{ height: "1800px", borderColor: "var(--field-border)" }}
    />
  );
}
