// The desk's navigation bar for the gated pages served as built HTML: the source
// documents under /desk/doc and the state and fed dashboards (2026-10-15). /desk
// itself has a React header since 2026-10-16 (app/components/DeskHeader.tsx) with
// the same section names, the same navy and the same --accent-stripe; this bar
// keeps wrapping on narrow screens instead of a Menu button, because it is a string
// injected into pages React does not render.
//
// One implementation, as a self-contained HTML string with its own <style>,
// because three of the four places it appears are built HTML served as is
// (lib/desk-proxy.ts, app/desk/doc). Injecting it there leaves the dashboards' own
// builds unchanged. Navy bar, white links: 11.5:1 in both color schemes, so it
// needs no dark variant. Wraps at 320px, visible focus, hidden in print.
//
// Pinned since 2026-10-21, on DeskHeader's rule: from 1024px wide at 600px high,
// and below 1024px at 500px high, so a landscape phone or 400% zoom scrolls it
// away (1.4.10). The bar and the Fed strip pin together in .dk-pin. Because the bar
// wraps, its height is measured (ResizeObserver) into --dk-bar-h, 0px when it is not
// pinned. The dashboards' title band (.bb-hdr in the shared bb-dash.css of
// state-intel and fed-intel) pins under it at top: var(--dk-bar-h), and
// --dk-stick-h, the bar plus a pinned band, sets html scroll-padding-top so anchor
// jumps, the skip link's target and keyboard focus land clear of both (2.4.11).
// Without JavaScript nothing measures the bar, so the band stays unpinned.

export type DeskSection = "desk" | "pricing" | "before" | "recon" | "rules" | "overlays" | "pitch" | "ids" | "state" | "fed";

const LINKS: [DeskSection | "logout", string, string][] = [
  ["desk", "/desk", "Desk"],
  ["pricing", "/desk#pricing", "Pricing"],
  ["before", "/desk#before", "Before we start"],
  ["recon", "/desk#recon", "Recon"],
  ["rules", "/desk#rules", "Rules & dates"],
  ["overlays", "/desk#overlays", "Overlays"],
  ["pitch", "/desk#pitch", "Pitch"],
  ["ids", "/desk#ids", "IDs"],
  ["state", "/desk/state", "State"],
  ["fed", "/desk/fed", "Fed"],
  ["logout", "/logout", "Sign out"],
];

/* Which section a source document belongs to, for aria-current. */
export function sectionForDoc(slug: string): DeskSection {
  if (/^(unit-rates|services-sheet|pricing-|offering-)/.test(slug)) return "pricing";
  if (slug === "scope-and-limitations") return "before";
  if (slug === "recon-sample") return "recon";
  if (slug === "regime-cheat-sheet") return "rules";
  if (slug === "overlays") return "overlays";
  if (slug === "positioning-and-pitch") return "pitch";
  return "desk";
}

const CSS = `
.dk-pin{all:initial;display:block}
@media (min-width:1024px) and (min-height:600px),(max-width:1023px) and (min-height:500px){
  .dk-pin{position:sticky;top:0;z-index:50}}
html{scroll-padding-top:calc(var(--dk-stick-h,0px) + 8px)}
html:not(.dk-js) .bb-hdr{position:static!important}
.dkbar{all:initial;display:block;background:#1E3A5F;color:#FFFFFF;
  font:600 15px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  padding:6px 12px;box-sizing:border-box;width:100%;border-bottom:4px solid #1E8449}
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
.dk-sub{all:initial;display:block;background:#D6EAF8;color:#1E3A5F;box-sizing:border-box;width:100%;
  font:600 15px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;padding:8px 12px}
.dk-sub p{margin:0 auto;max-width:72rem}
.dk-sub a{color:#1E3A5F;text-decoration:underline;text-underline-offset:3px;display:inline-block;padding:4px 0}
.dk-sub a:focus-visible{outline:3px solid #1E3A5F;outline-offset:2px}
@media print{.dk-pin,.dkbar,.dk-sub{display:none!important}}
`;

/* Measures the pinned bar and band into --dk-bar-h and --dk-stick-h. Runs where
   it is injected, before the page's own markup, so the band is picked up once the
   document has parsed. */
const PIN_JS = `(function(){var r=document.documentElement,p=document.getElementById("dk-pin");
if(!p||!window.ResizeObserver)return;r.classList.add("dk-js");
function h(e){return e&&getComputedStyle(e).position==="sticky"?e.getBoundingClientRect().height:0}
function u(){var b=h(p);r.style.setProperty("--dk-bar-h",b+"px");
r.style.setProperty("--dk-stick-h",b+h(document.querySelector(".bb-hdr"))+"px")}
var o=new ResizeObserver(u);o.observe(p);addEventListener("resize",u);
document.addEventListener("DOMContentLoaded",function(){var d=document.querySelector(".bb-hdr");if(d)o.observe(d);u()});u()})();`;

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
  // The Fed dashboards (2026-10-17) link the federal pitch on /desk, for SOFWERX,
  // prime and program office calls. Here rather than in fed-intel's pages, which
  // its weekly Action rebuilds. Navy on #D6EAF8 is 8.9:1 in both color schemes.
  // A labelled nav since 2026-10-21: as a bare div it sat outside every landmark
  // (axe "region").
  const sub =
    current === "fed"
      ? '<nav class="dk-sub" aria-label="Federal pitch"><p><a href="/desk#pitch-federal">Federal pitch, Section 508: SOFWERX, primes, program offices</a></p></nav>'
      : "";
  return `<style>${CSS}</style>${skip}<div class="dk-pin" id="dk-pin"><nav class="dkbar" aria-label="Desk"><ul>${items}</ul></nav>${sub}</div><script>${PIN_JS}</script>${target}`;
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
