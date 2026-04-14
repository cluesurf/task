#!/usr/bin/env bash
#
# Font CLI — inspect, subset, compress, dump (round-trip), shape,
# render. Fixtures from ../seed-base/base/font; outputs in
# tmp/font/out.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

FIXTURES=../seed-base/base/font
SRC=tmp/font
OUT=tmp/font/out

mkdir -p "$SRC" "$OUT"
cp -n "$FIXTURES/etch.ttf" "$SRC/etch.ttf" 2>/dev/null || true

file_size() { stat -f%z "$1" 2>/dev/null || stat -c%s "$1"; }

suite "Font"

step "inspect — family + tables"
OUTPUT=$(task inspect "$SRC/etch.ttf" -f text 2>&1)
expect "contains 'family'" test -n "$(echo "$OUTPUT" | grep -i family)"
expect "contains 'tables'" test -n "$(echo "$OUTPUT" | grep -i tables)"

step "subset — keep glyphs for 'Hello world'"
OUT_FILE="$OUT/etch.subset.ttf"
rm -f "$OUT_FILE"
task subset "$SRC/etch.ttf" -o "$OUT_FILE" --text "Hello world" -f text >/dev/null
expect_file "$OUT_FILE"
expect "smaller than original" test "$(file_size "$OUT_FILE")" -lt "$(file_size "$SRC/etch.ttf")"

step "compress — TTF → WOFF2 sibling"
cp "$SRC/etch.ttf" "$OUT/etch.ttf"
rm -f "$OUT/etch.woff2"
task compress "$OUT/etch.ttf" -f text >/dev/null
expect_file "$OUT/etch.woff2"

step "dump — TTF → TTX → TTF"
TTX="$OUT/etch.ttx"; RT="$OUT/etch.rt.ttf"
rm -f "$TTX" "$RT"
task dump "$SRC/etch.ttf" -o "$TTX" -f text >/dev/null
expect_file "$TTX"
expect "XML header" test -n "$(head -1 "$TTX" | grep -i '<?xml')"
task dump "$TTX" -o "$RT" -f text >/dev/null
expect_file "$RT"

step "shape — 'office' → non-empty glyph sequence"
SHAPED=$(task shape font -i "$SRC/etch.ttf" --text "office" -f text 2>&1)
expect "non-empty" test -n "$SHAPED"

summary
