#!/usr/bin/env bash
# Render dist/<name>-<version>.ebuild. Gentoo ebuilds are source
# recipes, not binary packages — copy the output into a local
# overlay and run `ebuild <file>.ebuild manifest` to register it.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
source "$here/../../shared/meta.sh"
source "$here/../shared/deps.sh"
source "$here/../../shared/render.sh"

name="$(meta_name)"
version="$(meta_version)"
out="$here/dist/${name}-${version}.ebuild"

mkdir -p "$here/dist"

# Gentoo uses newline-separated RDEPEND inside quotes.
render_template "$here/template/cluesurf-task.ebuild.in" "$out" \
  SUMMARY="$(meta_summary)" \
  HOMEPAGE="$(meta_homepage)" \
  LICENSE="$(meta_license)" \
  DEPS="$(deps_for gentoo "
  ")"

echo "rendered $out"
