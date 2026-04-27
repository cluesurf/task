#!/usr/bin/env bash
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/parse-link
mkdir -p "$OUT"

suite "Parse link — help + live"

step "task parse link --help"
expect_contains "wired" "task parse link --help" "link"

step "extracts URLs from a markdown file"
echo 'see [home](https://clue.surf) and reach a@x.com' > "$OUT/sample.md"
expect_contains "url found" \
  "task parse link $OUT/sample.md 2>&1" \
  "https://clue.surf"

step "extracts hrefs from an HTML file"
cat > "$OUT/page.html" <<HTML
<a href="https://example.com">x</a>
<img src="/cat.png" alt="Cat">
HTML
expect_contains "href found" \
  "task parse link $OUT/page.html 2>&1" \
  "example.com"

summary
