#!/usr/bin/env bash
# Build dist/<name>-<version>-r0.apk via abuild.

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

render_template "$here/template/APKBUILD.in" "$stage/APKBUILD" \
  NAME="$name" \
  VERSION="$version" \
  SUMMARY="$(meta_summary)" \
  HOMEPAGE="$(meta_homepage)" \
  LICENSE="$(meta_license)" \
  MAINTAINER="$(meta_maintainer)" \
  DEPS="$(deps_for alpine " ")"

( cd "$stage" && abuild -r -P "$here/dist" )

echo "built apk(s) in $here/dist/"
find "$here/dist" -name '*.apk'
