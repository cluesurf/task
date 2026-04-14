#!/usr/bin/env bash
# Commit the RPM spec to your OBS project. Reuses make/deck/linux/rpm.
#
# Required env:
#   OBS_PROJECT       e.g. home:cluesurf
#   OBS_PACKAGE       package name (default: cluesurf-task)

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
project="${OBS_PROJECT:?set OBS_PROJECT (e.g. home:cluesurf)}"
package="${OBS_PACKAGE:-cluesurf-task}"

spec="$here/../rpm/dist/rpmbuild/SPECS/cluesurf-task.spec"
if [ ! -f "$spec" ]; then
  echo "spec not built — run ../rpm/make.sh first" >&2
  exit 1
fi

work="$here/dist/osc"
rm -rf "$work"
mkdir -p "$work"

(
  cd "$work"
  osc co "$project/$package" || osc meta pkg "$project" "$package" --create
  cd "$project/$package"
  cp "$spec" .
  osc add cluesurf-task.spec || true
  osc commit -m "cluesurf-task $(node -p "require('$here/../../../package.json').version")"
)

echo "committed to OBS project $project"
