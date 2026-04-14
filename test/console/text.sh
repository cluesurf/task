#!/usr/bin/env bash
#
# Text file cli — inspect (type/mime/eol/encoding) + set eol + set
# encoding round-trip.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

OUT=tmp/text
mkdir -p "$OUT"

suite "Text"

step "inspect — ASCII / LF"
LF="$OUT/plain.txt"
printf 'one\ntwo\nthree\n' > "$LF"
INSPECT=$(task inspect "$LF" -f text 2>&1)
expect "type shown" test -n "$(echo "$INSPECT" | grep -i '^type ')"
expect "mime text/plain" test -n "$(echo "$INSPECT" | grep 'text/plain')"
expect "eol lf" test -n "$(echo "$INSPECT" | grep -E '^eol +lf$')"

step "set eol — CRLF → LF"
CRLF="$OUT/crlf.txt"
printf 'one\r\ntwo\r\nthree\r\n' > "$CRLF"
task set eol lf "$CRLF" -f text >/dev/null
expect "no \\r bytes remain" test -z "$(tr -d '\r' < "$CRLF" | diff - "$CRLF" 2>&1)"

step "set eol — LF → CRLF"
LF2="$OUT/fresh.txt"
printf 'a\nb\nc\n' > "$LF2"
task set eol crlf "$LF2" -f text >/dev/null
expect "contains \\r\\n" test -n "$(grep -c $'\r$' "$LF2" || true)"

step "set encoding — us-ascii identity"
ID="$OUT/id.txt"
printf 'hi\n' > "$ID"
task set encoding utf8 "$ID" -f text >/dev/null
expect_file "$ID"

summary
