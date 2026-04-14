# Per-distro dependency lists for the cluesurf-task metapackage.
# The logical tool set (ffmpeg, imagemagick, pandoc, ...) lives in one
# place; each case below translates it into that distro's package
# names. When you add a tool: add a line to every case.
#
# Usage:
#   deps_for deb          # newline-separated list
#   deps_for deb ", "     # comma+space list
#   deps_for rpm " "      # space-separated list

deps_for() {
  local distro="$1" sep="${2:-$'\n'}"
  local -a d
  case "$distro" in
    deb)
      d=(
        build-essential curl wget git gnupg pkg-config exiftool
        llvm clang clang-format imagemagick fontforge fonttools woff2
        libharfbuzz-bin pandoc texlive texlive-xetex texlive-luatex
        texlive-extra-utils make4ht ffmpeg id3v2 ripgrep fd-find
        libarchive-tools inkscape libreoffice gifsicle python3
        python3-venv python3-pip golang rustc rustfmt cargo unoconv
        ruby rubygems calibre wabt unar atool p7zip-full zip unzip
        zstd xz-utils bzip2 default-jdk-headless maven nodejs npm
        qpdf poppler-utils mupdf-tools ghostscript
      ) ;;
    rpm)
      d=(
        gcc-c++ make curl wget git gnupg2 pkgconf-pkg-config
        perl-Image-ExifTool llvm clang clang-tools-extra
        ImageMagick fontforge python3-fonttools woff2-tools harfbuzz
        pandoc texlive-scheme-medium ffmpeg id3v2 ripgrep fd-find
        bsdtar inkscape libreoffice gifsicle python3 python3-pip
        golang rust rustfmt cargo unoconv ruby rubygems calibre wabt
        unar atool p7zip zip unzip zstd xz bzip2 java-latest-openjdk
        maven nodejs npm qpdf poppler-utils mupdf ghostscript
      ) ;;
    arch)
      d=(
        base-devel curl wget git gnupg pkgconf perl-image-exiftool
        llvm clang imagemagick fontforge python-fonttools
        woff2 harfbuzz-utils pandoc-cli texlive-most ffmpeg id3v2
        ripgrep fd libarchive inkscape libreoffice-fresh gifsicle
        python python-pip go rust unoconv ruby calibre wabt atool
        p7zip zip unzip zstd xz bzip2 jdk-openjdk maven nodejs npm
        qpdf poppler mupdf-tools ghostscript
      ) ;;
    alpine)
      d=(
        build-base curl wget git gnupg pkgconf exiftool llvm clang
        clang-extra-tools imagemagick fontforge py3-fonttools woff2
        harfbuzz-utils pandoc-cli texlive-full ffmpeg id3v2 ripgrep
        fd libarchive-tools inkscape libreoffice gifsicle python3
        py3-pip go rust cargo unoconv ruby calibre wabt atool
        p7zip zip unzip zstd xz bzip2 openjdk17-jdk maven nodejs
        qpdf poppler-utils mupdf-tools ghostscript
      ) ;;
    gentoo)
      d=(
        sys-devel/gcc net-misc/curl net-misc/wget dev-vcs/git
        app-crypt/gnupg dev-util/pkgconf media-libs/exiftool
        sys-devel/llvm sys-devel/clang media-gfx/imagemagick
        media-gfx/fontforge dev-python/fonttools media-libs/woff2
        media-libs/harfbuzz app-text/pandoc app-text/texlive
        media-video/ffmpeg media-sound/id3v2 sys-apps/ripgrep
        sys-apps/fd app-arch/libarchive media-gfx/inkscape
        app-office/libreoffice media-gfx/gifsicle dev-lang/python
        dev-python/pip dev-lang/go dev-lang/rust app-office/unoconv
        dev-lang/ruby app-text/calibre dev-util/wabt app-arch/unar
        app-arch/atool app-arch/p7zip app-arch/zip app-arch/unzip
        app-arch/zstd app-arch/xz-utils app-arch/bzip2
        virtual/jdk dev-java/maven-bin net-libs/nodejs app-text/qpdf
        app-text/poppler app-text/mupdf app-text/ghostscript-gpl
      ) ;;
    *)
      echo "unknown distro: $distro" >&2
      return 1 ;;
  esac
  local IFS="$sep"
  printf '%s' "${d[*]}"
}
