#!/usr/bin/env bash
# Stage the rendered manifests into your winget-pkgs fork and push
# a branch ready for PR. Doesn't open the PR itself — `gh pr create`
# at the end if `gh` is on PATH.
#
# Required env:
#   WINGET_PKGS_DIR   local checkout of github.com/<you>/winget-pkgs
#   WINGET_RELEASE_URL  url where the stub zip is hosted (used by
#                       the InstallerUrl in the manifest)

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../../../.." && pwd)"
fork="${WINGET_PKGS_DIR:?set WINGET_PKGS_DIR to your winget-pkgs fork}"

src_root="$here/dist/manifests"
if [ ! -d "$src_root" ]; then
  echo "no manifests in dist/ — run ./make.sh first" >&2
  exit 1
fi

version="$(node -p "require('$root/package.json').version")"
if [ -z "$version" ]; then
  echo "publish winget: could not read version from $root/package.json" >&2
  exit 1
fi
branch="cluesurf-task-$version"

cp -R "$src_root/." "$fork/manifests/"
(
  cd "$fork"
  # Start from the fork's upstream-tracking branch, not whatever
  # branch was left behind by a previous run.
  git fetch upstream master 2>/dev/null || true
  git checkout master 2>/dev/null || git checkout -b master
  # If the branch already exists from a prior attempt, reset it
  # rather than error out on `checkout -b`.
  git branch -D "$branch" 2>/dev/null || true
  git checkout -b "$branch"
  git add "manifests/c/ClueSurf/Task/$version"
  if git diff --cached --quiet; then
    echo "publish winget: no changes for $version, skipping commit"
    exit 0
  fi
  git commit -m "New version: ClueSurf.Task version $version"
  git push -u origin "$branch"
)

if command -v gh >/dev/null 2>&1; then
  (
    cd "$fork" && gh pr create \
      --repo microsoft/winget-pkgs \
      --base master \
      --head "cluesurf:$branch" \
      --fill
  )
else
  echo "branch $branch pushed. Open the PR via:"
  echo "  https://github.com/microsoft/winget-pkgs/compare/master...cluesurf:$branch"
fi
