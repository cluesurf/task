#!/usr/bin/env bash
# Push the rendered PKGBUILD to the AUR.
#
# Required env:
#   AUR_REMOTE  ssh://aur@aur.archlinux.org/cluesurf-task.git

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
remote="${AUR_REMOTE:?set AUR_REMOTE to the AUR ssh url}"
src="$here/dist/build"
work="$here/dist/aur"

if [ ! -f "$src/PKGBUILD" ]; then
  echo "no PKGBUILD in $src — run ./make.sh first" >&2
  exit 1
fi

rm -rf "$work"
git clone "$remote" "$work"
# AUR's server-side hook only accepts pushes to `master` and will
# reject any other branch name (e.g. `main`, `make`). Force the
# local branch to `master` so the push refspec matches, regardless
# of the host's `init.defaultBranch` setting.
( cd "$work" && git symbolic-ref HEAD refs/heads/master )
cp "$src/PKGBUILD" "$work/PKGBUILD"

# Generate `.SRCINFO` — AUR requires it alongside PKGBUILD. Uses
# native `makepkg` when available (on Arch or in CI), otherwise
# shells into a throwaway archlinux:latest container. This lets
# macOS / Ubuntu hosts push without installing pacman.
if command -v makepkg >/dev/null 2>&1; then
  ( cd "$work" && makepkg --printsrcinfo > .SRCINFO )
else
  echo "makepkg not on PATH — generating .SRCINFO via docker" >&2
  docker run --rm -v "$work:/pkg" -w /pkg archlinux:latest \
    bash -c 'pacman -Sy --noconfirm --needed base-devel >/dev/null 2>&1 || true; \
             useradd -m build && chown -R build /pkg && \
             su - build -c "cd /pkg && makepkg --printsrcinfo" > /pkg/.SRCINFO'
fi

root="$(cd "$here/../../../.." && pwd)"
version="$(node -p "require('$root/package.json').version")"
if [ -z "$version" ]; then
  echo "publish arch: could not read version from $root/package.json" >&2
  exit 1
fi

( cd "$work" && git add PKGBUILD .SRCINFO \
  && git commit -m "cluesurf-task $version" \
  && git push origin HEAD:master )

echo "pushed $version to $remote"
