#!/usr/bin/env bash
# text: inspect + set eol round-trips.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/text
mkdir -p "$OUT"

suite "Text"

step "inspect lf"
LF="$OUT/lf.txt"
printf 'one\ntwo\nthree\n' > "$LF"
expect_contains "eol lf" "task inspect $LF -f text" "^eol +lf$"

step "set eol crlf → lf"
CRLF="$OUT/crlf.txt"
printf 'a\r\nb\r\nc\r\n' > "$CRLF"
task set eol lf "$CRLF" -f text >/dev/null 2>&1
expect "no CR bytes" bash -c "! grep -q \$'\r' '$CRLF'"

step "set eol lf → crlf"
FRESH="$OUT/fresh.txt"
printf 'x\ny\n' > "$FRESH"
task set eol crlf "$FRESH" -f text >/dev/null 2>&1
expect "has CRLF" bash -c "grep -q \$'\r\$' '$FRESH'"

summary
