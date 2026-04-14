# Per-manager dependency lists for the cluesurf-task metapackage on
# Windows. Mirrors load/linux/shared/deps.sh in structure — the
# canonical tool set is translated into choco / scoop / winget
# package ids.
#
# Usage:
#   deps_for choco "\n  "    # one <dependency> per line for nuspec
#   deps_for scoop ", "      # scoop depends array
#   deps_for winget "\n  - " # winget PackageDependencies list

deps_for() {
  local manager="$1" sep="${2:-$'\n'}"
  local -a d
  case "$manager" in
    choco)
      d=(
        git curl wget gnupg 7zip make llvm pkgconfiglite
        nodejs-lts python3 golang rustup.install ruby
        temurin maven julia dart-sdk php
        libreoffice-fresh imagemagick ffmpeg inkscape gifsicle
        calibre pandoc miktex.install qpdf ghostscript poppler
        fontforge exiftool ripgrep fd duckdb.install
      ) ;;
    scoop)
      d=(
        main/git main/curl main/wget main/gpg main/7zip main/make
        main/llvm main/pkg-config
        main/nodejs-lts main/python main/go main/rustup main/ruby
        java/temurin-jdk main/maven main/julia main/dart-sdk main/php
        extras/libreoffice extras/imagemagick main/ffmpeg
        extras/inkscape main/gifsicle extras/calibre main/pandoc
        extras/miktex main/qpdf main/ghostscript main/poppler
        extras/fontforge main/exiftool main/ripgrep main/fd
        main/duckdb
      ) ;;
    winget)
      d=(
        Git.Git cURL.cURL JernejSimoncic.Wget GnuPG.GnuPG 7zip.7zip
        GnuWin32.Make LLVM.LLVM bloodrock.pkg-config
        OpenJS.NodeJS.LTS Python.Python.3.12 GoLang.Go Rustlang.Rustup
        RubyInstallerTeam.Ruby EclipseAdoptium.Temurin.21.JDK
        Apache.Maven JuliaLang.Julia Google.DartSDK PHP.PHP
        TheDocumentFoundation.LibreOffice ImageMagick.ImageMagick
        Gyan.FFmpeg Inkscape.Inkscape KornelLesinski.Gifsicle
        calibre.calibre JohnMacFarlane.Pandoc MiKTeX.MiKTeX
        qpdf.qpdf ArtifexSoftware.GhostScript
        OliverBetz.Poppler FontForge.FontForge
        OliverBetz.ExifTool BurntSushi.ripgrep.MSVC sharkdp.fd
        DuckDB.cli
      ) ;;
    *)
      echo "unknown manager: $manager" >&2
      return 1 ;;
  esac
  local IFS="$sep"
  printf '%s' "${d[*]}"
}
