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
cp "$src/PKGBUILD" "$work/PKGBUILD"
( cd "$work" && makepkg --printsrcinfo > .SRCINFO )
( cd "$work" && git add PKGBUILD .SRCINFO \
  && git commit -m "cluesurf-task $(node -p "require('$here/../../../package.json').version")" \
  && git push )

echo "pushed to $remote"
