#!/usr/bin/env bash
# Make every version-bearing file in the repo match `package.json`.
#
# `package.json` is the single source of truth. Most distro
# manifests (deb / rpm / arch / alpine / gentoo / scoop / winget /
# choco) read it via make/deck/shared/meta.sh at build time, so they
# don't need a sync — `make.sh` will always render the right
# version. Files patched here are the few that aren't templated:
#
#   - package.json        (chocoVersion mirror)
#   - homebrew-code Cask  (hand-written `version "X.Y.Z"`)
#
# Run this after `pnpm version <bump>` and before `./publish.sh`.
#
# Optional first arg sets the version explicitly (skips reading
# package.json — useful in CI where you bump and sync atomically).

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../.." && pwd)"
cask="$(cd "$root/../homebrew-code" 2>/dev/null && pwd)/Casks/task.rb" \
  || cask=""

target="${1:-$(node -p "require('$root/package.json').version")}"
echo "syncing all packages to version $target"

# 1. package.json: mirror chocoVersion.
node -e '
  const fs = require("fs");
  const path = "'"$root"'/package.json";
  const pkg = JSON.parse(fs.readFileSync(path, "utf8"));
  pkg.version = "'"$target"'";
  pkg.chocoVersion = "'"$target"'";
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n");
'
echo "  ok  package.json"

# 2. Homebrew cask, if present in the sibling repo.
if [ -n "$cask" ] && [ -f "$cask" ]; then
  sed -i.bak -E 's/^([[:space:]]*version )"[^"]*"/\1"'"$target"'"/' "$cask"
  rm "$cask.bak"
  echo "  ok  $cask"
else
  echo "  skip homebrew cask (sibling repo not checked out)"
fi

# 3. Sanity check: every templated manifest will pick this up the
#    next time its make.sh runs. Confirm by re-rendering one.
echo
echo "verifying make/deck/shared/meta.sh resolves to $target..."
( source "$here/shared/meta.sh"
  got="$(meta_version)"
  if [ "$got" != "$target" ]; then
    echo "    mismatch: meta_version=$got" >&2
    exit 1
  fi
  echo "  ok  meta_version=$got" )

echo
echo "done. Now rebuild artifacts before publishing:"
echo "  ./make.sh"
