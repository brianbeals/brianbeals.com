// The contact email, built from the submission. Pure, so the exact subject, text
// and HTML can be checked without sending anything.
//
// Subject "[contact] <organization, or the name when no organization is given>",
// prefixed "[check: <reasons>]" when a spam guard tripped (actions.ts). Body: one
// "Label: value" line per field, then the message with its own line breaks kept.
// The HTML part matches the text line for line, as the readiness email does.

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const flat = (v: string) => v.replace(/\s+/g, " ").trim();

export function buildContactEmail(
  get: (name: string) => string,
  checks: string[],
): { subject: string; text: string; html: string } {
  const name = flat(get("name")).slice(0, 200);
  const org = flat(get("org")).slice(0, 200);
  const rows: [string, string][] = [
    ["Name", name],
    ["Organization", org],
    ["Email", flat(get("email"))],
    ["Phone", flat(get("phone"))],
  ];
  const message = get("message").trim().replace(/\r\n/g, "\n");
  const check = checks.length ? `[check: ${checks.join(", ")}] ` : "";
  const note = checks.length
    ? `A spam guard tripped (${checks.join(", ")}). It was sent anyway; judge it yourself.`
    : "";

  const text =
    (note ? `${note}\n\n` : "") +
    rows.map(([k, v]) => `${k}: ${v || "(not given)"}`).join("\n") +
    `\n\nMessage:\n${message}`;

  const line = (inner: string) => `<div>${inner}</div>`;
  const blank = `<div>&nbsp;</div>`;
  const html =
    `<div style="font:14px/1.5 -apple-system,Segoe UI,sans-serif">` +
    (note ? line(`<i>${esc(note)}</i>`) + blank : "") +
    rows.map(([k, v]) => line(`<b>${k}:</b> ${esc(v || "(not given)")}`)).join("") +
    blank +
    line("<b>Message:</b>") +
    message.split("\n").map((l) => line(esc(l) || "&nbsp;")).join("") +
    `</div>`;

  return { subject: `${check}[contact] ${org || name}`, text, html };
}
