#!/usr/bin/env bash
# Build dist/<name>_<version>_all.deb via dpkg-deb.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
source "$here/../../shared/meta.sh"
source "$here/../shared/deps.sh"
source "$here/../../shared/render.sh"

name="$(meta_name)"
version="$(meta_version)"
arch="all"
stage="$here/dist/${name}_${version}_${arch}"
deb="$here/dist/${name}_${version}_${arch}.deb"

# Debian control field continuations must start with a single space;
# blank lines become " .".
description_indented=$(meta_description | sed 's/^/ /; s/^ $/ ./')

rm -rf "$stage"
mkdir -p "$stage/DEBIAN"
cp -R "$here/template/DEBIAN/." "$stage/DEBIAN/"
rm -f "$stage/DEBIAN/control.in"

render_template "$here/template/DEBIAN/control.in" "$stage/DEBIAN/control" \
  NAME="$name" \
  VERSION="$version" \
  MAINTAINER="$(meta_maintainer)" \
  HOMEPAGE="$(meta_homepage)" \
  SUMMARY="$(meta_summary)" \
  DESCRIPTION_INDENTED="$description_indented" \
  DEPS="$(deps_for deb ",
 ")"

chmod 0755 "$stage/DEBIAN"
chmod 0755 "$stage/DEBIAN/postinst"
chmod 0644 "$stage/DEBIAN/control"

dpkg-deb --build --root-owner-group "$stage" "$deb"

echo "built $deb"
