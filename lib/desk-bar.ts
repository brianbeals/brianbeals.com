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
// away (1.4.10). The Fed pitch strip pins under it only from 640px wide, where it
// is one line; on a phone it scrolls with the page (2026-10-21). Because the bar
// wraps, what is actually pinned, bar plus strip, is measured (ResizeObserver) into
// --dk-bar-h, 0px when nothing is pinned. The dashboards' title band (.bb-hdr in the shared bb-dash.css of
// state-intel and fed-intel) pins under it at top: var(--dk-bar-h), and
// --dk-stick-h, the bar plus a pinned band, sets html scroll-padding-top so anchor
// jumps, the skip link's target and keyboard focus land clear of both (2.4.11).
// Without JavaScript nothing measures the bar, so the band stays unpinned.
//
// Since 2026-10-25 the bar opens with DeskHeader's brand lockup, linking to /desk:
// the BB mark, "Brian Beals, LLC · Desk" and the "Independent Accessibility
// Evaluation" line, at the header's sizes (name 22px from 640px, 20px from 560px,
// 18px from 400px, 15px below; mark 44, 40, 36, 32px; descriptor 15px in #D6EAF8,
// 9.3:1) and with its accessible name. Below 560px the descriptor takes its own
// line under the name, as in the header. The links keep their size and wrap after
// it, so the bar grows rather than shrinking them. The lockup's elements are reset
// (all: unset) so the dashboards' own img, span and p styles cannot reach them.

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
html{scroll-padding-top:calc(var(--dk-stick-h,0px) + 8px)}
html:not(.dk-js) .bb-hdr{position:static!important}
.dkbar{all:initial;display:block;background:#1E3A5F;color:#FFFFFF;
  font:600 15px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  padding:6px 12px;box-sizing:border-box;width:100%;border-bottom:4px solid #1E8449}
.dkbar *{box-sizing:border-box}
.dkbar .dk-row{display:flex;flex-wrap:wrap;align-items:center;gap:4px 16px;margin:0 auto;max-width:72rem}
.dkbar ul{display:flex;flex:1 1 auto;flex-wrap:wrap;align-items:center;gap:4px 2px;margin:0;padding:0;
  list-style:none}
.dkbar .dk-brand img,.dkbar .dk-brand span,.dkbar .dk-tagrow{all:unset}
.dkbar a.dk-brand{display:flex;align-items:center;gap:12px;min-height:44px;padding:4px 0;border-radius:0;
  font-size:22px;font-weight:600;letter-spacing:-0.01em;line-height:1.15}
.dkbar .dk-brand img{display:block;flex:none;width:44px;height:44px}
.dkbar .dk-brand .dk-bt{display:flex;flex-direction:column;min-width:0}
.dkbar .dk-brand .dk-tag,.dkbar .dk-tagrow{color:#D6EAF8;font-size:15px;font-weight:400;letter-spacing:0;
  line-height:1.2;white-space:nowrap}
.dkbar .dk-tagrow{display:none}
@media (max-width:639px){.dkbar a.dk-brand{font-size:20px;gap:10px}.dkbar .dk-brand img{width:40px;height:40px}}
@media (max-width:559px){.dkbar a.dk-brand{font-size:18px}.dkbar .dk-brand img{width:36px;height:36px}
  .dkbar .dk-brand .dk-tag{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
  .dkbar .dk-tagrow{display:block;flex-basis:100%;margin:-6px 0 2px}}
@media (max-width:399px){.dkbar a.dk-brand{font-size:15px;gap:8px}.dkbar .dk-brand img{width:32px;height:32px}}
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
@media (min-width:1024px) and (min-height:600px),(max-width:1023px) and (min-height:500px){
  .dkbar{position:sticky;top:0;z-index:50}}
@media (min-width:1024px) and (min-height:600px),(min-width:640px) and (max-width:1023px) and (min-height:500px){
  .dk-sub{position:sticky;top:var(--dk-nav-h,0px);z-index:49}}
@media print{.dkbar,.dk-sub{display:none!important}}
`;

/* Measures whatever is pinned (bar, Fed strip, band) into --dk-nav-h (the bar,
   the strip's offset), --dk-bar-h (bar plus strip, the band's offset) and
   --dk-stick-h (all three, the scroll padding). Runs where
   it is injected, before the page's own markup, so the band is picked up once the
   document has parsed. */
const PIN_JS = `(function(){var r=document.documentElement,p=document.getElementById("dk-pin"),s=document.getElementById("dk-sub");
if(!p||!window.ResizeObserver)return;r.classList.add("dk-js");
function h(e){return e&&getComputedStyle(e).position==="sticky"?e.getBoundingClientRect().height:0}
function u(){var n=h(p),b=n+h(s);r.style.setProperty("--dk-nav-h",n+"px");r.style.setProperty("--dk-bar-h",b+"px");
r.style.setProperty("--dk-stick-h",b+h(document.querySelector(".bb-hdr"))+"px")}
var o=new ResizeObserver(u);o.observe(p);if(s)o.observe(s);addEventListener("resize",u);
document.addEventListener("DOMContentLoaded",function(){var d=document.querySelector(".bb-hdr");if(d)o.observe(d);u()});u()})();`;

/* DeskHeader's mark: the same data URI, decorative beside the words. */
const MARK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='white'/%3E%3Ctext x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='%231E3A5F' font-family='system-ui' font-size='16' font-weight='800'%3EBB%3C/text%3E%3C/svg%3E";
const TAG = "Independent Accessibility Evaluation";
// The label matches DeskHeader's: the visible words, plus the comma a screen
// reader needs between the two lines (2.5.3). The phone copy of the descriptor is
// hidden from assistive technology, since the link already carries it.
const BRAND =
  `<a class="dk-brand" href="/desk" aria-label="Brian Beals, LLC Desk, ${TAG}">` +
  `<img src="${MARK}" alt="" aria-hidden="true" width="44" height="44">` +
  `<span class="dk-bt"><span>Brian Beals, LLC<span aria-hidden="true"> ·</span> Desk</span>` +
  `<span class="dk-tag">${TAG}</span></span></a>` +
  `<p class="dk-tagrow" aria-hidden="true">${TAG}</p>`;

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
      ? '<nav class="dk-sub" id="dk-sub" aria-label="Federal pitch"><p><a href="/desk#pitch-federal">Federal pitch, Section 508: SOFWERX, primes, program offices</a></p></nav>'
      : "";
  return `<style>${CSS}</style>${skip}<nav class="dkbar" id="dk-pin" aria-label="Desk"><div class="dk-row">${BRAND}<ul>${items}</ul></div></nav>${sub}<script>${PIN_JS}</script>${target}`;
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
