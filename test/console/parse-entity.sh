#!/usr/bin/env bash
#
# `task parse entity` — pull semi-structured tokens out of text.
# Pure JS, no external dep. Always run both help wiring and a
# live extraction.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/parse-entity
mkdir -p "$OUT"

suite "Parse entity — help + live"

step "task parse entity --help"
expect_contains "wired" "task parse entity --help" "entity"

step "extracts an email from inline --text"
expect_contains "email match" \
  "task parse entity --text 'me@example.com is my address' 2>&1" \
  "me@example.com"

step "extracts urls + emails from a file"
echo 'see https://clue.surf or email a@x.com' > "$OUT/sample.txt"
expect_contains "url match" \
  "task parse entity $OUT/sample.txt 2>&1" \
  "https://clue.surf"
expect_contains "email match in same file" \
  "task parse entity $OUT/sample.txt 2>&1" \
  "a@x.com"

step "writes a JSON report when -o is given"
task parse entity --text 'a@x.com' -o "$OUT/report.json" >/dev/null 2>&1 || true
expect_file "$OUT/report.json"

summary
