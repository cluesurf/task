#!/usr/bin/env bash
#
# Bulk-install the native tools `@cluesurf/task` shells out to on
# Windows, via Chocolatey. Run from an elevated shell
# (git-bash / msys / WSL that has `choco` on PATH).
#
# The unified `cluesurf/task` choco package was rejected by the
# community, so each dep is installed directly.

set -euo pipefail

choco install libreoffice-fresh
choco install imagemagick
choco install fontforge
choco install ffmpeg
choco install miktex.install
choco install inkscape
choco install gifsicle
choco install golang
choco install python3
choco install rust
choco install ruby
choco install calibre
choco install unar
choco install maven
choco install llvm
choco install julia
choco install pandoc
choco install exiftool
choco install dart-sdk
choco install php
