#!/usr/bin/env bash
#
# `task isolate image` — html (cheerio data: URIs) is pure-JS
# and always runnable; pdf needs `pdfimages` (poppler); docx
# needs `mammoth` (pure JS, always there).
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/isolate-image
mkdir -p "$OUT"

suite "Isolate image — help + dispatch"

step "task isolate image --help"
expect_contains "wired" "task isolate image --help" "image"

step "rejects unknown extensions"
echo 'irrelevant' > "$OUT/mystery.xyz"
if task isolate image "$OUT/mystery.xyz" -o "$OUT/out" >/dev/null 2>&1; then
  _fail "expected non-zero exit on .xyz"
else
  _pass "rejects unknown extension"
fi

step "rejects when -o is missing"
if task isolate image "$OUT/page.html" >/dev/null 2>&1; then
  _fail "expected non-zero exit when no -o"
else
  _pass "errors without --output"
fi

summary

suite "Isolate image — html data: URIs"

cat > "$OUT/page.html" <<'HTML'
<html><body>
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" alt="dot">
<img src="data:image/svg+xml;utf8,%3Csvg/%3E" alt="svg">
<img src="https://example.com/external.png" alt="external">
</body></html>
HTML
rm -rf "$OUT/html-out"

step "extracts data: URIs only (skips remote)"
task isolate image "$OUT/page.html" -o "$OUT/html-out" >/dev/null 2>&1
COUNT=$(ls "$OUT/html-out" 2>/dev/null | wc -l | tr -d ' ')
expect_eq "two data: URIs land on disk; remote is skipped" "$COUNT" "2"

step "honors --prefix"
rm -rf "$OUT/prefix-out"
task isolate image "$OUT/page.html" -o "$OUT/prefix-out" --prefix fig \
  >/dev/null 2>&1
if ls "$OUT/prefix-out" 2>/dev/null | grep -q "^fig-"; then
  _pass "files use the requested prefix"
else
  _fail "expected files prefixed with fig-"
fi

summary

if ! command -v pdfimages >/dev/null 2>&1; then
  printf '\n  (pdfimages not on PATH — skipping pdf cases)\n'
  exit 0
fi

suite "Isolate image — pdf (when pdfimages is present)"

# We don't ship a fixture PDF here; the suite only verifies the
# wrapper runs against a real PDF if one happens to be on disk
# from the convert tests.
PDF="seed-base/base/document/magic.pdf"
if [ -f "$PDF" ]; then
  rm -rf "$OUT/pdf-out"
  step "task isolate image $PDF"
  if task isolate image "$PDF" -o "$OUT/pdf-out" >/dev/null 2>&1; then
    _pass "ran without error"
  else
    _fail "pdfimages spawn failed"
  fi
else
  printf '    (no fixture pdf at %s — skipping)\n' "$PDF"
fi

summary
