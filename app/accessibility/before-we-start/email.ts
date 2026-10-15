import { answerSections } from "./fields";

// The readiness email, built from the answers. Pure, so the exact subject, text
// and HTML can be checked without sending anything.
//
// Format set 2026-10-15: subject "Readiness checklist: <domain> (<contact name>)",
// prefixed "[check: <reasons>]" when a spam guard tripped (actions.ts). Body: one
// "Label: answer" line per item (no colon after a label ending in "?") and a blank
// line between sections (SECTIONS in fields.ts). The HTML part is the plain text
// line for line: one <div> per item, an empty <div> between sections, no table and
// no paragraph margins, which some mail clients stack or drop (the first delivered
// copy showed each label and its answer on separate lines, sections run together).
// Typed line breaks are flattened so every item stays on one line.

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const flat = (v: string) => v.replace(/\s+/g, " ").trim();
const lead = (k: string) => (k.endsWith("?") ? k : `${k}:`);

export function buildEmail(
  get: (name: string) => string[],
  list: [string, string][],
  checks: string[],
): { subject: string; text: string; html: string } {
  const domain = flat(get("domain")[0] || "").slice(0, 120);
  const name = flat(get("contact_name")[0] || "").slice(0, 120);
  const sections = answerSections(list);
  const check = checks.length ? `[check: ${checks.join(", ")}] ` : "";
  const note = checks.length
    ? `A spam guard tripped (${checks.join(", ")}). It was sent anyway; judge it yourself.`
    : "";

  const text =
    (note ? `${note}\n\n` : "") +
    sections.map((sec) => sec.map(([k, v]) => `${lead(k)} ${flat(v) || "(not answered)"}`).join("\n")).join("\n\n");

  const line = (inner: string) => `<div>${inner}</div>`;
  const blank = `<div>&nbsp;</div>`;
  const html =
    `<div style="font:14px/1.5 -apple-system,Segoe UI,sans-serif">` +
    (note ? line(`<i>${esc(note)}</i>`) + blank : "") +
    sections
      .map((sec) => sec.map(([k, v]) => line(`<b>${esc(lead(k))}</b> ${esc(flat(v) || "(not answered)")}`)).join(""))
      .join(blank) +
    `</div>`;

  return { subject: `${check}Readiness checklist: ${domain} (${name})`, text, html };
}
