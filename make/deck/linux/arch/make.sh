#!/usr/bin/env bash
# Build dist/<name>-<version>-1-any.pkg.tar.zst via makepkg.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
source "$here/../../shared/meta.sh"
source "$here/../shared/deps.sh"
source "$here/../../shared/render.sh"

name="$(meta_name)"
version="$(meta_version)"
stage="$here/dist/build"

rm -rf "$stage"
mkdir -p "$stage"

# PKGBUILD deps: one per quoted token in a bash array.
arch_deps=$(deps_for arch " " | sed "s/[^ ]*/'&'/g")

render_template "$here/template/PKGBUILD.in" "$stage/PKGBUILD" \
  NAME="$name" \
  VERSION="$version" \
  SUMMARY="$(meta_summary)" \
  HOMEPAGE="$(meta_homepage)" \
  LICENSE="$(meta_license)" \
  MAINTAINER="$(meta_maintainer)" \
  DEPS="$arch_deps"

( cd "$stage" && makepkg -f --noextract --nodeps )

find "$stage" -maxdepth 1 -name '*.pkg.tar.zst' -exec cp {} "$here/dist/" \;

echo "built arch package(s) in $here/dist/"
ls "$here/dist/"*.pkg.tar.zst
