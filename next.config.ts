import type { NextConfig } from "next";

// The /r/ research pages (contact briefs, account-intel reports) and their
// noindex header were removed 2026-10-10. Nothing that is not in the sitemap
// should be published here; research lives in the private repos.
const nextConfig: NextConfig = {};

export default nextConfig;
