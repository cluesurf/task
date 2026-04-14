# cluesurf-task — Nix metapackage.
#
# Builds a user environment with every native CLI @cluesurf/task
# shells out to: ffmpeg, ImageMagick, pandoc, libreoffice, qpdf,
# fontforge, HarfBuzz, unar, atool, and so on. The Node CLI itself
# is a separate npm install (pnpm add -g @cluesurf/task).
#
# Works on Linux + macOS + WSL — same derivation, no per-distro
# variants.
#
# Usage:
#   nix-build .                # builds the env into ./result
#   nix-env -f . -i            # installs into your nix profile
#   nix shell -f . --command bash   # ad-hoc shell with every tool

{ pkgs ? import <nixpkgs> {} }:

let
  name = "cluesurf-task";

  tools = with pkgs; [
    # toolchain
    git curl wget gnupg pkg-config
    llvm clang

    # languages / runtimes
    nodejs pnpm python3 python3Packages.pip
    go rustc cargo rustfmt ruby openjdk maven julia-bin dart php

    # media
    libreoffice imagemagick ffmpeg inkscape gifsicle
    calibre pandoc qpdf ghostscript poppler_utils mupdf

    # typesetting
    texlive.combined.scheme-medium

    # fonts
    fontforge python3Packages.fonttools woff2 harfbuzz

    # archives
    p7zip zip unzip zstd xz bzip2 unar atool libarchive

    # misc
    exiftool ripgrep fd wabt duckdb id3v2
  ];
in
pkgs.buildEnv {
  inherit name;
  paths = tools;
  meta = with pkgs.lib; {
    description = "Native tool dependencies for @cluesurf/task";
    homepage = "https://github.com/cluesurf/task";
    license = licenses.mit;
    platforms = platforms.linux ++ platforms.darwin;
  };
}
