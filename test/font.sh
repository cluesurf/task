#!/usr/bin/env bash
#
# Font CLI end-to-end. Fixtures copy in from
# `../seed-base/base/font/` (ancient.*, etch.*); outputs land in
# `tmp/font/out/`.
#
# Exercises: inspect, subset, compress, dump (round-trip), shape,
# render. Each test uses the pretty-text format for stdout assertions
# and the default json/pretty format for file outputs.

set -euo pipefail
cd "$(dirname "$0")/.."
. test/lib.sh

FIXTURES=../seed-base/base/font
SRC=tmp/font
OUT=tmp/font/out

mkdir -p "$SRC" "$OUT"
cp -n "$FIXTURES/etch.ttf"    "$SRC/etch.ttf"    2>/dev/null || true
cp -n "$FIXTURES/etch.otf"    "$SRC/etch.otf"    2>/dev/null || true
cp -n "$FIXTURES/ancient.ttf" "$SRC/ancient.ttf" 2>/dev/null || true

file_size() {
  stat -f%z "$1" 2>/dev/null || stat -c%s "$1"
}

suite "Font"

# ---- inspect ------------------------------------------------------

step "inspect font — prints family + tables"
OUTPUT=$(task inspect file -i "$SRC/etch.ttf" -f text 2>&1)
expect "output contains 'tables'" test -n "$(echo "$OUTPUT" | grep -i tables)"
expect "output contains 'family'" test -n "$(echo "$OUTPUT" | grep -i family)"

# ---- subset -------------------------------------------------------

step "subset font — shrink via --text"
SUBSET_OUT="$OUT/etch.subset.ttf"
rm -f "$SUBSET_OUT"
task subset font -i "$SRC/etch.ttf" -o "$SUBSET_OUT" --text "Hello world" -f text >/dev/null
expect_file "$SUBSET_OUT"
ORIG_SIZE=$(file_size "$SRC/etch.ttf")
NEW_SIZE=$(file_size "$SUBSET_OUT")
expect "subset is smaller than original" test "$NEW_SIZE" -lt "$ORIG_SIZE"

step "subset font — shrink via --unicodes + woff2 flavor"
SUBSET_W2="$OUT/etch.latin.woff2"
rm -f "$SUBSET_W2"
task subset font -i "$SRC/etch.ttf" -o "$SUBSET_W2" \
  --unicodes "U+0020-007F" --flavor woff2 -f text >/dev/null
expect_file "$SUBSET_W2"

# ---- compress -----------------------------------------------------

step "compress font — TTF → WOFF2 sibling"
# woff2_compress writes <input>.woff2 next to the input; copy to OUT first.
cp "$SRC/etch.ttf" "$OUT/etch.ttf"
rm -f "$OUT/etch.woff2"
task compress font -i "$OUT/etch.ttf" -f text >/dev/null
expect_file "$OUT/etch.woff2"

step "compress font — explicit -o relocates output"
cp "$SRC/etch.ttf" "$OUT/etch2.ttf"
rm -f "$OUT/dist/etch2.woff2"
task compress font -i "$OUT/etch2.ttf" -o "$OUT/dist/etch2.woff2" -f text >/dev/null
expect_file "$OUT/dist/etch2.woff2"

# ---- dump (ttx round-trip) ----------------------------------------

step "dump font — TTF → TTX"
TTX_OUT="$OUT/etch.ttx"
rm -f "$TTX_OUT"
task dump font -i "$SRC/etch.ttf" -o "$TTX_OUT" -f text >/dev/null
expect_file "$TTX_OUT"
expect "TTX starts with <?xml" test -n "$(head -1 "$TTX_OUT" | grep -i '<?xml')"

step "dump font — TTX → TTF (compile back)"
RT_OUT="$OUT/etch.roundtrip.ttf"
rm -f "$RT_OUT"
task dump font -i "$TTX_OUT" -o "$RT_OUT" -f text >/dev/null
expect_file "$RT_OUT"

step "dump font — --tables filters"
TTX_NAME="$OUT/etch.name.ttx"
rm -f "$TTX_NAME"
task dump font -i "$SRC/etch.ttf" -o "$TTX_NAME" --tables "name,OS/2" -f text >/dev/null
expect_file "$TTX_NAME"
expect "dumped XML contains <name>" test -n "$(grep '<name>' "$TTX_NAME" || true)"

# ---- shape --------------------------------------------------------

step "shape font — 'office' → glyph sequence"
SHAPE_OUT=$(task shape font -i "$SRC/etch.ttf" --text "office" -f text 2>&1)
expect "shape output non-empty" test -n "$SHAPE_OUT"
expect "shape output contains glyph brackets" test -n "$(echo "$SHAPE_OUT" | grep '\[')"

# ---- render -------------------------------------------------------

step "render font — text → PNG"
RENDER_OUT="$OUT/etch.sample.png"
rm -f "$RENDER_OUT"
task render font -i "$SRC/etch.ttf" -o "$RENDER_OUT" --text "Hello" -f text >/dev/null
expect_file "$RENDER_OUT"

summary
