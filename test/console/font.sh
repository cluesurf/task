#!/usr/bin/env bash
# fonts: inspect / subset / compress / dump round-trip / shape.
set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

F=../seed-base/base
OUT=tmp/font
mkdir -p "$OUT"
cp "$F/font/ancient.ttf" "$OUT/fnt.ttf"

suite "Font"

step "inspect"
OUT_TXT=$(task inspect "$OUT/fnt.ttf" -f text 2>&1)
expect "has family" test -n "$(echo "$OUT_TXT" | grep -i family)"

step "subset"
rm -f "$OUT/fnt.min.ttf"
task subset "$OUT/fnt.ttf" -o "$OUT/fnt.min.ttf" -t "Hello world" -f text >/dev/null
expect_file "$OUT/fnt.min.ttf"

step "compress → woff2"
rm -f "$OUT/fnt.woff2"
task compress "$OUT/fnt.ttf" -f text >/dev/null
expect_file "$OUT/fnt.woff2"

step "dump ttf → ttx"
rm -f "$OUT/fnt.ttx"
task dump "$OUT/fnt.ttf" -o "$OUT/fnt.ttx" -f text >/dev/null
expect_file "$OUT/fnt.ttx"

step "dump ttx → ttf"
rm -f "$OUT/fnt.rt.ttf"
task dump "$OUT/fnt.ttx" -o "$OUT/fnt.rt.ttf" -f text >/dev/null
expect_file "$OUT/fnt.rt.ttf"

step "shape"
OUT_SHAPE=$(task shape font -i "$OUT/fnt.ttf" -t "office" -f text 2>&1)
expect "non-empty" test -n "$OUT_SHAPE"

summary
