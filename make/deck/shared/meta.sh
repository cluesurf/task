# Shared metadata for every packaging format (linux, windows, nix,
# ...). Sourced by each per-ecosystem make.sh — do not run directly.

# Resolve the task package.json relative to this file so scripts
# work regardless of cwd.
__meta_here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__meta_root="$(cd "$__meta_here/../../.." && pwd)"

meta_name()         { echo "cluesurf-task"; }
meta_summary()      { echo "Native tool dependencies for @cluesurf/task"; }
meta_homepage()     { echo "https://github.com/cluesurf/task"; }
meta_maintainer()   { echo "ClueSurf <lp@elk.fm>"; }
meta_license()      { echo "MIT"; }
meta_version()      { node -p "require('$__meta_root/package.json').version"; }

meta_description() {
  cat <<'EOF'
Metapackage that installs every CLI @cluesurf/task shells out to:
ffmpeg, ImageMagick, pandoc, libreoffice, fontforge, fonttools, qpdf,
HarfBuzz, TeX Live, unar, atool, and friends.

The Node CLI itself is installed separately from npm
(pnpm add -g @cluesurf/task). This package provides only the
surrounding native toolchain.
EOF
}
