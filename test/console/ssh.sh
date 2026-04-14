#!/usr/bin/env bash
#
# SSH config CRUD — point the lib at a throwaway HOME so the user's
# real ~/.ssh stays untouched.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

SANDBOX=tmp/ssh/home
rm -rf "$SANDBOX"
mkdir -p "$SANDBOX/.ssh"
export HOME="$(pwd)/$SANDBOX"

suite "SSH config"

step "add ssh — new entry"
task add ssh prod --host 1.2.3.4 --user ubuntu --key "$HOME/.ssh/prod" -f text >/dev/null
expect "config file created" test -f "$HOME/.ssh/config"
expect "Host prod block" test -n "$(grep '^Host prod$' "$HOME/.ssh/config")"
expect "HostName 1.2.3.4" test -n "$(grep 'HostName 1.2.3.4' "$HOME/.ssh/config")"

step "get ssh — reports host + user"
GOT=$(task get ssh prod -f text 2>&1)
expect "host row" test -n "$(echo "$GOT" | grep -E '^host +1\.2\.3\.4$')"
expect "user row" test -n "$(echo "$GOT" | grep -E '^user +ubuntu$')"

step "set ssh — patch port"
task set ssh prod --port 2222 -f text >/dev/null
expect "Port 2222 written" test -n "$(grep 'Port 2222' "$HOME/.ssh/config")"

step "add ssh — second entry"
task add ssh work --host 10.0.0.5 --user lance -f text >/dev/null
expect "two Host blocks" test "$(grep -c '^Host ' "$HOME/.ssh/config")" -eq 2

step "list ssh — table has both names"
LIST=$(task list ssh -f text 2>&1)
expect "prod listed" test -n "$(echo "$LIST" | grep prod)"
expect "work listed" test -n "$(echo "$LIST" | grep work)"

step "rm ssh — drops the entry"
task rm ssh prod -f text >/dev/null
expect "prod gone" test -z "$(grep '^Host prod$' "$HOME/.ssh/config" || true)"
expect "work remains" test -n "$(grep '^Host work$' "$HOME/.ssh/config")"

summary
