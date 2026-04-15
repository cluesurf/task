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

# Refuse relative paths — they resolve from publish.sh's cwd
# (deep inside make/deck/linux/gentoo/) and silently land the
# commit in the wrong repo. Always require an absolute path so
# the destination is unambiguous.
case "$overlay" in
  /*) ;;
  *) echo "publish gentoo: GENTOO_OVERLAY_DIR must be absolute (got: $overlay)" >&2; exit 1 ;;
esac

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

root="$(cd "$here/../../../.." && pwd)"
version="$(node -p "require('$root/package.json').version")"
if [ -z "$version" ]; then
  echo "publish gentoo: could not read version from $root/package.json" >&2
  exit 1
fi

(
  set -e
  cd "$overlay"
  # Catch the common "docs/ is in .gitignore" trap loudly. The
  # publishing model requires docs/ to be a tracked Pages root —
  # if git refuses the add, the upstream repo's .gitignore needs
  # editing, not the script.
  if ! git add "$category/cluesurf-task" 2>add.err; then
    echo "publish gentoo: git add refused. Likely cause:" >&2
    cat add.err >&2
    rm -f add.err
    echo "" >&2
    echo "Fix: edit the deck repo's .gitignore to stop ignoring docs/." >&2
    echo "The Pages root needs to be committed for the apt/rpm/apk/gentoo" >&2
    echo "nesting strategy to work." >&2
    exit 1
  fi
  rm -f add.err
  if git diff --cached --quiet; then
    echo "publish gentoo: no changes for $version, skipping commit"
  else
    git commit -m "cluesurf-task $version"
    git push
    echo "pushed $version to overlay at $overlay"
  fi
)
