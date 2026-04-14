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
fork="${WINGET_PKGS_DIR:?set WINGET_PKGS_DIR to your winget-pkgs fork}"

src_root="$here/dist/manifests"
if [ ! -d "$src_root" ]; then
  echo "no manifests in dist/ — run ./make.sh first" >&2
  exit 1
fi

version=$(node -p "require('$here/../../../package.json').version")
branch="cluesurf-task-$version"

cp -R "$src_root/." "$fork/manifests/"
(
  cd "$fork"
  git checkout -b "$branch"
  git add "manifests/c/ClueSurf/Task/$version"
  git commit -m "New version: ClueSurf.Task version $version"
  git push -u origin "$branch"
)

if command -v gh >/dev/null 2>&1; then
  ( cd "$fork" && gh pr create --fill --base master )
else
  echo "branch $branch pushed. Open the PR via the GitHub UI."
fi
