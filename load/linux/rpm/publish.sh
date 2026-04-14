#!/usr/bin/env bash
# Build a signed yum/dnf/zypper repo from every .rpm in dist/.
#
# Required env:
#   RPM_REPO_DIR    output repo path
#   APT_SIGNING_KEY gpg key id (yes, same env name as deb — one key,
#                   many repos)

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
out="${RPM_REPO_DIR:?set RPM_REPO_DIR to the output repo path}"
key="${APT_SIGNING_KEY:?set APT_SIGNING_KEY to the gpg key id}"

shopt -s nullglob
rpms=("$here/dist/"*.rpm)
if [ ${#rpms[@]} -eq 0 ]; then
  echo "no .rpms in $here/dist — run ./make.sh first" >&2
  exit 1
fi

mkdir -p "$out"
cp -f "${rpms[@]}" "$out/"

createrepo_c "$out"
gpg --default-key "$key" --detach-sign --armor --yes "$out/repodata/repomd.xml"
gpg --armor --export "$key" > "$out/pubkey.asc"

echo "repo written to $out"
echo "publish this directory over HTTPS"
