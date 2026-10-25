// The desk's navigation bar for the gated pages served as built HTML: the source
// documents under /desk/doc and the state and fed dashboards (2026-10-15). /desk
// itself has a React header since 2026-10-16 (app/components/DeskHeader.tsx) with
// the same section names, the same navy and the same --accent-stripe; this bar
// is a string injected into pages React does not render, so its Menu button (below
// 768px, since 2026-10-25) is a small inline script rather than HeaderMenu.
//
// One implementation, as a self-contained HTML string with its own <style>,
// because three of the four places it appears are built HTML served as is
// (lib/desk-proxy.ts, app/desk/doc). Injecting it there leaves the dashboards' own
// builds unchanged. Navy bar, white links: 11.5:1 in both color schemes, so it
// needs no dark variant. Wraps at 320px, visible focus, hidden in print.
//
// Pinned only from 1024px wide at 600px high (since 2026-10-25; from 2026-10-21 it
// also pinned below 1024px at 500px high, which with the brand lockup took 143px
// at 768 and 191px at 320). Narrower or shorter windows scroll it away with the
// page (1.4.10). The Fed pitch strip pins under it on the same rule. Because the bar
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
// line under the name, as in the header. From 768px the links keep their size and
// wrap after it, so the bar grows rather than shrinking them. Below 768px they
// collapse under a Menu button that shares the lockup's row, as on the public
// site's phone header: aria-expanded and aria-controls, the button keeps focus when
// it opens the list, Escape closes it and returns focus to the button, and a link
// or a click outside closes it. The list collapses only once the script has run
// (.dk-m on the bar), so without JavaScript the links show and the button stays
// hidden. The lockup's elements are reset
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
.dkbar a.dk-brand{flex:0 1 auto;min-width:0}
.dkbar .dk-menu{all:unset;display:none;box-sizing:border-box;align-items:center;gap:6px;min-height:44px;
  padding:0 10px;border:1px solid #D6EAF8;border-radius:4px;color:#FFFFFF;cursor:pointer;
  font:600 14px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
.dkbar .dk-menu svg{display:block;width:16px;height:12px;flex:none}
.dkbar .dk-menu:focus-visible{outline:3px solid #FFFFFF;outline-offset:1px}
@media (max-width:767px){
  .dkbar.dk-m .dk-menu{display:inline-flex;order:1;margin-left:auto}
  .dkbar .dk-tagrow{order:2}
  .dkbar.dk-m ul{order:3;flex-basis:100%;flex-direction:column;align-items:stretch;gap:0;padding:4px 0 8px}
  .dkbar.dk-m ul:not(.dk-open){display:none}
  .dkbar.dk-m ul a{display:flex;align-items:center;min-height:44px}
  .dkbar.dk-m .dk-out{margin-left:0}}
@media (max-width:399px){.dkbar .dk-menu svg{display:none}.dkbar .dk-menu{padding:0 8px}}
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
@media (min-width:1024px) and (min-height:600px){
  .dkbar{position:sticky;top:0;z-index:50}
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

/* The Menu button below 768px. Runs right after the bar, so its elements exist. */
const MENU_JS = `(function(){var n=document.getElementById("dk-pin");if(!n)return;
var b=n.querySelector(".dk-menu"),l=document.getElementById("dk-list");if(!b||!l)return;n.classList.add("dk-m");
function on(){return b.getAttribute("aria-expanded")==="true"}
function set(o){b.setAttribute("aria-expanded",o?"true":"false");l.classList.toggle("dk-open",o)}
b.addEventListener("click",function(){set(!on())});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&on()){set(false);b.focus()}});
document.addEventListener("pointerdown",function(e){if(on()&&!n.contains(e.target))set(false)});
l.addEventListener("click",function(e){if(e.target.closest("a"))set(false)})})();`;

/* Three bars, decorative: the word Menu is the button's name. */
const MENU_BTN =
  '<button type="button" class="dk-menu" aria-expanded="false" aria-controls="dk-list">' +
  '<svg viewBox="0 0 16 12" width="16" height="12" aria-hidden="true" focusable="false">' +
  '<path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" stroke-width="2" fill="none"/></svg>Menu</button>';

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
  return `<style>${CSS}</style>${skip}<nav class="dkbar" id="dk-pin" aria-label="Desk"><div class="dk-row">${BRAND}${MENU_BTN}<ul id="dk-list">${items}</ul></div></nav><script>${MENU_JS}</script>${sub}<script>${PIN_JS}</script>${target}`;
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
