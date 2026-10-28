import { normalize } from "node:path";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySession, type Role } from "@/lib/gate";

// The private desk (/desk) and the dashboards behind it read their content from
// private GitHub repos at request time. This repo is PUBLIC: no desk content,
// price, or dashboard data is ever committed here.
//
//   desk         brianbeals/desk @ main         desk.html, docs/*.html
//   fed-intel    brianbeals/fed-intel @ main    the four modules and their JSON
//   state-intel  brianbeals/state-intel @ dashboard   built site/, force-pushed by its Action
//
// DESK_GH_TOKEN is a fine-grained, read-only (Contents: read) token on those three
// repos, a Vercel secret. Without it, or with a malformed one, every desk route says
// so in plain words (deskProblem) and shows nothing.
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

// A token is one github_pat_ or ghp_ string. On 2026-10-15 terminal output,
// including a "━ DONE" marker, was pasted into the Vercel variable with it, and the
// desk showed GitHub's raw error. Surrounding whitespace is trimmed; anything else
// gets a plain message and the value itself is never shown or logged.
const TOKEN_SHAPE = /^(github_pat_[A-Za-z0-9_]{20,}|ghp_[A-Za-z0-9]{30,})$/;

export class DeskError extends Error {}

function token(): string {
  const raw = process.env.DESK_GH_TOKEN;
  if (!raw || !raw.trim()) throw new DeskError("The desk is not connected: DESK_GH_TOKEN is not set in Vercel.");
  const t = raw.trim();
  if (!TOKEN_SHAPE.test(t)) throw new DeskError("DESK_GH_TOKEN is malformed; re-paste it in Vercel.");
  return t;
}

/* Null when the desk can read its sources, otherwise the message to show. */
export function deskProblem(): string | null {
  if (process.env.DESK_LOCAL_URL) return null;
  try {
    token();
    return null;
  } catch (e) {
    return (e as Error).message;
  }
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
  const t = token();
  const url = `https://api.github.com/repos/${OWNER}/${src.repo}/contents/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}?ref=${encodeURIComponent(src.ref)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${t}`,
      Accept: "application/vnd.github.raw+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "brianbeals-desk",
    },
    // Cached server-side for two minutes. Safe to share: every route that calls
    // this is behind the gate, and both roles may read all of it.
    next: { revalidate: 120 },
  });
  if (res.status === 404) return null;
  if (res.status === 401)
    throw new DeskError("GitHub refused DESK_GH_TOKEN (expired or revoked); make a new one and re-paste it in Vercel.");
  if (res.status === 403)
    throw new DeskError(`DESK_GH_TOKEN cannot read ${src.repo}; give it Contents read on that repo.`);
  if (!res.ok) throw new DeskError(`GitHub answered ${res.status} reading ${src.repo}.`);
  return new Uint8Array(await res.arrayBuffer());
}

/* The session's role (owner or read-only viewer, lib/gate.ts), or null signed out. */
export async function sessionRole(): Promise<Role | null> {
  return verifySession((await cookies()).get(COOKIE_NAME)?.value);
}

/* Second check behind the middleware, so a matcher mistake cannot publish a desk
   route. Either role may read the desk. */
export async function signedIn(): Promise<boolean> {
  return (await sessionRole()) !== null;
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
