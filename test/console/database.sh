#!/usr/bin/env bash
# Database dump / restore — verifies command builders without
# needing a running server. We exercise sqlite end-to-end (sqlite3
# is everywhere) and check help / dispatch for the rest.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/database
mkdir -p "$OUT"
DB="$OUT/sample.db"
DUMP="$OUT/sample.sql"
RESTORED="$OUT/restored.db"

# Build a tiny sqlite db from scratch.
rm -f "$DB" "$RESTORED" "$DUMP"
sqlite3 "$DB" "CREATE TABLE t(id INTEGER, name TEXT); INSERT INTO t VALUES (1, 'foobar');"

suite "Database"

step "dump sqlite to file"
task dump database sqlite --file "$DB" -o "$DUMP" >/dev/null 2>&1
expect_file "$DUMP"
expect_contains "dump has insert" "cat $DUMP" "INSERT INTO"

step "restore sqlite from file"
task restore database sqlite --file "$RESTORED" -i "$DUMP" >/dev/null 2>&1
expect_contains "restored row" "sqlite3 $RESTORED 'SELECT name FROM t'" "foobar"

step "dump pg help"
expect_contains "pg_dump description" "task dump database pg --help" "PostgreSQL"

step "dump mysql help"
expect_contains "mysqldump description" "task dump database mysql --help" "MySQL"

step "dump mongo help"
expect_contains "mongodump description" "task dump database mongo --help" "MongoDB"

step "restore listing"
expect_contains "restore lists database" "task restore --help" "database"

summary
