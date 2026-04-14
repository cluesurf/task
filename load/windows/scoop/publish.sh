#!/usr/bin/env bash
# Push the rendered scoop manifest into your bucket repo.
#
# Required env:
#   SCOOP_BUCKET_DIR   local checkout of the scoop bucket repo

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
bucket="${SCOOP_BUCKET_DIR:?set SCOOP_BUCKET_DIR to your bucket checkout}"
manifest="$here/dist/cluesurf-task.json"

if [ ! -f "$manifest" ]; then
  echo "no manifest in dist/ — run ./make.sh first" >&2
  exit 1
fi

mkdir -p "$bucket/bucket"
cp -f "$manifest" "$bucket/bucket/cluesurf-task.json"

(
  cd "$bucket" && git add bucket/cluesurf-task.json \
  && git commit -m "cluesurf-task $(node -p "require('$here/../../../package.json').version")" \
  && git push
)

echo "pushed manifest to $bucket"
