import { normalize } from "node:path";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySession } from "@/lib/gate";

// The private desk (/desk) and the dashboards behind it read their content from
// private GitHub repos at request time. This repo is PUBLIC: no desk content,
// price, or dashboard data is ever committed here.
//
//   desk         brianbeals/desk @ main         desk.html, docs/*.html
//   fed-intel    brianbeals/fed-intel @ main    the four modules and their JSON
//   state-intel  brianbeals/state-intel @ dashboard   built site/, force-pushed by its Action
//
// DESK_GH_TOKEN is a fine-grained, read-only (Contents: read) token on those three
// repos, a Vercel secret. Without it every desk route says so and shows nothing.
//
// DESK_LOCAL_URL (local checks only, never on Vercel) reads the same files over
// HTTP from a throwaway static server rooted at ~/Code (python3 -m http.server),
// so a local build can be checked without a token and this code never touches
// the disk.

const OWNER = "brianbeals";
const LOCAL_DIRS: Record<string, string> = {
  "desk@main": "desk",
  "fed-intel@main": "fed-intel",
  "state-intel@dashboard": "state-intel/site",
};

export type Source = { repo: "desk" | "fed-intel" | "state-intel"; ref: string };
export const DESK: Source = { repo: "desk", ref: "main" };
export const FED: Source = { repo: "fed-intel", ref: "main" };
export const STATE: Source = { repo: "state-intel", ref: "dashboard" };

export function deskConfigured() {
  return Boolean(process.env.DESK_GH_TOKEN || process.env.DESK_LOCAL_URL);
}

/* A repo-relative path, or null if it tries to leave the repo. */
export function safePath(parts: string[]): string | null {
  let p: string;
  try {
    p = normalize(parts.map((s) => decodeURIComponent(s)).join("/"));
  } catch {
    return null;
  }
  if (!p || p.startsWith("..") || p.startsWith("/") || p.includes("\0") || p.split("/").some((s) => s.startsWith(".")))
    return null;
  return p;
}

/* File bytes, or null when it does not exist. Throws on any other failure. */
export async function readSource(src: Source, path: string): Promise<Uint8Array | null> {
  const local = process.env.DESK_LOCAL_URL;
  if (local) {
    const dir = LOCAL_DIRS[`${src.repo}@${src.ref}`];
    const res = await fetch(`${local}/${dir}/${path}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`local ${res.status} for ${dir}/${path}`);
    return new Uint8Array(await res.arrayBuffer());
  }
  const token = process.env.DESK_GH_TOKEN;
  if (!token) throw new Error("DESK_GH_TOKEN is not set");
  const url = `https://api.github.com/repos/${OWNER}/${src.repo}/contents/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}?ref=${encodeURIComponent(src.ref)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.raw+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "brianbeals-desk",
    },
    // Cached server-side for two minutes. Safe to share: every route that calls
    // this is behind the gate, and there is one reader.
    next: { revalidate: 120 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${src.repo}/${path}`);
  return new Uint8Array(await res.arrayBuffer());
}

/* Second check behind the middleware, so a matcher mistake cannot publish a desk route. */
export async function signedIn(): Promise<boolean> {
  const secret = process.env.SITE_GATE_SECRET || "";
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  return Boolean(secret && value && (await verifySession(secret, value)));
}

const TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  json: "application/json; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  pdf: "application/pdf",
};

export function contentType(path: string): string | null {
  const ext = path.split(".").pop()?.toLowerCase() || "";
  return TYPES[ext] || null;
}

export const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "same-origin",
};
