#!/usr/bin/env bash
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/parse-table
mkdir -p "$OUT"

suite "Parse table — help + live"

step "task parse table --help"
expect_contains "wired" "task parse table --help" "table"

cat > "$OUT/sample.html" <<HTML
<table>
  <tr><th>id</th><th>name</th></tr>
  <tr><td>1</td><td>a</td></tr>
  <tr><td>2</td><td>b</td></tr>
</table>
HTML

step "pulls a single table from HTML"
expect_contains "row data" \
  "task parse table $OUT/sample.html 2>&1" \
  "Ana|Bo|name|id|\"1\"|\"2\""

summary
