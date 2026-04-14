#!/usr/bin/env bash
# Build a signed Alpine repo from every .apk in dist/.
#
# Required env:
#   ALPINE_REPO_DIR    output repo path
#   ABUILD_KEY         path to a signing private key (see abuild-keygen)

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
out="${ALPINE_REPO_DIR:?set ALPINE_REPO_DIR to the output repo path}"
key="${ABUILD_KEY:?set ABUILD_KEY to the abuild private key path}"

shopt -s nullglob
apks=("$here/dist/"*.apk)
if [ ${#apks[@]} -eq 0 ]; then
  echo "no .apks in $here/dist — run ./make.sh first" >&2
  exit 1
fi

mkdir -p "$out"
cp -f "${apks[@]}" "$out/"

apk index -o "$out/APKINDEX.tar.gz" "$out"/*.apk
abuild-sign -k "$key" "$out/APKINDEX.tar.gz"

# Ship the matching public key so end users can trust the repo.
cp -f "$key.pub" "$out/$(basename "$key").pub"

echo "repo written to $out"
echo "publish this directory over HTTPS"
