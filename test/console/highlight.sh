#!/usr/bin/env bash
#
# task highlight — stamps a highlight + note on a PDF's first page.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

FIXTURES=../seed-base/base
OUT=tmp/highlight
mkdir -p "$OUT"

cp -n "$FIXTURES/document/error.pdf" "$OUT/doc.pdf" 2>/dev/null || true

suite "Highlight"

step "positional form"
OUT_POS="$OUT/doc.pos.pdf"
rm -f "$OUT_POS"
task highlight "$OUT/doc.pdf" -o "$OUT_POS" -t important -f text >/dev/null
expect_file "$OUT_POS"

step "explicit -i / -o form"
OUT_EXP="$OUT/doc.exp.pdf"
rm -f "$OUT_EXP"
task highlight -i "$OUT/doc.pdf" -o "$OUT_EXP" -t critical -f text >/dev/null
expect_file "$OUT_EXP"

summary
