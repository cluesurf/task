#!/usr/bin/env bash
# Top-level dispatcher. Calls the publish.sh of each named ecosystem.
# Required env vars per ecosystem are documented in each subdir's
# publish.sh and in the table in load/readme.md.
#
#   ./publish.sh deb               # one
#   ./publish.sh deb rpm scoop     # several
#   ./publish.sh                   # all

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

declare -A path=(
  [deb]="linux/deb"
  [rpm]="linux/rpm"
  [arch]="linux/arch"
  [alpine]="linux/alpine"
  [gentoo]="linux/gentoo"
  [opensuse]="linux/opensuse"
  [scoop]="windows/scoop"
  [winget]="windows/winget"
  [choco]="windows/choco"
  [nix]="nix"
)

if [ "$#" -gt 0 ]; then
  keys=("$@")
else
  keys=(deb rpm arch alpine gentoo opensuse scoop winget choco nix)
fi

for key in "${keys[@]}"; do
  [[ -v path[$key] ]] || { echo "unknown target: $key" >&2; exit 1; }
  echo "===> publish $key"
  ( cd "$here/${path[$key]}" && ./publish.sh )
done
