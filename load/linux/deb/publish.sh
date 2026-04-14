#!/usr/bin/env bash
# Build a signed, flat-layout apt repository from every .deb in dist/.
#
# Usage: ./publish.sh [suite]
#
# Required env:
#   APT_REPO_DIR     path the repo tree is written to
#   APT_SIGNING_KEY  gpg key id used to sign Release / InRelease
#
# The resulting tree is static HTML + gzip + gpg — drop it behind
# HTTPS (GitHub Pages, S3, Cloudflare R2, etc.).
#
# End-user install flow is documented in readme.md.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
out="${APT_REPO_DIR:?set APT_REPO_DIR to the output repo path}"
suite="${1:-stable}"
component="main"
arch="all"
origin="ClueSurf"
label="ClueSurf"

key="${APT_SIGNING_KEY:?set APT_SIGNING_KEY to the gpg key id used for signing}"

pool="$out/pool/$component"
dists="$out/dists/$suite/$component/binary-$arch"

mkdir -p "$pool" "$dists"

# Copy any built .debs into the pool.
shopt -s nullglob
debs=("$here/dist/"*.deb)
if [ ${#debs[@]} -eq 0 ]; then
  echo "no .debs in $here/dist — run ./make.sh first" >&2
  exit 1
fi
cp -f "${debs[@]}" "$pool/"

# Generate Packages + Packages.gz relative to the repo root so
# `Filename:` fields point at `pool/main/...`.
( cd "$out" && dpkg-scanpackages --arch "$arch" "pool/$component" > "$dists/Packages" )
gzip -kf "$dists/Packages"

# Generate the Release file.
release="$out/dists/$suite/Release"
{
  echo "Origin: $origin"
  echo "Label: $label"
  echo "Suite: $suite"
  echo "Codename: $suite"
  echo "Components: $component"
  echo "Architectures: $arch"
  echo "Date: $(date -Ru)"
  apt-ftparchive release "$out/dists/$suite"
} > "$release"

# Detached signature + inline-signed InRelease.
gpg --default-key "$key" --armor --detach-sign --yes -o "$out/dists/$suite/Release.gpg" "$release"
gpg --default-key "$key" --clearsign --yes -o "$out/dists/$suite/InRelease" "$release"

# Export the public key so users can fetch it once.
gpg --armor --export "$key" > "$out/pubkey.asc"

echo "repo written to $out"
echo "publish this directory over HTTPS"
