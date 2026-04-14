#!/usr/bin/env bash
# SSH config CRUD in a sandboxed HOME.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

SANDBOX=tmp/ssh/home
rm -rf "$SANDBOX"
mkdir -p "$SANDBOX/.ssh"
export HOME="$(pwd)/$SANDBOX"

suite "SSH config"

step "add"
task add ssh prod --host 1.2.3.4 --user ubuntu --key "$HOME/.ssh/prod" -f text >/dev/null 2>&1
expect_file "$HOME/.ssh/config"
expect_contains "Host prod block" "cat $HOME/.ssh/config" "^Host prod$"
expect_contains "HostName written" "cat $HOME/.ssh/config" "HostName 1.2.3.4"

step "get"
expect_contains "host row" "task get ssh prod -f text" "^host +1\\.2\\.3\\.4$"
expect_contains "user row" "task get ssh prod -f text" "^user +ubuntu$"

step "set patches port"
task set ssh prod --port 2222 -f text >/dev/null 2>&1
expect_contains "Port 2222" "cat $HOME/.ssh/config" "Port 2222"

step "add second entry"
task add ssh work --host 10.0.0.5 --user foobar -f text >/dev/null 2>&1
expect "two Host blocks" test "$(grep -c '^Host ' "$HOME/.ssh/config")" -eq 2

step "list shows both"
expect_contains "prod listed" "task list ssh -f text" "prod"
expect_contains "work listed" "task list ssh -f text" "work"

step "rm drops entry"
task rm ssh prod -f text >/dev/null 2>&1
expect "prod gone" bash -c "! grep -q '^Host prod\$' '$HOME/.ssh/config'"
expect_contains "work remains" "cat $HOME/.ssh/config" "^Host work$"

summary
