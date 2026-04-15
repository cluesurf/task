#!/usr/bin/env bash
# Winget manifest preflight — runs the three PR checklist items
# locally so we don't ship broken manifests to microsoft/winget-pkgs.
#
# Checks:
#
#   1. All three YAML files (singleton + installer + locale)
#      exist for the current package.json version.
#   2. ManifestVersion matches the required schema (default
#      1.12.0 — override via $WINGET_SCHEMA_VERSION).
#   3. `winget validate --manifest <dir>` succeeds.
#      Windows-only; skipped with a warning on macOS/Linux.
#   4. Optional: `winget install --manifest <dir>` when
#      CHECK_WINGET_INSTALL=1. Windows-only.
#
# Exits non-zero on any hard failure. Schema-version and file
# existence are hard failures everywhere; the `winget`-CLI steps
# are skipped (soft-pass) on non-Windows hosts.

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../../../.." && pwd)"

version="$(node -p "require('$root/package.json').version")"
if [ -z "$version" ]; then
  echo "check winget: could not read version from $root/package.json" >&2
  exit 1
fi

schema_version="${WINGET_SCHEMA_VERSION:-1.12.0}"
manifest_dir="$here/dist/manifests/c/ClueSurf/Task/$version"

# ---- 1. File existence -----------------------------------------

expected_files=(
  "ClueSurf.Task.yaml"
  "ClueSurf.Task.installer.yaml"
  "ClueSurf.Task.locale.en-US.yaml"
)

if [ ! -d "$manifest_dir" ]; then
  echo "check winget: no manifest tree at $manifest_dir" >&2
  echo "  run \`pnpm make:pkg:windows\` first." >&2
  exit 1
fi

missing=0
for f in "${expected_files[@]}"; do
  if [ ! -f "$manifest_dir/$f" ]; then
    echo "check winget: missing $f" >&2
    missing=1
  fi
done
if [ "$missing" -eq 1 ]; then
  echo "  re-run \`pnpm make:pkg:windows\` to regenerate."
  exit 1
fi

echo "check winget: [1/3] files present for version $version"

# ---- 2. Schema version -----------------------------------------

schema_bad=0
for f in "${expected_files[@]}"; do
  actual="$(grep -E '^ManifestVersion:' "$manifest_dir/$f" | head -1 | awk '{print $2}')"
  if [ "$actual" != "$schema_version" ]; then
    echo "check winget: $f has ManifestVersion: $actual (expected $schema_version)" >&2
    schema_bad=1
  fi
done
if [ "$schema_bad" -eq 1 ]; then
  echo "  bump ManifestVersion in make/deck/windows/winget/template/*.in" >&2
  echo "  and re-run \`pnpm make:pkg:windows\`." >&2
  exit 1
fi

echo "check winget: [2/3] ManifestVersion == $schema_version on all files"

# ---- 3. winget CLI validate + optional test install ------------

is_windows=0
case "$(uname -s 2>/dev/null || echo Unknown)" in
  MINGW*|MSYS*|CYGWIN*|Windows_NT) is_windows=1 ;;
esac
if [ -n "${OS:-}" ] && [ "${OS}" = "Windows_NT" ]; then
  is_windows=1
fi

if ! command -v winget >/dev/null 2>&1; then
  is_windows=0
fi

if [ "$is_windows" -eq 1 ]; then
  echo "check winget: [3/3] running winget validate ..."
  winget validate --manifest "$manifest_dir"

  if [ "${CHECK_WINGET_INSTALL:-0}" = "1" ]; then
    echo "check winget: running winget install (CHECK_WINGET_INSTALL=1) ..."
    winget install --manifest "$manifest_dir"
    echo "check winget: installed successfully."
  else
    echo "check winget: skipping \`winget install\` (set CHECK_WINGET_INSTALL=1 to run)"
  fi
else
  cat >&2 <<EOF
check winget: [3/3] SKIPPED — \`winget\` CLI is Windows-only.
  Run this script again on Windows (or in a Windows VM / GH Actions
  windows-latest runner) to execute:
      winget validate --manifest "$manifest_dir"
      winget install  --manifest "$manifest_dir"
  Schema-version + file-shape checks already passed locally.
EOF
fi

echo "check winget: OK"
