#!/usr/bin/env bash
# highlight: positional form + explicit -i / -o.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/highlight
mkdir -p "$OUT"
cp "$F/document/magic.pdf" "$OUT/doc.pdf"

suite "Highlight"

step "positional"
rm -f "$OUT/doc.pos.pdf"
task highlight "$OUT/doc.pdf" -o "$OUT/doc.pos.pdf" -t important -f text >/dev/null 2>&1
expect_file "$OUT/doc.pos.pdf"

step "explicit -i / -o"
rm -f "$OUT/doc.exp.pdf"
task highlight -i "$OUT/doc.pdf" -o "$OUT/doc.exp.pdf" -t critical -f text >/dev/null 2>&1
expect_file "$OUT/doc.exp.pdf"

summary
