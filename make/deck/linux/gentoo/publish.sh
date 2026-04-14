#!/usr/bin/env bash
# Push the rendered ebuild into a Portage overlay repo.
#
# Required env:
#   GENTOO_OVERLAY_DIR  local checkout of the overlay git repo
#   GENTOO_CATEGORY     overlay category (default: app-misc)

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
overlay="${GENTOO_OVERLAY_DIR:?set GENTOO_OVERLAY_DIR to your overlay checkout}"
category="${GENTOO_CATEGORY:-app-misc}"

shopt -s nullglob
ebuilds=("$here/dist/"*.ebuild)
if [ ${#ebuilds[@]} -eq 0 ]; then
  echo "no ebuild in $here/dist — run ./make.sh first" >&2
  exit 1
fi

dest="$overlay/$category/cluesurf-task"
mkdir -p "$dest"
cp -f "${ebuilds[@]}" "$dest/"

if command -v ebuild >/dev/null 2>&1; then
  for f in "$dest"/*.ebuild; do
    ( cd "$dest" && ebuild "$(basename "$f")" manifest )
  done
fi

(
  cd "$overlay" && git add "$category/cluesurf-task" \
  && git commit -m "cluesurf-task $(node -p "require('$here/../../../package.json').version")" \
  && git push
)

echo "pushed to overlay at $overlay"
