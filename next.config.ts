import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Contact briefs and report HTML live under /r/. They are linked from
        // decks and meant to stay reachable, but should not be indexed or
        // followed by search engines.
        source: "/r/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
