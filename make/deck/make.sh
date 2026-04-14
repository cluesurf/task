#!/usr/bin/env bash
# Build every packaging artifact the current host is capable of
# producing. Skips ecosystems whose build tool isn't installed.
#
#   ./make.sh              # build everything possible
#   ./make.sh deb rpm      # only the listed ecosystems
#   ./make.sh --list       # print what would be built + why
#
# Written for plain bash (macOS ships 3.2 — no associative arrays).

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

# Per-target config. Output: "<dir>:<required-tool>" — empty tool
# means render-only, no external dep.
target_config() {
  case "$1" in
    deb)    echo "linux/deb:dpkg-deb" ;;
    rpm)    echo "linux/rpm:rpmbuild" ;;
    arch)   echo "linux/arch:makepkg" ;;
    alpine) echo "linux/alpine:abuild" ;;
    gentoo) echo "linux/gentoo:" ;;
    scoop)  echo "windows/scoop:" ;;
    winget) echo "windows/winget:zip" ;;
    choco)  echo "windows/choco:" ;;
    nix)    echo "nix:nix-build" ;;
    *)      return 1 ;;
  esac
}

all_targets="deb rpm arch alpine gentoo scoop winget choco nix"

have() { command -v "$1" >/dev/null 2>&1; }

run_one() {
  key="$1"
  entry=$(target_config "$key") || { echo "unknown target: $key" >&2; exit 1; }
  dir="${entry%%:*}"
  need="${entry##*:}"
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
  for key in $all_targets; do
    entry=$(target_config "$key")
    need="${entry##*:}"
    if [ -z "$need" ] || have "$need"; then
      echo "would build: $key"
    else
      echo "would skip:  $key (needs $need)"
    fi
  done
  exit 0
fi

if [ "$#" -gt 0 ]; then
  keys="$*"
else
  keys="$all_targets"
fi

for key in $keys; do
  echo "===> $key"
  run_one "$key"
done
