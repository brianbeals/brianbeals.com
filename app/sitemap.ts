import type { MetadataRoute } from "next";
import type { Dirent } from "node:fs";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = "https://brianbeals.com";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

type StaticEntry = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

const STATIC_PAGES: StaticEntry[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/writing", priority: 0.7, changeFrequency: "weekly" },
  { path: "/accessibility", priority: 0.8, changeFrequency: "monthly" },
  // The two audience-specific accessibility pages. /accessibility/maryland was
  // live and linked from both the hub page and the human site map, but it was
  // never added here, so the XML sitemap never carried it. Found 2026-08-24
  // while adding the healthcare page. A page reachable only by crawl is a page
  // competing with a handicap.
  { path: "/accessibility/healthcare", priority: 0.8, changeFrequency: "monthly" },
  { path: "/accessibility/maryland", priority: 0.7, changeFrequency: "monthly" },
  // Every capability statement in both formats. The short URL printed in the
  // footer of every PDF, so it has to resolve for as long as any of those PDFs
  // is in circulation, which is longer than any of them is current.
  { path: "/documents", priority: 0.7, changeFrequency: "monthly" },
  { path: "/elsewhere", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/tools/voice-critique", priority: 0.6, changeFrequency: "monthly" },
  // The human-readable site map. It exists to satisfy WCAG 2.4.5 Multiple Ways,
  // and it was reachable from the footer but absent from the XML sitemap, so
  // search engines had no idea it was there.
  { path: "/sitemap-page", priority: 0.3, changeFrequency: "monthly" },
];

function getEssays(): Array<{ slug: string; publishedAt: Date | null }> {
  const writingDir = join(process.cwd(), "app", "writing");

  let entries: Dirent[] = [];
  try {
    entries = readdirSync(writingDir, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const slug = entry.name;
      const pagePath = join(writingDir, slug, "page.tsx");
      let publishedAt: Date | null = null;
      try {
        const source = readFileSync(pagePath, "utf8");
        const match = source.match(/publishedTime:\s*["']([^"']+)["']/);
        if (match) {
          const parsed = new Date(match[1]);
          if (!Number.isNaN(parsed.getTime())) publishedAt = parsed;
        }
      } catch {
        // Essay directory without a readable page.tsx — fall through with null.
      }
      return { slug, publishedAt };
    });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    // Image sitemap entry on the homepage only. This is the most reliable way to
    // tell Google that a specific image belongs to a specific page, and it points
    // at the FULL-RESOLUTION original (3093x3369) rather than any _next/image
    // variant, so the crawler is never choosing from downscaled candidates.
    //
    // Why this exists: Google was returning an unrelated face for "brian beals",
    // pulled from a LinkedIn profile rather than from here. The rendered headshot
    // was being served as a 384px variant, small enough to be deprioritized.
    // Raising the rendered size alone would have cost LCP on the homepage; this
    // gets the high-resolution file in front of the crawler at no runtime cost.
    ...(page.path === "/" ? { images: [`${BASE_URL}/brian-beals.jpg`] } : {}),
  }));

  const essayEntries: MetadataRoute.Sitemap = getEssays().map(
    ({ slug, publishedAt }) => ({
      url: `${BASE_URL}/writing/${slug}`,
      lastModified: publishedAt ?? now,
      changeFrequency: "yearly",
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...essayEntries];
}
