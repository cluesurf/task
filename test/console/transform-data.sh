#!/usr/bin/env bash
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/transform-data
mkdir -p "$OUT"

suite "Transform data — help + live"

step "task transform data --help"
expect_contains "wired" "task transform data --help" "data"

step "rejects when no driver is given"
if task transform data /dev/null >/dev/null 2>&1; then
  _fail "expected error when no driver flag is set"
else
  _pass "errors without --map / --jq / --sql"
fi

step "map driver renames + picks fields"
cat > "$OUT/in.csv" <<CSV
id,full_name,internal
1,Ana,x
2,Bo,y
CSV
cat > "$OUT/map.yml" <<YML
rename:
  full_name: name
pick: [id, name]
YML
expect_contains "renamed name field present" \
  "task transform data $OUT/in.csv --map $OUT/map.yml -o $OUT/out.json && cat $OUT/out.json" \
  "name"

summary
