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
