#!/usr/bin/env bash
#
# `task parse table` — cheerio for HTML, mammoth for DOCX,
# pdfimages-style heuristic for PDF. HTML mode is pure-JS so we
# always run those cases live; DOCX / PDF gate on optional deps.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/parse-table
mkdir -p "$OUT"

suite "Parse table — help"

step "task parse table --help"
expect_contains "wired" "task parse table --help" "table"

step "errors on missing path"
if task parse table >/dev/null 2>&1; then
  _fail "expected non-zero exit when no path"
else
  _pass "errors without a path"
fi

step "errors on unsupported extension"
echo 'irrelevant' > "$OUT/mystery.xyz"
if task parse table "$OUT/mystery.xyz" >/dev/null 2>&1; then
  _fail "expected non-zero exit on .xyz"
else
  _pass "rejects unknown extension"
fi

summary

suite "Parse table — HTML"

cat > "$OUT/single.html" <<'HTML'
<table>
  <thead>
    <tr><th>id</th><th>name</th><th>active</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Ana</td><td>true</td></tr>
    <tr><td>2</td><td>Bo</td><td>false</td></tr>
  </tbody>
</table>
HTML

step "captures headers"
expect_contains "headers present" \
  "task parse table $OUT/single.html 2>&1" \
  '"id"'
expect_contains "active column" \
  "task parse table $OUT/single.html 2>&1" \
  '"active"'

step "captures row values"
expect_contains "Ana row" \
  "task parse table $OUT/single.html 2>&1" \
  "Ana"
expect_contains "Bo row" \
  "task parse table $OUT/single.html 2>&1" \
  "Bo"

cat > "$OUT/multi.html" <<'HTML'
<table><tr><th>a</th></tr><tr><td>1</td></tr></table>
<p>between</p>
<table><tr><th>b</th></tr><tr><td>2</td></tr></table>
HTML

step "two tables on one page"
expect_contains "first header a" \
  "task parse table $OUT/multi.html 2>&1" \
  '"a"'
expect_contains "second header b" \
  "task parse table $OUT/multi.html 2>&1" \
  '"b"'

step "scopes via --index 1"
out=$(task parse table "$OUT/multi.html" -i 1 2>&1)
if printf '%s' "$out" | grep -q '"a"'; then
  _fail "expected --index 1 to drop the first table (header a)"
else
  _pass "--index 1 emits only the second table"
fi

step "writes a JSON report when -o is given"
task parse table "$OUT/multi.html" -o "$OUT/tables.json" >/dev/null 2>&1
expect_file "$OUT/tables.json"

summary
