import type { NextConfig } from "next";

// The /r/ research pages (contact briefs, account-intel reports) and their
// noindex header were removed 2026-10-10. Nothing that is not in the sitemap
// should be published here; research lives in the private repos.
//
// next/image serves AVIF where the browser takes it, WebP otherwise (2026-10-22,
// for the home page hero).

const isDev = process.env.NODE_ENV === "development";

// Report-only since 2026-10-23: violations show in the browser console, nothing is
// blocked. It lists what the site actually loads. Everything is same-origin (Vercel
// Analytics is /_vercel/insights, next/font self-hosts, the demo video and its
// captions are in /public) except Cloudflare Turnstile on /free-test, which needs its
// script and its iframe. 'unsafe-inline' covers the JSON-LD and the pre-paint "js"
// class script in app/layout.tsx and the inline styles throughout; dropping it needs
// nonces, which make every page dynamic. Dev adds 'unsafe-eval' (React's dev stack
// traces) and Vercel's debug analytics script.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // The AI, Analytics & Automation capability statements (two PDFs and two HTML pages),
  // linked from nowhere, were removed 2026-10-31. A copy already sent still lands on the current statements.
  async redirects() {
    return [
      { source: "/Brian-Beals-LLC-Capability-Statement-Federal.pdf", destination: "/documents", permanent: true },
      { source: "/Brian-Beals-LLC-Capability-Statement-Florida.pdf", destination: "/documents", permanent: true },
      // Their HTML versions, unlisted and noindexed since 2026-10-16, removed the same day.
      { source: "/capability-statement.html", destination: "/documents", permanent: true },
      { source: "/capability-statement-state-local.html", destination: "/documents", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
      // The desk's route handlers send Referrer-Policy: same-origin (PRIVATE_HEADERS in
      // lib/desk.ts), and a config header replaces a route's own. The last match wins,
      // so this puts the stricter value back for the desk.
      {
        source: "/desk/:path*",
        headers: [{ key: "Referrer-Policy", value: "same-origin" }],
      },
    ];
  },
};

export default nextConfig;
