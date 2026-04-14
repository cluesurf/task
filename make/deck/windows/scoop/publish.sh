#!/usr/bin/env bash
# Push the rendered scoop manifest into the bucket dir. Writes the
# JSON directly to `$SCOOP_BUCKET_DIR/cluesurf-task.json` — no
# nested `bucket/` subfolder, because the bucket is nested inside
# cluesurf/deck (not a dedicated scoop-bucket repo) and users
# install by manifest URL rather than `scoop bucket add`.
#
# Required env:
#   SCOOP_BUCKET_DIR   local path that publishes to
#                      <pages>/scoop/cluesurf-task.json

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../../../.." && pwd)"
bucket="${SCOOP_BUCKET_DIR:?set SCOOP_BUCKET_DIR to the bucket output dir}"
manifest="$here/dist/cluesurf-task.json"

if [ ! -f "$manifest" ]; then
  echo "no manifest in dist/ — run ./make.sh first" >&2
  exit 1
fi

version="$(node -p "require('$root/package.json').version")"
if [ -z "$version" ]; then
  echo "publish scoop: could not read version from $root/package.json" >&2
  exit 1
fi

mkdir -p "$bucket"
cp -f "$manifest" "$bucket/cluesurf-task.json"

(
  cd "$bucket" && git add cluesurf-task.json
  if git diff --cached --quiet; then
    echo "publish scoop: no changes for $version, skipping commit"
  else
    git commit -m "cluesurf-task $version"
    git push
    echo "pushed $version manifest to $bucket"
  fi
)
