#!/usr/bin/env bash
#
# `task parse link` — cheerio + linkify-it. Pure JS, fully live.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/parse-link
mkdir -p "$OUT"

suite "Parse link — help"

step "task parse link --help"
expect_contains "wired" "task parse link --help" "link"

step "errors with neither path nor --text"
if task parse link >/dev/null 2>&1; then
  _fail "expected non-zero exit"
else
  _pass "errors without input"
fi

summary

suite "Parse link — html mode"

cat > "$OUT/page.html" <<'HTML'
<html><head>
  <link rel="canonical" href="/canon">
</head><body>
  <a href="https://example.com" title="Ex">Example</a>
  <a href="/relative">Relative</a>
  <img src="/cat.png" alt="Cat">
  <meta property="og:image" content="https://cdn.example.com/og.png">
</body></html>
HTML

step "extracts <a> hrefs from HTML"
expect_contains "absolute href" \
  "task parse link $OUT/page.html 2>&1" \
  "https://example.com"

step "captures <img> alt text"
expect_contains "alt captured" \
  "task parse link $OUT/page.html 2>&1" \
  "Cat"

step "captures opengraph meta urls"
expect_contains "og:image href" \
  "task parse link $OUT/page.html 2>&1" \
  "cdn.example.com/og.png"

step "resolves relative URLs against --base"
expect_contains "relative resolved" \
  "task parse link $OUT/page.html --base https://example.com 2>&1" \
  "https://example.com/relative"

summary

suite "Parse link — text mode"

step "auto-detects plain text when no tags"
echo 'see https://clue.surf for details' > "$OUT/sample.txt"
expect_contains "url found in plain text" \
  "task parse link $OUT/sample.txt 2>&1" \
  "https://clue.surf"

step "extracts mailto: from --text"
expect_contains "mailto schema" \
  "task parse link --text 'reach a@x.com or https://x.com' --mode text 2>&1" \
  "mailto:a@x.com"

step "deduplicates by default"
out=$(task parse link --text 'https://x.com and https://x.com again' 2>&1)
count=$(printf '%s' "$out" | grep -c '"href": "https://x.com"')
if [ "$count" -le 1 ]; then
  _pass "single match after dedupe"
else
  _fail "expected dedup, got $count copies"
fi

summary
