#!/usr/bin/env bash
# Render dist/cluesurf-task.json — the scoop manifest. Drop the file
# into your scoop bucket repo to publish.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
source "$here/../../shared/meta.sh"
source "$here/../../shared/render.sh"
source "$here/../shared/deps.sh"

out="$here/dist/cluesurf-task.json"
mkdir -p "$here/dist"

# JSON array: each id quoted, separated by ", ".
scoop_deps=$(deps_for scoop " " | sed -E 's#([^ ]+)#"\1"#g; s/ /, /g')

render_template "$here/template/cluesurf-task.json.in" "$out" \
  VERSION="$(meta_version)" \
  SUMMARY="$(meta_summary)" \
  HOMEPAGE="$(meta_homepage)" \
  LICENSE="$(meta_license)" \
  DEPS="$scoop_deps"

echo "rendered $out"
