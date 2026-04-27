#!/usr/bin/env bash
#
# `task parse entity` — pure JS (linkify-it / ip-regex /
# libphonenumber-js / validator). Always runnable, no install
# gates needed.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/parse-entity
mkdir -p "$OUT"

suite "Parse entity — help"

step "task parse entity --help"
expect_contains "wired" "task parse entity --help" "entity"

step "errors with neither path nor --text"
if task parse entity >/dev/null 2>&1; then
  _fail "expected non-zero exit when neither path nor --text given"
else
  _pass "errors when no input source"
fi

summary

suite "Parse entity — extraction"

step "extracts an email from inline --text"
expect_contains "email match" \
  "task parse entity --text 'me@example.com is my address' 2>&1" \
  "me@example.com"

step "extracts urls + emails from a file"
echo 'see https://clue.surf or email a@x.com' > "$OUT/sample.md"
expect_contains "url match" \
  "task parse entity $OUT/sample.md 2>&1" \
  "https://clue.surf"
expect_contains "email match in same file" \
  "task parse entity $OUT/sample.md 2>&1" \
  "a@x.com"

step "scope to a single kind via -k"
expect_contains "only urls — no emails listed" \
  "task parse entity $OUT/sample.md -k url 2>&1" \
  "url"
if task parse entity "$OUT/sample.md" -k url 2>&1 | grep -q "email"; then
  _fail "expected no email entries when -k url"
else
  _pass "filters to url-only with -k"
fi

step "extracts a luhn-valid credit card and rejects an invalid one"
expect_contains "good cc captured" \
  "task parse entity --text '4242 4242 4242 4242 and 1234 5678 9012 3456' 2>&1" \
  "4242 4242 4242 4242"
if task parse entity --text '1234 5678 9012 3456' 2>&1 | grep -q '"cc"'; then
  _fail "expected luhn rejection of 1234-5678-9012-3456"
else
  _pass "luhn rejection works"
fi

step "extracts a UUID"
expect_contains "uuid present" \
  "task parse entity --text 'order 550e8400-e29b-41d4-a716-446655440000 created' 2>&1" \
  "550e8400-e29b-41d4-a716-446655440000"

step "writes a JSON report when -o is given"
task parse entity --text 'a@x.com' -o "$OUT/report.json" >/dev/null 2>&1
expect_file "$OUT/report.json"

summary
