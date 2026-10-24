#!/usr/bin/env python3
"""Build the five accessibility capability statement web pages from the Letter one-pagers.

The one-pagers in the LLC folder (Accessibility-Practice/*_ONEPAGE.html) are the source for both
the PDFs (render_print_pdf.py --tight) and these pages, so the HTML and the PDF say the same thing.
This copies each one-pager's header and two columns word for word, drops the print sizing (pt
units, the per-variant fit variables, the Letter min-height), and wraps them in screen CSS: a
readable 16px base, two columns from 760px and one below, dark mode, and the site's standard
footer with the PDF link, /documents, and the site map.

It also writes the /documents thumbnails (public/thumbs/<page>.png, page 1 of each PDF in public/,
rendered with macOS sips), so copy the freshly rendered PDFs into public/ before running it.

    python3 scripts/build_capability_web.py            # writes public/capability-statement-accessibility*.html

Then copy each output back over its LLC folder copy (the mapping is in that folder's README.md).
"""
import html
import subprocess
import pathlib
import re
import sys
from urllib.parse import quote

SRC = pathlib.Path.home() / "Library/Mobile Documents/com~apple~CloudDocs/LLC/FL-VBE/Accessibility-Practice"
OUT = pathlib.Path(__file__).resolve().parent.parent / "public"
# one-pager -> (web page, PDF)
PAGES = {
    "Capability_Statement_Accessibility_ONEPAGE.html":
        ("capability-statement-accessibility.html", "Brian-Beals-LLC-Accessibility-Capability-Statement.pdf"),
    "Capability_Statement_Accessibility_Federal_ONEPAGE.html":
        ("capability-statement-accessibility-federal.html", "Brian-Beals-LLC-Accessibility-Capability-Statement-Federal.pdf"),
    "Capability_Statement_Accessibility_Healthcare_ONEPAGE.html":
        ("capability-statement-accessibility-healthcare.html", "Brian-Beals-LLC-Accessibility-Capability-Statement-Healthcare.pdf"),
    "Capability_Statement_Accessibility_Nonprofit_ONEPAGE.html":
        ("capability-statement-accessibility-nonprofit.html", "Brian-Beals-LLC-Accessibility-Capability-Statement-Nonprofit.pdf"),
    "Capability_Statement_Accessibility_Maryland_ONEPAGE.html":
        ("capability-statement-accessibility-maryland.html", "Brian-Beals-LLC-Accessibility-Capability-Statement-Maryland.pdf"),
}

CSS = """
  :root{--navy:#1E3A5F;--accent:#2673A8;--card:#D6EAF8;--bg:#F4F6F9;--ink:#1A1A2A;--green:#1E8449;
        --muted:#5B6470;--side:#F5F8FC;--rule:#E1E6EC;--page:#fff;--intro:#2B2B36;--ok:#17693A;}
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;background:var(--bg);color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:16px;line-height:1.55;}
  .page{max-width:880px;margin:0 auto;background:var(--page);}
  @media (min-width:900px){.page{margin:24px auto;box-shadow:0 2px 8px rgba(0,0,0,.06);}}
  /* The navy header keeps fixed light text in both schemes. */
  .hdr{background:var(--navy);color:#fff;padding:20px 24px;display:flex;justify-content:space-between;
    align-items:center;gap:16px;flex-wrap:wrap;}
  .brand{display:flex;align-items:center;gap:14px;}
  .name{font-size:1.6rem;font-weight:800;letter-spacing:-0.01em;line-height:1.15;margin:0;color:#fff;}
  .tag{font-size:.95rem;color:#D6EAF8;margin-top:2px;}
  .doc-title{font-size:.85rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#fff;margin-top:4px;}
  .contact{font-style:normal;font-size:.95rem;text-align:right;line-height:1.6;color:#EAF1F8;}
  .contact a{color:#fff;text-decoration:underline;text-underline-offset:3px;}
  .ribbon{background:#1E8449;color:#fff;font-size:.9rem;font-weight:700;text-transform:uppercase;
    letter-spacing:.02em;padding:7px 24px;}
  .clock{background:#FEF6E7;border-bottom:1px solid #F0E2C4;color:#5E4A0E;padding:12px 24px;}
  .clock strong{color:#6B5410;}
  main{display:grid;grid-template-columns:64fr 36fr;}
  .col-l{padding:20px 24px 16px;}
  .col-r{padding:20px 22px 16px;background:var(--side);border-left:1px solid var(--rule);}
  h2{font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--navy);margin:24px 0 8px;}
  .col-r h2:first-child{margin-top:0;}
  p{margin:0 0 12px;}
  .intro{color:var(--intro);}
  .serve strong,.cc .t,.pp .en{color:var(--navy);}
  ul{margin:0;padding-left:20px;}
  li{margin:0 0 8px;}
  .cc .t{font-weight:700;}
  table{width:100%;border-collapse:collapse;line-height:1.4;}
  th,td{padding:6px 0;border-bottom:1px solid var(--rule);vertical-align:top;}
  tr:last-child th,tr:last-child td{border-bottom:none;}
  th{color:var(--muted);font-weight:600;text-align:left;white-space:nowrap;padding-right:10px;}
  td{text-align:left;font-weight:600;overflow-wrap:anywhere;}
  .codes td{font-weight:400;}
  .ok{color:var(--ok);}
  .nw{white-space:nowrap;}
  footer{border-top:1px solid var(--rule);padding:14px 24px;color:var(--muted);font-size:.9rem;
    display:flex;align-items:flex-start;gap:8px;}
  footer img{flex:none;margin-top:3px;}
  .brand img{flex:none;}
  footer a{color:var(--accent);}
  .navhr{height:4px;background:var(--navy);}
  /* Free-check QR beside the contact block (2026-10-19). White tile with the quiet zone intact. */
  .reach{display:flex;align-items:center;gap:16px;}
  .qr{text-align:center;line-height:1.2;}
  .qr img{display:block;width:84px;height:84px;}
  .qr .cap{font-size:.85rem;font-weight:700;color:#fff;margin-top:4px;}
  .skip{position:absolute;left:-9999px;top:0;z-index:99;background:var(--navy);color:#fff;padding:10px 16px;
    font-weight:700;text-decoration:none;border-radius:0 0 6px 0;}
  .skip:focus{left:0;}
  #main:focus{outline:none;}
  /* 1.4.10 Reflow: below 760px the header stacks and the side column drops under the main one. */
  @media (max-width:760px){
    .hdr{flex-direction:column;align-items:flex-start;padding:18px 16px;}
    .contact{text-align:left;}
    .reach{flex-wrap:wrap;align-items:flex-start;}
    .ribbon,.clock{padding-left:16px;padding-right:16px;}
    main{grid-template-columns:1fr;}
    .col-l,.col-r{padding-left:16px;padding-right:16px;}
    .col-r{border-left:none;border-top:1px solid var(--rule);}
    footer{padding-left:16px;padding-right:16px;}
  }
  @media (prefers-color-scheme:dark){
    :root{--bg:#0F1822;--ink:#E6EDF3;--muted:#93A6B8;--accent:#7FB3D8;--side:#1B2836;--rule:#2A3B4D;
          --page:#16202B;--intro:#C3D0DC;--ok:#5FCF8E;}
    .clock{background:#2A2313;border-bottom-color:#3D3520;color:#E8D49B;}
    .clock strong{color:#F2E2AE;}
    h2,.serve strong,.cc .t,.pp .en{color:var(--accent);}
  }
"""

# The BB mark as a decorative <img> rather than inline SVG: axe can't read the background behind
# SVG <text> and leaves it as a contrast "needs review" (the site's byline mark went the same way).
def MARK(s, bg, fg):
    svg = (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' "
           f"fill='{bg}'/><text x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='{fg}' "
           f"font-family='-apple-system,system-ui,sans-serif' font-size='16' font-weight='800' "
           f"letter-spacing='-0.04em'>BB</text></svg>")
    return f'<img src="data:image/svg+xml,{quote(svg)}" width="{s}" height="{s}" alt="">'


SVG_MARK = re.compile(r'<svg viewBox="0 0 32 32" width="(\d+)"[^>]*>.*?fill="(#[0-9A-Fa-f]{3,6})"/>.*?fill="(#[0-9A-Fa-f]{3,6})".*?</svg>', re.S)


def grab(pattern, text, what, name):
    m = re.search(pattern, text, re.S)
    if not m:
        sys.exit(f"{name}: no {what} found; the one-pager template changed")
    return m.group(1)


def build(name, page, pdf):
    src = (SRC / name).read_text()
    title = grab(r"<title>(.*?)</title>", src, "title", name)
    icon = grab(r'(<link rel="icon"[^>]*>)', src, "icon", name)
    header = grab(r"<header>(.*?)</header>", src, "header", name)
    main = grab(r'<main id="main" tabindex="-1">(.*?)</main>', src, "main", name)
    # The contact block's site line (brianbeals.com on all four since 2026-10-19), for the footer.
    site = grab(r'href="https://(brianbeals\.com[^"]*)"', header, "site link", name)
    intro = grab(r'<p class="intro">(.*?)</p>', main, "intro", name)
    desc = html.escape(re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", intro))).strip(), quote=True)
    # The contact block is an address on the web; same lines, same order.
    header = re.sub(r'<div class="contact">(.*?)</div>', r'<address class="contact">\1</address>', header, count=1, flags=re.S)
    header = SVG_MARK.sub(lambda m: MARK(m.group(1), m.group(2), m.group(3)), header)
    footer = f"""<footer>
    {MARK(16, "#1E3A5F", "#fff")}
    <span>&copy; Brian Beals, LLC &middot; {site} &middot; <span class="yr">2026</span><br>
    <a href="/{pdf}">Download this statement as a PDF</a> &middot; Every capability statement in both formats: <a href="https://brianbeals.com/documents"><strong>brianbeals.com/documents</strong></a> &middot; <a href="/sitemap-page">Site map</a></span>
  </footer>"""
    out = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light dark">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="https://brianbeals.com/{page}">
{icon}
<!-- Built by scripts/build_capability_web.py from {name}, the same source as the PDF. Edit the one-pager, not this file. -->
<style>{CSS}</style>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
<div class="page">
  <header>{header}</header>
  <main id="main" tabindex="-1">{main}</main>
  {footer}
  <div class="navhr"></div>
</div>
<script>document.querySelectorAll(".yr").forEach(function(e){{e.textContent=new Date().getFullYear()}});</script>
</body>
</html>
"""
    (OUT / page).write_text(out)
    print("wrote public/" + page)
    # /documents thumbnail: page 1 of the published PDF, 360px wide (2x for a 180px slot).
    thumbs = OUT / "thumbs"
    thumbs.mkdir(exist_ok=True)
    png = thumbs / page.replace(".html", ".png")
    subprocess.run(["sips", "-s", "format", "png", "--resampleWidth", "360", str(OUT / pdf), "--out", str(png)],
                   check=True, capture_output=True)
    print("wrote public/thumbs/" + png.name)


if __name__ == "__main__":
    for name, (page, pdf) in PAGES.items():
        build(name, page, pdf)
