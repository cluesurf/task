#!/usr/bin/env bash
# Idempotent setup for the Gentoo overlay subdirectory inside
# cluesurf/deck (or wherever $GENTOO_OVERLAY_DIR points).
#
# Creates:
#   <overlay>/profiles/repo_name      → "cluesurf"
#   <overlay>/metadata/layout.conf    → "masters = gentoo"
#   <overlay>/app-misc/cluesurf-task/ (empty — publish.sh fills it)
#
# Safe to run repeatedly — only writes files that don't already
# exist, and skips the commit when nothing changed.

set -euo pipefail

overlay="${GENTOO_OVERLAY_DIR:?set GENTOO_OVERLAY_DIR to your overlay path}"

mkdir -p "$overlay/profiles" "$overlay/metadata" "$overlay/app-misc/cluesurf-task"

repo_name="$overlay/profiles/repo_name"
layout="$overlay/metadata/layout.conf"

wrote=0
if [ ! -f "$repo_name" ]; then
  echo "cluesurf" > "$repo_name"
  echo "wrote $repo_name"
  wrote=1
fi

if [ ! -f "$layout" ]; then
  echo "masters = gentoo" > "$layout"
  echo "wrote $layout"
  wrote=1
fi

# If the overlay lives inside a git checkout, stage + commit the
# two new files. The parent cluesurf/deck publish flow will push
# them next time it runs; no need to push from here.
if [ "$wrote" -eq 1 ] && git -C "$overlay" rev-parse --git-dir >/dev/null 2>&1; then
  ( cd "$overlay" \
    && git add profiles/repo_name metadata/layout.conf \
    && git diff --cached --quiet || git commit -m "gentoo: init overlay skeleton" )
fi

echo "overlay ready at $overlay"
