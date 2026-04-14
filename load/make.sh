#!/usr/bin/env bash
# Build every packaging artifact the current host is capable of
# producing. Skips ecosystems whose build tool isn't installed.
#
#   ./make.sh              # build everything possible
#   ./make.sh deb rpm      # only the listed ecosystems
#   ./make.sh --list       # print what would be built + why

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

declare -A targets=(
  [deb]="linux/deb:dpkg-deb"
  [rpm]="linux/rpm:rpmbuild"
  [arch]="linux/arch:makepkg"
  [alpine]="linux/alpine:abuild"
  [gentoo]="linux/gentoo:"       # render-only, no external tool
  [scoop]="windows/scoop:"       # render-only
  [winget]="windows/winget:zip"
  [choco]="windows/choco:"       # render-only; choco optional
  [nix]="nix:nix-build"
)

have() { command -v "$1" >/dev/null 2>&1; }

run_one() {
  local key="$1" entry="${targets[$1]}"
  local dir="${entry%%:*}" need="${entry##*:}"
  if [ -n "$need" ] && ! have "$need"; then
    echo "skip $key (missing $need)"
    return 0
  fi
  if [ "$key" = nix ]; then
    ( cd "$here/nix" && nix-build --no-out-link default.nix )
  else
    ( cd "$here/$dir" && ./make.sh )
  fi
}

if [ "${1:-}" = "--list" ]; then
  for key in "${!targets[@]}"; do
    entry="${targets[$key]}"; need="${entry##*:}"
    if [ -z "$need" ] || have "$need"; then
      echo "would build: $key"
    else
      echo "would skip:  $key (needs $need)"
    fi
  done | sort
  exit 0
fi

if [ "$#" -gt 0 ]; then
  keys=("$@")
else
  keys=(deb rpm arch alpine gentoo scoop winget choco nix)
fi

for key in "${keys[@]}"; do
  [[ -v targets[$key] ]] || { echo "unknown target: $key" >&2; exit 1; }
  echo "===> $key"
  run_one "$key"
done
