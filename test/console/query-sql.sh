#!/usr/bin/env bash
#
# `task query sql duckdb` — analytical SQL over CSV / Parquet /
# JSON via DuckDB. Help wiring runs without the binary; the live
# query runs only when `duckdb` is on PATH.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/query-sql
mkdir -p "$OUT"

suite "Query SQL — help"

step "task query sql --help"
expect_contains "wired" "task query sql --help" "sql"

step "task query sql duckdb --help"
expect_contains "wired" "task query sql duckdb --help" "duckdb"

summary

if ! command -v duckdb >/dev/null 2>&1; then
  printf '\n  (duckdb not on PATH — skipping live query)\n'
  exit 0
fi

suite "Query SQL — live"

CSV="$OUT/tiny.csv"
printf 'id,name\n1,a\n2,b\n3,c\n' > "$CSV"

step "task query sql duckdb --from $CSV --select 'count(*) as n' --format csv"
expect_contains "row count" \
  "task query sql duckdb --from \"$CSV\" --select 'count(*) as n' --format csv 2>&1" \
  "3"

summary
