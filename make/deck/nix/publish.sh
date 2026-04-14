#!/usr/bin/env bash
# Tag a release and push so users can `nix-build github:cluesurf/task`.
# No upstream registry — Nix consumes the repo directly.

set -euo pipefail

version=$(node -p "require('$(dirname "$0")/../../package.json").version")
tag="v$version"

cd "$(dirname "$0")/../.."

if git rev-parse "$tag" >/dev/null 2>&1; then
  echo "tag $tag already exists"
else
  git tag -a "$tag" -m "cluesurf-task $version"
  git push origin "$tag"
  echo "tagged + pushed $tag"
fi

cat <<EOF

Users now install with:

  nix-env -if "https://github.com/cluesurf/task/archive/$tag.tar.gz" \\
    -A default --argstr subpath deck/task/make/deck/nix

Or via flake:

  nix profile install "github:cluesurf/task/$tag?dir=deck/task/make/deck/nix"
EOF
