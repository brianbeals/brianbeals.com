#!/usr/bin/env python3
"""Build the home page hero covers (public/home-hero-broken.png, public/home-hero-fixed.png).

Page 1 of the two demo city guides in ~/Code/a11y-audit/docs/demo, the broken
one (Visitor_Guide_FINAL_v3.pdf) and its accessible twin (visitor-guide-fixed.pdf),
rendered natively by Poppler's pdftoppm at 300 dpi. The page shows them side by
side at the same size, with no labels: the point is that the two look the same
(their page 1 renders are pixel-identical). The border and shadow are CSS, so
each file is just the page. 900px wide, 3x the widest slot (about 280px at 1440);
next/image serves it as AVIF or WebP (next.config.ts, images.formats).

    python3 scripts/build_home_hero.py      # after a change to the demo PDFs in ~/Code/a11y-audit
"""
import pathlib
import subprocess
import tempfile

from PIL import Image

DEMO = pathlib.Path.home() / "Code/a11y-audit/docs/demo"
ROOT = pathlib.Path(__file__).resolve().parent.parent
COVERS = {"broken": "Visitor_Guide_FINAL_v3.pdf", "fixed": "visitor-guide-fixed.pdf"}
W = 900


def main() -> None:
    with tempfile.TemporaryDirectory() as t:
        for name, pdf in COVERS.items():
            stem = pathlib.Path(t) / name
            subprocess.run(["pdftoppm", "-r", "300", "-f", "1", "-l", "1", "-png", "-singlefile",
                            str(DEMO / pdf), str(stem)], check=True)
            img = Image.open(f"{stem}.png").convert("RGB")
            img = img.resize((W, round(W * img.height / img.width)), Image.LANCZOS)
            out = ROOT / f"public/home-hero-{name}.png"
            img.save(out, optimize=True)
            print(f"wrote {out.relative_to(ROOT)} {img.width}x{img.height}")


if __name__ == "__main__":
    main()
