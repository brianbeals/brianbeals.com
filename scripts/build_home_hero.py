#!/usr/bin/env python3
"""Build the home page hero image (public/home-hero-guides.png).

Page 1 of the two demo city guides in ~/Code/a11y-audit/docs/demo, the broken
one (Visitor_Guide_FINAL_v3.pdf) and its accessible twin (visitor-guide-fixed.pdf),
rendered natively by Poppler's pdftoppm at 300 dpi and overlapped on the site's
navy (#1E3A5F) with a soft shadow. No labels: the point is that the two look the
same (their page 1 renders are pixel-identical). One composition serves every
width, since the hero column is about 390px wide at 1440 and 327px at 375; the
overlap keeps each cover near 180px wide on a phone. next/image serves it as
AVIF or WebP (next.config.ts, images.formats).

    python3 scripts/build_home_hero.py      # after a change to the demo PDFs in ~/Code/a11y-audit
"""
import pathlib
import subprocess
import tempfile

from PIL import Image, ImageDraw, ImageFilter

DEMO = pathlib.Path.home() / "Code/a11y-audit/docs/demo"
PDFS = ["Visitor_Guide_FINAL_v3.pdf", "visitor-guide-fixed.pdf"]
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public/home-hero-guides.png"
NAVY = (0x1E, 0x3A, 0x5F)

W = 1600                  # output width, 2x a ~400px slot and over 4x a 375 phone's
COVER = 880               # each cover's width
STEP = (560, 90)          # the second cover's offset from the first
PAD = 80                  # navy margin around the pair
SHADOW = 28               # blur radius
DROP = (0, 18)            # shadow offset


def render(pdf: pathlib.Path, tmp: pathlib.Path) -> Image.Image:
    stem = tmp / pdf.stem
    subprocess.run(["pdftoppm", "-r", "300", "-f", "1", "-l", "1", "-png", "-singlefile", str(pdf), str(stem)],
                   check=True)
    img = Image.open(f"{stem}.png").convert("RGB")
    return img.resize((COVER, round(COVER * img.height / img.width)), Image.LANCZOS)


def main() -> None:
    with tempfile.TemporaryDirectory() as t:
        covers = [render(DEMO / p, pathlib.Path(t)) for p in PDFS]
    ch = covers[0].height
    spots = [(PAD, PAD), (PAD + STEP[0], PAD + STEP[1])]
    assert spots[1][0] + COVER + PAD == W, "covers and margins should fill the width"
    size = (W, PAD + STEP[1] + ch + PAD)
    canvas = Image.new("RGB", size, NAVY)
    for cover, (x, y) in zip(covers, spots):
        shadow = Image.new("L", size, 0)
        ImageDraw.Draw(shadow).rectangle([x + DROP[0], y + DROP[1], x + DROP[0] + COVER, y + DROP[1] + ch],
                                         fill=150)
        shadow = shadow.filter(ImageFilter.GaussianBlur(SHADOW))
        canvas.paste(Image.new("RGB", size, (6, 14, 26)), (0, 0), shadow)
        canvas.paste(cover, (x, y))
    canvas.save(OUT, optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)} {size[0]}x{size[1]}")


if __name__ == "__main__":
    main()
