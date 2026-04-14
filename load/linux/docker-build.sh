#!/usr/bin/env bash
# Cross-build Linux packages from any host that has Docker. Useful
# on macOS developer machines where `dpkg-deb` / `rpmbuild` / `abuild`
# aren't natively available.
#
#   ./docker-build.sh deb            # one format
#   ./docker-build.sh deb rpm arch   # many
#   ./docker-build.sh                # everything

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/.." && pwd)"

declare -A image=(
  [deb]="debian:stable"
  [rpm]="fedora:latest"
  [arch]="archlinux:latest"
  [alpine]="alpine:latest"
  [gentoo]="debian:stable"       # just renders; any node host works
)

declare -A bootstrap=(
  [deb]="apt-get update && apt-get install -y --no-install-recommends nodejs dpkg-dev"
  [rpm]="dnf install -y nodejs rpm-build"
  [arch]="pacman -Sy --noconfirm nodejs base-devel sudo && useradd -m build && echo 'build ALL=(ALL) NOPASSWD: ALL' >/etc/sudoers.d/build"
  [alpine]="apk add --no-cache nodejs bash alpine-sdk sudo && adduser -D build && addgroup build abuild && echo 'build ALL=(ALL) NOPASSWD: ALL' >/etc/sudoers.d/build"
  [gentoo]="apt-get update && apt-get install -y --no-install-recommends nodejs"
)

declare -A run_as=(
  [arch]="build"
  [alpine]="build"
)

run_one() {
  local fmt="$1"
  local img="${image[$fmt]}"
  local boot="${bootstrap[$fmt]}"
  local user="${run_as[$fmt]:-root}"
  local script

  # arch/alpine's makepkg/abuild refuse to run as root, so su to `build`.
  if [ "$user" = "root" ]; then
    script="set -e; cd /src/load/linux/$fmt && ./make.sh"
  else
    script="set -e; chown -R $user:$user /src && su - $user -c 'cd /src/load/linux/$fmt && ./make.sh'"
  fi

  echo "===> building $fmt inside $img"
  docker run --rm --platform linux/amd64 -v "$root":/src -w /src "$img" \
    bash -c "$boot; $script"
}

if [ "$#" -gt 0 ]; then
  keys=("$@")
else
  keys=(deb rpm arch alpine gentoo)
fi

for key in "${keys[@]}"; do
  [[ -v image[$key] ]] || { echo "unknown format: $key" >&2; exit 1; }
  run_one "$key"
done

echo "done. artifacts in load/linux/<format>/dist/"
