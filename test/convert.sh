#!/usr/bin/env bash
#
# `task convert` end-to-end across image + font backends.
# Fixtures copy in from `../seed-base/base/`; outputs land in
# `tmp/convert/out/`. Set KEEP=1 to skip clearing prior outputs.

set -euo pipefail
cd "$(dirname "$0")/.."
. test/lib.sh

FIXTURES=../seed-base/base
SRC=tmp/convert
OUT=tmp/convert/out

mkdir -p "$SRC" "$OUT"
copy_in() {
  cp -n "$FIXTURES/$1/$2" "$SRC/$2" 2>/dev/null || true
}
copy_in image fire.png
copy_in image fire.gif
copy_in image fire.svg
copy_in image landscape.jpg
copy_in image landscape.bmp
copy_in image example.tiff
copy_in image favicon.ico
copy_in image fox.avif
copy_in font  etch.ttf

[ "${KEEP:-}" = "1" ] || find "$OUT" -mindepth 1 -delete 2>/dev/null || true

# Some conversions emit `<base>-<n>.<ext>` (animated gif → png).
# Treat the run as a pass when at least one matching file exists.
expect_output() {
  local out="$1"
  local base="${out%.*}"
  local ext="${out##*.}"
  local matched=0
  if [ -f "$out" ]; then
    expect_file "$out"
    matched=1
  fi
  for f in "$base"-*."$ext"; do
    [ -f "$f" ] || continue
    expect_file "$f"
    matched=1
  done
  if [ "$matched" -eq 0 ]; then
    expect "output near $out" false
  fi
}

convert_run() {
  local thing="$1" in_fmt="$2" out_fmt="$3" in_path="$4" out_path="$5"
  local tool="${6:-}"
  if [ -n "$tool" ]; then
    task convert "$thing" -I "$in_fmt" -O "$out_fmt" \
      -i "$in_path" -o "$out_path" --tool "$tool" -f text >/dev/null
  else
    task convert "$thing" -I "$in_fmt" -O "$out_fmt" \
      -i "$in_path" -o "$out_path" -f text >/dev/null
  fi
  expect_output "$out_path"
}

suite "Convert"

# ---- image: imagemagick (raster ↔ raster) -------------------------

step "image png → jpg"
convert_run image png jpg "$SRC/fire.png" "$OUT/fire.from-png.jpg"

step "image jpg → png"
convert_run image jpg png "$SRC/landscape.jpg" "$OUT/landscape.from-jpg.png"

step "image png → webp"
convert_run image png webp "$SRC/fire.png" "$OUT/fire.webp"

step "image jpg → webp"
convert_run image jpg webp "$SRC/landscape.jpg" "$OUT/landscape.webp"

step "image gif → png (animated)"
convert_run image gif png "$SRC/fire.gif" "$OUT/fire-anim.png"

step "image gif → webp (animated)"
convert_run image gif webp "$SRC/fire.gif" "$OUT/fire-anim.webp"

step "image bmp → png"
convert_run image bmp png "$SRC/landscape.bmp" "$OUT/landscape.bmp.png"

step "image tiff → png"
convert_run image tiff png "$SRC/example.tiff" "$OUT/example.tiff.png"

step "image ico → png"
convert_run image ico png "$SRC/favicon.ico" "$OUT/favicon.ico.png"

step "image png → ico"
convert_run image png ico "$SRC/fire.png" "$OUT/fire.ico"

step "image png → bmp"
convert_run image png bmp "$SRC/fire.png" "$OUT/fire.bmp"

# ---- image: avif (only when imagemagick has libheif) --------------

if convert -list format 2>/dev/null | grep -qiE '^[[:space:]]*AVIF'; then
  step "image avif → png"
  convert_run image avif png "$SRC/fox.avif" "$OUT/fox.png"
fi

# ---- image: inkscape (svg → raster) -------------------------------

if command -v inkscape >/dev/null 2>&1; then
  step "image svg → png (inkscape)"
  convert_run image svg png "$SRC/fire.svg" "$OUT/fire.svg.png" inkscape
fi

# ---- font: fontforge ----------------------------------------------

step "font ttf → woff"
convert_run font ttf woff "$SRC/etch.ttf" "$OUT/etch.woff"

step "font ttf → otf"
convert_run font ttf otf "$SRC/etch.ttf" "$OUT/etch.otf"

summary
