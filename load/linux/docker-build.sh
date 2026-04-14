#!/usr/bin/env bash
# Cross-build Linux packages from any host that has Docker. Useful
# on macOS developer machines where `dpkg-deb` / `rpmbuild` / `abuild`
# aren't natively available.
#
#   ./docker-build.sh deb            # one format
#   ./docker-build.sh deb rpm arch   # many
#   ./docker-build.sh                # everything
#
# Written for plain bash (macOS ships 3.2 — no associative arrays).

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
# Mount the task package root (where package.json lives), so make.sh
# can resolve the version via load/shared/meta.sh.
root="$(cd "$here/../.." && pwd)"

# Per-format config. Anything missing here is "unknown format".
fmt_image() {
  case "$1" in
    deb)    echo "debian:stable" ;;
    rpm)    echo "fedora:latest" ;;
    arch)   echo "archlinux:latest" ;;
    alpine) echo "alpine:latest" ;;
    gentoo) echo "debian:stable" ;;     # just renders; any node host works
    *) return 1 ;;
  esac
}

fmt_bootstrap() {
  case "$1" in
    deb)
      echo "apt-get update && apt-get install -y --no-install-recommends nodejs dpkg-dev" ;;
    rpm)
      echo "dnf install -y nodejs rpm-build" ;;
    arch)
      # pacman 7's landlock sandbox doesn't work under Docker; disable it.
      echo "echo 'DisableSandbox' >> /etc/pacman.conf && pacman -Sy --noconfirm --disable-sandbox nodejs base-devel sudo && useradd -m build && echo 'build ALL=(ALL) NOPASSWD: ALL' >/etc/sudoers.d/build" ;;
    alpine)
      # abuild needs a packager key — generate a throwaway one for
      # the build. Real signing happens at repo-index time via the
      # ABUILD_KEY the publisher already controls.
      echo "apk add --no-cache nodejs bash alpine-sdk sudo && adduser -D build && addgroup build abuild && echo 'build ALL=(ALL) NOPASSWD: ALL' >/etc/sudoers.d/build && su - build -c 'abuild-keygen -a -i -n'" ;;
    gentoo)
      echo "apt-get update && apt-get install -y --no-install-recommends nodejs" ;;
    *) return 1 ;;
  esac
}

fmt_run_as() {
  case "$1" in
    arch|alpine) echo "build" ;;
    *)           echo "root" ;;
  esac
}

# Per-format docker-run flags. arch's pacman uses seccomp syscalls
# Docker Desktop's default profile blocks; loosen for that case.
fmt_extra_flags() {
  case "$1" in
    arch) echo "--security-opt seccomp=unconfined" ;;
    *)    echo "" ;;
  esac
}

run_one() {
  fmt="$1"
  img=$(fmt_image "$fmt") || { echo "unknown format: $fmt" >&2; exit 1; }
  boot=$(fmt_bootstrap "$fmt")
  user=$(fmt_run_as "$fmt")

  if [ "$user" = "root" ]; then
    script="set -e; cd /src/load/linux/$fmt && ./make.sh"
  else
    # arch/alpine's makepkg/abuild refuse to run as root, so su to `build`.
    # Only chown the build's own dist dir — recursively chowning /src
    # blows up on macOS osxfs mounts (e.g. .git permissions).
    script="set -e; mkdir -p /src/load/linux/$fmt/dist && chown -R $user:$user /src/load/linux/$fmt/dist && su - $user -c 'cd /src/load/linux/$fmt && ./make.sh'"
  fi

  extra=$(fmt_extra_flags "$fmt")

  echo "===> building $fmt inside $img"
  # `sh -c` works on every distro (alpine doesn't ship bash by default).
  docker run --rm --platform linux/amd64 $extra \
    -v "$root":/src -w /src "$img" \
    sh -c "$boot; $script"
}

if [ "$#" -gt 0 ]; then
  keys="$*"
else
  keys="deb rpm arch alpine gentoo"
fi

for key in $keys; do
  run_one "$key"
done

echo "done. artifacts in load/linux/<format>/dist/"
