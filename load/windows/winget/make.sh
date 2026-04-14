#!/usr/bin/env bash
# Render the three WinGet manifest files into
# dist/manifests/c/ClueSurf/Task/<version>/. That layout matches the
# winget-pkgs repo under github.com/microsoft/winget-pkgs.
#
# Unlike scoop/choco, WinGet doesn't have first-class metapackages.
# The workaround is a minimal zip installer that ships a single empty
# batch script and uses the `Dependencies.PackageDependencies` field
# to pull in the real toolchain.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
source "$here/../../shared/meta.sh"
source "$here/../../shared/render.sh"
source "$here/../shared/deps.sh"

version="$(meta_version)"
out_dir="$here/dist/manifests/c/ClueSurf/Task/$version"
stub_zip="$here/dist/cluesurf-task.zip"
stub_dir="$here/dist/stub"

rm -rf "$here/dist"
mkdir -p "$out_dir" "$stub_dir"

# Build the stub zip: just a .cmd that prints a hint. The real work
# happens via PackageDependencies.
cat > "$stub_dir/cluesurf-task.cmd" <<'EOF'
@echo off
echo cluesurf-task is a metapackage. Install the Node CLI with:
echo   pnpm add -g @cluesurf/task
EOF
( cd "$stub_dir" && zip -q -r "$stub_zip" . )
if command -v sha256sum >/dev/null 2>&1; then
  sha256=$(sha256sum "$stub_zip" | awk '{print toupper($1)}')
else
  sha256=$(shasum -a 256 "$stub_zip" | awk '{print toupper($1)}')
fi

# PackageDependencies: one "    - PackageIdentifier: <id>" per dep.
winget_deps=$(deps_for winget $'\n' | sed 's/^/    - PackageIdentifier: /')

# Description indented for the YAML literal block.
description_yaml=$(meta_description | sed 's/^/  /')

render_template "$here/template/ClueSurf.Task.yaml.in" \
  "$out_dir/ClueSurf.Task.yaml" \
  VERSION="$version"

render_template "$here/template/ClueSurf.Task.locale.en-US.yaml.in" \
  "$out_dir/ClueSurf.Task.locale.en-US.yaml" \
  VERSION="$version" \
  HOMEPAGE="$(meta_homepage)" \
  LICENSE="$(meta_license)" \
  SUMMARY="$(meta_summary)" \
  DESCRIPTION_YAML="$description_yaml"

# InstallerUrl is a placeholder — override before submitting to
# winget-pkgs. Upload the built zip to GitHub Releases and point
# at the release asset.
render_template "$here/template/ClueSurf.Task.installer.yaml.in" \
  "$out_dir/ClueSurf.Task.installer.yaml" \
  VERSION="$version" \
  INSTALLER_URL="https://github.com/cluesurf/task/releases/download/v${version}/cluesurf-task.zip" \
  INSTALLER_SHA256="$sha256" \
  DEPS="$winget_deps"

echo "rendered manifests in $out_dir"
echo "stub zip at $stub_zip (sha256: $sha256)"
