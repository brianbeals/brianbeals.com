// The desk's own navigation bar (2026-10-15), on every gated page: /desk, the
// source documents under /desk/doc, and the state and fed dashboards. It replaces
// the public site menu on desk pages so the desk reads as a different place.
//
// One implementation, as a self-contained HTML string with its own <style>,
// because three of the four places it appears are built HTML served as is
// (lib/desk-proxy.ts, app/desk/doc). Injecting it there leaves the dashboards' own
// builds unchanged. Navy bar, white links: 11.5:1 in both color schemes, so it
// needs no dark variant. Wraps at 320px, visible focus, hidden in print.

export type DeskSection = "desk" | "pricing" | "before" | "recon" | "rules" | "state" | "fed";

const LINKS: [DeskSection | "logout", string, string][] = [
  ["desk", "/desk", "Desk"],
  ["pricing", "/desk#pricing", "Pricing"],
  ["before", "/desk#before", "Before we start"],
  ["recon", "/desk#recon", "Recon"],
  ["rules", "/desk#rules", "Rules & dates"],
  ["state", "/desk/state", "State"],
  ["fed", "/desk/fed", "Fed"],
  ["logout", "/logout", "Sign out"],
];

/* Which section a source document belongs to, for aria-current. */
export function sectionForDoc(slug: string): DeskSection {
  if (/^(unit-rates|services-sheet|pricing-)/.test(slug)) return "pricing";
  if (slug === "scope-and-limitations") return "before";
  if (slug === "recon-sample") return "recon";
  if (slug === "regime-cheat-sheet") return "rules";
  return "desk";
}

const CSS = `
.dkbar{all:initial;display:block;background:#1E3A5F;color:#FFFFFF;
  font:600 15px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  padding:6px 12px;box-sizing:border-box;width:100%}
.dkbar *{box-sizing:border-box}
.dkbar ul{display:flex;flex-wrap:wrap;align-items:center;gap:4px 2px;margin:0 auto;padding:0;
  list-style:none;max-width:72rem}
.dkbar li{margin:0;padding:0}
.dkbar a{display:inline-block;color:#FFFFFF;text-decoration:none;padding:7px 9px;border-radius:5px;
  font:inherit;min-height:24px}
.dkbar a:hover{text-decoration:underline;text-underline-offset:3px}
.dkbar a:focus-visible{outline:3px solid #FFFFFF;outline-offset:1px}
.dkbar a[aria-current="page"]{background:#D6EAF8;color:#1E3A5F}
.dkbar a[aria-current="page"]:focus-visible{outline-color:#FFFFFF}
.dkbar .dk-home{font-weight:800}
.dkbar .dk-out{margin-left:auto}
.dk-skip{all:initial;position:absolute;left:-9999px;top:0;z-index:1000;background:#1E3A5F;color:#FFFFFF;
  padding:10px 16px;border-radius:0 0 6px 0;font:600 15px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.dk-skip:focus{left:0;outline:3px solid #FFFFFF;outline-offset:-3px}
@media print{.dkbar{display:none!important}}
`;

/* withSkip adds a skip link ahead of the bar and a target after it, for pages
   that have no skip link of their own. */
export function deskBarHtml(current: DeskSection, withSkip = false): string {
  const items = LINKS.map(([key, href, label]) => {
    const cls = key === "desk" ? ' class="dk-home"' : "";
    const cur = key === current ? ' aria-current="page"' : "";
    const li = key === "logout" ? '<li class="dk-out">' : "<li>";
    return `${li}<a href="${href}"${cls}${cur}>${label.replace(/&/g, "&amp;")}</a></li>`;
  }).join("");
  const skip = withSkip ? '<a class="dk-skip" href="#desk-content">Skip to content</a>' : "";
  const target = withSkip ? '<span id="desk-content" tabindex="-1"></span>' : "";
  return `<style>${CSS}</style>${skip}<nav class="dkbar" aria-label="Desk"><ul>${items}</ul></nav>${target}`;
}

/* Put the bar at the very top of a built HTML page: after the page's own skip
   link when it has one (so that stays the first stop), otherwise right after
   <body> with a skip link of its own. */
export function injectDeskBar(html: string, current: DeskSection): string {
  const skip = /<a[^>]*class="[^"]*skip[^"]*"[^>]*>[\s\S]*?<\/a>/i;
  if (skip.test(html)) return html.replace(skip, (m) => m + deskBarHtml(current));
  const bar = deskBarHtml(current, true);
  if (/<body[^>]*>/i.test(html)) return html.replace(/<body[^>]*>/i, (m) => m + bar);
  return bar + html;
}
