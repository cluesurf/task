#!/usr/bin/env bash
# Render dist/cluesurf-task.<version>.nupkg via `choco pack`, or at
# minimum a ready-to-pack dist/cluesurf-task.nuspec. Requires `choco`
# on the build host; otherwise stops after rendering the nuspec.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
source "$here/../../shared/meta.sh"
source "$here/../../shared/render.sh"
source "$here/../shared/deps.sh"

name="$(meta_name)"
version="$(meta_version)"
stage="$here/dist"

mkdir -p "$stage"

# <dependency id="..." /> per line, indented for <dependencies>.
choco_deps=$(deps_for choco $'\n' | sed 's#^#      <dependency id="#; s#$#" />#')

render_template "$here/template/task.nuspec.in" "$stage/${name}.nuspec" \
  NAME="$name" \
  VERSION="$version" \
  SUMMARY="$(meta_summary)" \
  HOMEPAGE="$(meta_homepage)" \
  DESCRIPTION="$(meta_description | tr '\n' ' ' | sed 's/  */ /g; s/ $//')" \
  DEPS="$choco_deps"

echo "rendered $stage/${name}.nuspec"

if command -v choco >/dev/null 2>&1; then
  ( cd "$stage" && choco pack "${name}.nuspec" --out "$stage" )
  echo "built nupkg(s):"
  ls "$stage"/*.nupkg
else
  echo "choco not found — copy $stage/${name}.nuspec into a Windows"
  echo "checkout and run 'choco pack' there."
fi
