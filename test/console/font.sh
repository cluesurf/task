#!/usr/bin/env bash
# fonts: inspect / subset / compress / dump round-trip / shape.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/font
mkdir -p "$OUT"
cp "$F/font/etch.ttf" "$OUT/fnt.ttf"

suite "Font"

step "inspect"
expect_contains "family row" "task inspect $OUT/fnt.ttf -f text" "family"

step "subset"
rm -f "$OUT/fnt.min.ttf"
task subset "$OUT/fnt.ttf" -o "$OUT/fnt.min.ttf" -t "Hello world" -f text >/dev/null 2>&1
expect_file "$OUT/fnt.min.ttf"

step "compress → woff2"
rm -f "$OUT/fnt.woff2"
task compress "$OUT/fnt.ttf" -f text >/dev/null 2>&1
expect_file "$OUT/fnt.woff2"

step "dump ttf → ttx"
rm -f "$OUT/fnt.ttx"
task dump "$OUT/fnt.ttf" -o "$OUT/fnt.ttx" -f text >/dev/null 2>&1
expect_file "$OUT/fnt.ttx"

step "dump ttx → ttf"
rm -f "$OUT/fnt.rt.ttf"
task dump "$OUT/fnt.ttx" -o "$OUT/fnt.rt.ttf" -f text >/dev/null 2>&1
expect_file "$OUT/fnt.rt.ttf"

step "shape"
expect_contains "shape output" "task shape font -i $OUT/fnt.ttf -t office -f text" "\\[.*\\]"

summary
