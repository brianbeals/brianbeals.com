// The desk feedback email (2026-10-27), built from a read-only viewer's note. Pure
// and import-free, so scripts/test_gate.mjs checks it under plain `node --test`.
//
// Subject "[desk feedback] <page path>". Body: the page, who sent it when they gave
// a name, then the comment with its own line breaks kept. HTML matches the text.

export const MAX_COMMENT = 4000;
export const MAX_NAME = 200;

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/* The page the note is about: a path under /desk, nothing else. Anything that is
   not one becomes "/desk", so the subject never carries arbitrary text. */
export function feedbackPath(raw: string): string {
  const p = raw.trim();
  if (p.length > 300 || !/^\/desk(\/[A-Za-z0-9._~%-]+)*\/?$/.test(p) || p.includes("..")) return "/desk";
  return p;
}

export function buildFeedbackEmail(
  path: string,
  comment: string,
  name: string,
): { subject: string; text: string; html: string } {
  const page = feedbackPath(path);
  const who = name.replace(/\s+/g, " ").trim().slice(0, MAX_NAME);
  const body = comment.trim().replace(/\r\n/g, "\n").slice(0, MAX_COMMENT);
  const rows: [string, string][] = [
    ["Page", `https://brianbeals.com${page}`],
    ["From", who || "(a read-only desk viewer, no name given)"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nComment:\n${body}`;
  const html =
    rows.map(([k, v]) => `<div>${esc(k)}: ${esc(v)}</div>`).join("") +
    "<div>&nbsp;</div><div>Comment:</div>" +
    body
      .split("\n")
      .map((l) => `<div>${l ? esc(l) : "&nbsp;"}</div>`)
      .join("");
  return { subject: `[desk feedback] ${page}`, text, html };
}
