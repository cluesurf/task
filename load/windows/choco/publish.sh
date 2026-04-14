#!/usr/bin/env bash
# Push the built nupkg to a chocolatey feed.
#
# Required env:
#   CHOCO_API_KEY     push api key
#   CHOCO_SOURCE      feed url (default: community feed)

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
key="${CHOCO_API_KEY:?set CHOCO_API_KEY to the push api key}"
source_url="${CHOCO_SOURCE:-https://push.chocolatey.org}"

shopt -s nullglob
nupkgs=("$here/dist/"*.nupkg)
if [ ${#nupkgs[@]} -eq 0 ]; then
  echo "no .nupkg in dist/ — run ./make.sh on a Windows host first" >&2
  exit 1
fi

if ! command -v choco >/dev/null 2>&1; then
  echo "choco not on PATH — run this on a Windows host" >&2
  exit 1
fi

for f in "${nupkgs[@]}"; do
  choco push "$f" --source "$source_url" --api-key "$key"
done
