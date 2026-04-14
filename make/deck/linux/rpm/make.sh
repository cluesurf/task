#!/usr/bin/env bash
# Build dist/<name>-<version>-1.<dist>.noarch.rpm via rpmbuild.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
source "$here/../../shared/meta.sh"
source "$here/../shared/deps.sh"
source "$here/../../shared/render.sh"

name="$(meta_name)"
version="$(meta_version)"
topdir="$here/dist/rpmbuild"
spec="$topdir/SPECS/${name}.spec"

rm -rf "$topdir"
mkdir -p "$topdir"/{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}

render_template "$here/template/cluesurf-task.spec.in" "$spec" \
  NAME="$name" \
  VERSION="$version" \
  SUMMARY="$(meta_summary)" \
  HOMEPAGE="$(meta_homepage)" \
  LICENSE="$(meta_license)" \
  MAINTAINER="$(meta_maintainer)" \
  DESCRIPTION="$(meta_description)" \
  DEPS="$(deps_for rpm ",
          ")" \
  DATE="$(LC_ALL=C date '+%a %b %d %Y')"

rpmbuild --define "_topdir $topdir" -bb "$spec"

find "$topdir/RPMS" -name '*.rpm' -exec cp {} "$here/dist/" \;

echo "built rpm(s) in $here/dist/"
ls "$here/dist/"*.rpm
