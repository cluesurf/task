#!/usr/bin/env bash
# Top-level dispatcher. Calls the publish.sh of each named ecosystem.
# Required env vars per ecosystem are documented in each subdir's
# publish.sh and in the table in make/deck/readme.md.
#
#   ./publish.sh deb               # one
#   ./publish.sh deb rpm scoop     # several
#   ./publish.sh                   # all
#
# Written for plain bash (macOS ships 3.2 — no associative arrays).

set -euo pipefail

folder="$(cd "$(dirname "$0")" && pwd)"

# Each ecosystem maps to a subdir under make/deck/. Keep the two
# lists in lockstep — `key_to_path` does the lookup the associative
# array would have done on bash 4+.
ALL_KEYS="deb rpm arch alpine gentoo opensuse scoop winget choco nix"

key_to_path() {
  case "$1" in
    deb)      echo "linux/deb" ;;
    rpm)      echo "linux/rpm" ;;
    arch)     echo "linux/arch" ;;
    alpine)   echo "linux/alpine" ;;
    gentoo)   echo "linux/gentoo" ;;
    opensuse) echo "linux/opensuse" ;;
    scoop)    echo "windows/scoop" ;;
    winget)   echo "windows/winget" ;;
    choco)    echo "windows/choco" ;;
    nix)      echo "nix" ;;
    *)        return 1 ;;
  esac
}

if [ "$#" -gt 0 ]; then
  keys="$*"
else
  keys="$ALL_KEYS"
fi

for key in $keys; do
  path="$(key_to_path "$key")" || { echo "unknown target: $key" >&2; exit 1; }
  echo "===> publish $key"
  ( cd "$folder/$path" && ./publish.sh )
done
