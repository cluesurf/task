# LibreOffice, Swift, and a handful of other tools only ship
# prebuilt amd64 binaries. Apple Silicon hosts run this image
# under emulation. The image tag itself locks the arch
# (`amd64/ubuntu`) so we don't need an explicit `--platform=` —
# BuildKit emits a RedundantTargetPlatform warning when both are
# set.
FROM amd64/ubuntu:noble

# `noble` = Ubuntu 24.04 LTS, the current LTS line. Next LTS
# (26.04) releases April 2026 — bump to `ubuntu:26.04` once it's
# tagged and our native-tool coverage is verified there.

# WORKDIR /root

ENV TERM=linux
ENV DEBIAN_FRONTEND=noninteractive

# Declare constants — we install Node via NodeSource rather than
# NVM, so NVM_VERSION is kept only for legacy callers and docs.
ENV NVM_VERSION=v0.40.4
ENV NODE_VERSION=24.14.1

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -y -q
RUN apt-get upgrade -y -q

RUN apt-get -y install build-essential
RUN apt-get -y install curl
RUN apt-get -y install exiftool
RUN apt-get -y install llvm-17
RUN apt-get -y install clang-17
RUN apt-get -y install clang-format-17
RUN apt-get -y install imagemagick

RUN apt-get update -y -q
RUN apt-get upgrade -y -q

RUN apt-get -y install fontforge
RUN apt-get -y install fonttools
RUN apt-get -y install woff2
RUN apt-get -y install libharfbuzz-bin
RUN apt-get -y install pandoc
RUN apt-get -y install texlive
RUN apt-get -y install texlive-xetex
RUN apt-get -y install texlive-luatex
RUN apt-get -y install texlive-extra-utils
# `make4ht` ships inside texlive-extra-utils on Ubuntu noble — no
# separate apt package. The binary lands at /usr/bin/make4ht.
RUN apt-get -y install ffmpeg
RUN apt-get -y install id3v2
RUN apt-get -y install ripgrep
RUN apt-get -y install fd-find
RUN ln -sf /usr/bin/fdfind /usr/local/bin/fd
RUN apt-get -y install libarchive-tools
RUN apt-get -y install inkscape
RUN apt-get -y install git
RUN apt-get -y install libreoffice
RUN apt-get -y install gnupg
RUN apt-get -y install gifsicle

# ── Extended image conversion ─────────────────────────────────────
# Raster ↔ vector
RUN apt-get -y install potrace

# autotrace was dropped from Ubuntu's main archive around the
# 24.04 (noble) release — the Debian package went unmaintained
# (https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=934554).
# Build from the upstream git tag instead. The auto-generated
# GitHub source archive is used (stable URL for every tag)
# rather than a release-asset tarball whose filename varies
# between releases. That means `configure` is not pre-built,
# so we run `./autogen.sh` (which wraps autoreconf + friends)
# as part of the build. Everything runs in a single `RUN` so
# the intermediate tree does not bloat the image layer.
# ── autotrace from source (not in Ubuntu apt) ─────────────────────
# Split into cached layers so tweaking configure flags doesn't
# re-download build deps.
ENV AUTOTRACE_VERSION=0.31.10

# 1. build deps (rarely changes → stays cached)
RUN apt-get -y install --no-install-recommends \
      build-essential pkg-config autoconf automake libtool libtool-bin \
      intltool gettext autopoint \
      libpng-dev libexif-dev libtiff-dev libjpeg-dev \
      libmagickcore-dev libmagickwand-dev \
      ca-certificates curl

# 2. download + unpack
RUN mkdir -p /tmp/autotrace-build \
  && curl -fsSL -o /tmp/autotrace-build/autotrace.tar.gz \
       "https://github.com/autotrace/autotrace/archive/refs/tags/${AUTOTRACE_VERSION}.tar.gz" \
  && tar -xzf /tmp/autotrace-build/autotrace.tar.gz -C /tmp/autotrace-build

# 3. configure (--without-pstoedit: pstoedit.h is C++ and can't
#    compile under gcc; we only need SVG/EPS output anyway)
RUN cd /tmp/autotrace-build/autotrace-${AUTOTRACE_VERSION} \
  && ./autogen.sh \
  && ./configure --prefix=/usr/local --without-pstoedit

# 4. compile + install
RUN cd /tmp/autotrace-build/autotrace-${AUTOTRACE_VERSION} \
  && make -j"$(nproc)" \
  && make install \
  && ldconfig

# 5. cleanup
RUN rm -rf /tmp/autotrace-build

RUN apt-get -y install librsvg2-bin
# RAW pipelines (dcraw + darktable-cli). rawtherapee-cli lands as
# `rawtherapee` on noble; the binary name is `rawtherapee-cli`.
RUN apt-get -y install dcraw
RUN apt-get -y install darktable
RUN apt-get -y install rawtherapee
# HDR (OpenEXR + pfstools for .hdr ↔ .exr). Radiance's `ra_tiff`
# isn't packaged for Ubuntu — pfstools covers the same conversions
# via `pfsin | pfsout`. On macOS, `brew tap hdri/radiance` gets it.
RUN apt-get -y install openexr
RUN apt-get -y install pfstools
# Animated image formats
RUN apt-get -y install apngasm
RUN apt-get -y install webp
# (libwebp ships `img2webp`, `cwebp`, `dwebp`.)

# ── PDF / PostScript tooling ──────────────────────────────────────
# task inspect pdf / convert document chains use pdftotext, pdfimages,
# pdfinfo (poppler-utils), mutool (mupdf-tools), and gs / ps2pdf
# (ghostscript). qpdf is a sibling PDF tool.
RUN apt-get -y install poppler-utils
RUN apt-get -y install mupdf-tools
RUN apt-get -y install ghostscript
RUN apt-get -y install qpdf

# ── Binary analysis ───────────────────────────────────────────────
# task disassemble / inspect binary route through radare2. rizin
# (radare2's fork) isn't in Ubuntu apt — available on macOS via
# `brew install rizin` and on Arch/Fedora, but skipped here.
RUN apt-get -y install radare2

# ── Postgres client tools ─────────────────────────────────────────
# psql + pg_dump for task {inspect,query,measure,backup,export} db.
RUN apt-get -y install postgresql-client

# ── Desktop notifications ─────────────────────────────────────────
# libnotify ships `notify-send` for `task run notify` on Linux.
RUN apt-get -y install libnotify-bin

# ── Kubernetes (task k8s ...) ─────────────────────────────────────
# kubectl from the official apt repo, plus stern for multi-pod logs.
RUN curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key \
      | gpg --dearmor -o /usr/share/keyrings/kubernetes-apt-keyring.gpg \
  && echo "deb [signed-by=/usr/share/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /" \
      | tee /etc/apt/sources.list.d/kubernetes.list \
  && apt-get update \
  && apt-get -y install kubectl
RUN curl -fsSL https://github.com/stern/stern/releases/download/v1.30.0/stern_1.30.0_linux_amd64.tar.gz \
      | tar -xz -C /usr/local/bin stern

# ── DigitalOcean (task do ...) ────────────────────────────────────
RUN curl -fsSL https://github.com/digitalocean/doctl/releases/download/v1.115.0/doctl-1.115.0-linux-amd64.tar.gz \
      | tar -xz -C /usr/local/bin doctl

# ── Slides: marp-cli ──────────────────────────────────────────────
# marp isn't in apt; install via npm globally. (Requires nodejs +
# npm from earlier in the file.) Used by convert/document/marp.
# Note: marp-cli pulls puppeteer for PDF/PPTX export, which wants
# Chromium — we already install google-chrome-stable further down.
# Run this npm install after Node lands; see "Install Node.js" block.

RUN apt-get -y install python3
RUN apt-get -y install golang
# Additional compile-target languages. Each is in noble's main repo
# so a single apt line is enough. Tools that aren't packaged for
# Ubuntu (zig, crystal, v, emscripten, wasm-pack) carry their own
# install-hint string in the CLI — users install them on demand.
RUN apt-get -y install kotlin
RUN apt-get -y install ghc
RUN apt-get -y install ocaml
RUN apt-get -y install nim
# Coq (proof assistant). `coq` pulls in `coqide` and friends —
# pick `coq-prover` if you want the headless variant only.
RUN apt-get -y install coq
# RUN apt-get -y install python3-full
RUN apt-get -y install rustc
RUN apt-get -y install rustfmt
# Extra formatters for `task format <lang>`. shfmt + asmfmt are
# installed via `go install` further down; ocamlformat sometimes
# packages with the ocaml meta-package, so the install is
# best-effort. zig fmt ships inside the zig binary — install hint
# covers it for hosts that don't bundle zig.
# google-java-format isn't in Ubuntu apt. Download the all-deps
# JAR and wrap it in a shell launcher.
RUN curl -fsSL -o /usr/local/lib/google-java-format.jar \
      "https://github.com/google/google-java-format/releases/download/v1.25.2/google-java-format-1.25.2-all-deps.jar" \
  && printf '#!/bin/sh\nexec java -jar /usr/local/lib/google-java-format.jar "$@"\n' \
      > /usr/local/bin/google-java-format \
  && chmod +x /usr/local/bin/google-java-format
RUN apt-get -y install ormolu
RUN apt-get -y install ocamlformat || true
# clang-tidy ships with llvm; symlink the versioned binary so the
# unversioned name resolves.
RUN ln -sf /usr/bin/clang-tidy-17 /usr/bin/clang-tidy 2>/dev/null || true
# Prettier + sql-formatter are installed via npm after Node lands
# (see the `npm install -g` block below the NodeSource install).
RUN apt-get -y install wget
RUN apt-get -y install gnupg
RUN apt-get -y install unoconv
RUN apt-get -y install ruby3.2
# `ruby3.2-dev` ships ruby.h and friends — required because some
# gems (rubocop pulls in `prism`) build C extensions on install.
RUN apt-get -y install ruby3.2-dev
RUN apt-get -y install rubygems-integration
RUN apt-get -y install calibre
RUN apt-get -y install wabt
RUN apt-get -y install unar
RUN apt-get -y install atool
RUN apt-get -y install p7zip-full
RUN apt-get -y install zip
RUN apt-get -y install unzip
RUN apt-get -y install zstd
RUN apt-get -y install xz-utils
RUN apt-get -y install bzip2
RUN apt-get -y install default-jdk-headless
RUN apt-get -y install maven

# Reinstall curl?
RUN apt-get update -y -q
RUN apt-get upgrade -y -q
RUN apt-get -y install curl

# Install Node.js via NodeSource. Pinned to the v24 LTS line
# (Krypton); `setup_24.x` tracks the latest v24 patch so rebuilds
# pick up security fixes automatically. NVM install line kept
# commented in case we need a runtime-managed install later.
# https://stackoverflow.com/questions/25899912/how-to-install-nvm-in-docker
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
RUN curl -sL https://deb.nodesource.com/setup_24.x | bash
RUN apt-get -y install nodejs
RUN npm install -g pnpm
# `tsc` for `task compile tsc` (type-check only mode).
RUN npm install -g typescript
# marp-cli for slide conversion (md → html/pdf/pptx).
RUN npm install -g @marp-team/marp-cli
# Formatters that ship via npm (moved here from the formatters
# section above so Node is on PATH).
RUN npm install -g prettier sql-formatter
# wrangler for Cloudflare R2 + Workers ops (task {inspect,list} worker / bucket).
RUN npm install -g wrangler

# Install swift dependencies
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install binutils
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install git
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install unzip
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install gnupg2
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libc6-dev
# RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libcurl4-openssl-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libedit2
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libgcc-11-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libpython3-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libsqlite3-0
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libstdc++-11-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libxml2-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libz3-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install pkg-config
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install python3-lldb
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install tzdata
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install zlib1g-dev
RUN rm -r /var/lib/apt/lists/*

# Install swift.
#
# We import the canonical keyring directly from swift.org rather
# than fetching by fingerprint from a keyserver — the Swift 5.x
# release key (A62AE125...925CC1CCED3D1561) expired in 2024-06,
# so any pinned fingerprint goes stale. The all-keys.asc bundle
# always contains the active signing key for whatever release
# stream we point SWIFT_PLATFORM/VERSION at.
#
# Bumped to Swift 6.0.3 on ubuntu24.04 (matches our `noble` base).
# Update SWIFT_VERSION to roll forward — both the .tar.gz and .sig
# come from `<SWIFT_WEBROOT>/<SWIFT_BRANCH>/<platform>/<SWIFT_VERSION>/`.
ARG SWIFT_PLATFORM=ubuntu24.04
ARG SWIFT_BRANCH=swift-6.0.3-release
ARG SWIFT_VERSION=swift-6.0.3-RELEASE
ARG SWIFT_WEBROOT=https://download.swift.org

# hadolint ignore=DL3008,DL3015
RUN set -e; \
    ARCH_NAME="$(dpkg --print-architecture)"; \
    case "${ARCH_NAME##*-}" in \
        'amd64') OS_ARCH_SUFFIX='' ;; \
        'arm64') OS_ARCH_SUFFIX='-aarch64' ;; \
        *) echo >&2 "error: unsupported architecture: '$ARCH_NAME'"; exit 1 ;; \
    esac; \
    SWIFT_WEBDIR="$SWIFT_WEBROOT/$SWIFT_BRANCH/$(echo "$SWIFT_PLATFORM" | tr -d .)$OS_ARCH_SUFFIX"; \
    SWIFT_BIN_URL="$SWIFT_WEBDIR/$SWIFT_VERSION/$SWIFT_VERSION-$SWIFT_PLATFORM$OS_ARCH_SUFFIX.tar.gz"; \
    SWIFT_SIG_URL="$SWIFT_BIN_URL.sig"; \
    export DEBIAN_FRONTEND=noninteractive; \
    apt-get -q update && apt-get -q install -y --no-install-recommends curl ca-certificates gnupg \
      && rm -rf /var/lib/apt/lists/*; \
    GNUPGHOME="$(mktemp -d)"; export GNUPGHOME; \
    # Pull the live keyring from swift.org instead of trusting a
    # baked-in fingerprint — that way we automatically get the new
    # signing key when Apple rotates it.
    curl -fsSL https://swift.org/keys/all-keys.asc | gpg --batch --quiet --import -; \
    curl -fsSL "$SWIFT_BIN_URL" -o swift.tar.gz; \
    curl -fsSL "$SWIFT_SIG_URL" -o swift.tar.gz.sig; \
    gpg --batch --verify swift.tar.gz.sig swift.tar.gz; \
    tar -xzf swift.tar.gz --directory / --strip-components=1; \
    chmod -R o+r /usr/lib/swift; \
    rm -rf "$GNUPGHOME" swift.tar.gz.sig swift.tar.gz; \
    apt-get purge --auto-remove -y curl gnupg

# RUN source ~/.nvm/nvm.sh; \
#   nvm install $NODE_VERSION; \
#   nvm use --delete-prefix $NODE_VERSION; \
#   npm install -g pnpm

# Setup python virtual environment
RUN apt-get update -y -q
RUN apt-get upgrade -y -q
RUN apt-get -y install software-properties-common
RUN apt-get -y install python3.12-venv
# RUN wget https://www.python.org/ftp/python/3.9.16/Python-3.9.16.tar.xz
# RUN tar -xf Python-3.9.16.tar.xz
# RUN cd Python-3.9.16 && ./configure --enable-optimizations --enable-shared \
#   && make -j 6 \
#   && make altinstall \
# RUN ldconfig Python-3.9.16
# RUN python3.9 --version
RUN mkdir -p /home/python
RUN python3 -m venv /home/python/venv
# RUN python3.9 -m venv /home/python/venv2

# Install python packages
RUN /home/python/venv/bin/pip install black
RUN /home/python/venv/bin/pip install "black[jupyter]"
RUN /home/python/venv/bin/pip install jill
# RUN /home/python/venv2/bin/pip install guesslang

# Install go packages
RUN go install github.com/klauspost/asmfmt/cmd/asmfmt@ef134b9cec704e2b7b336fb02153b7d1a58247da

# Install Bend (HVM-backed language). Builds via cargo from
# crates.io. The CUDA backend isn't required for `bend run`.
RUN cargo install bend-lang || echo "bend install failed — install manually with cargo install bend-lang"

# Install Julia via jill. The old `-c` short flag for "auto-confirm"
# was removed — use `--confirm` instead. We don't pin --preferred-arch
# because jill auto-detects the host arch (amd64 here, since the
# base image is amd64/ubuntu); forcing arm64 on an amd64 image
# would download a Julia tarball that can't execute.
RUN /home/python/venv/bin/jill install --confirm

# Install ruby formatter rubocop
RUN gem install rubocop

# Setup basic aliases
RUN rm /usr/bin/clang
RUN ln -s /usr/bin/clang-17 /usr/bin/clang
RUN ln -s /usr/bin/clang-format-17 /usr/bin/clang-format
RUN ln -s /usr/bin/llc-17 /usr/bin/llc
RUN ln -s /home/python/venv/bin/black /usr/bin/black
# RUN ln -s /home/python/venv2/bin/guesslang /usr/bin/guesslang

# Install swift formatter swift-format
# RUN wget -O swift-format.509.0.0.tar.gz https://github.com/apple/swift-format/archive/refs/tags/509.0.0.tar.gz
# RUN tar -xvzf swift-format.509.0.0.tar.gz
# RUN cd swift-format-509.0.0 && swift build -c release \
#   && cp /swift-format-509.0.0/.build/x86_64-unknown-linux-gnu/release/swift-format /usr/local/bin

# Install shell formatter shfmt
RUN go install mvdan.cc/sh/v3/cmd/shfmt@v3.7.0

# Install kotlin formatter ktfmt
RUN wget -O ktfmt.v0.46.tar.gz https://github.com/facebook/ktfmt/archive/refs/tags/v0.46.tar.gz
RUN tar -xvzf ktfmt.v0.46.tar.gz
RUN cd ktfmt-0.46 && mvn -B install --file pom.xml && mv ./core/target/ktfmt-0.46-jar-with-dependencies.jar /usr/local/bin

# Install objconv
RUN wget -O obvconv.v2.50.tar.gz https://github.com/gitGNU/objconv/archive/refs/tags/v2.50.tar.gz
RUN tar -xvzf obvconv.v2.50.tar.gz
RUN cd objconv-2.50/src && ./build.sh && mv objconv /usr/local/bin

# Label the container
LABEL org.opencontainers.image.source="https://github.com/cluesurf/task"
LABEL org.opencontainers.image.title="Task: A Function Registry"
LABEL org.opencontainers.image.description="A wrapper around a lot of tools to make it easier to use them all."

RUN /home/python/venv/bin/pip install antlr4-tools
RUN ln -s /home/python/venv/bin/antlr4-parse /usr/bin/antlr4-parse

RUN /home/python/venv/bin/pip install patool
RUN ln -s /home/python/venv/bin/patool /usr/bin/patool

RUN /home/python/venv/bin/pip install eyeD3
RUN ln -sf /home/python/venv/bin/eyeD3 /usr/bin/eyeD3

RUN apt-get install apt-transport-https
RUN wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/dart.gpg
RUN echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' | tee /etc/apt/sources.list.d/dart_stable.list
# Allow partial mirror failures — Ubuntu mirrors occasionally
# mid-sync and return mismatched sizes. `|| true` lets the build
# continue with whatever index DID download successfully.
RUN apt-get update -y -q || true
RUN apt-get -y install dart

RUN apt-get update -y -q || true
RUN apt-get -y install curl

RUN apt-get -y install php-cli
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
RUN HASH=`curl -sS https://composer.github.io/installer.sig` \
  && php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

RUN wget https://github.com/PHP-CS-Fixer/PHP-CS-Fixer/releases/download/v3.13.0/php-cs-fixer.phar -O php-cs-fixer
RUN chmod a+x php-cs-fixer
RUN mv php-cs-fixer /usr/local/bin/php-cs-fixer

RUN apt-get update
RUN apt-get -y install g++
RUN apt-get -y install make
RUN apt-get -y install cmake
RUN apt-get -y install unzip
RUN apt-get -y install libcurl4-openssl-dev
RUN apt-get -y install enscript

# Google Chrome for Puppeteer / marp-cli PDF export. Uses the
# modern signed-by keyring (apt-key is deprecated on noble).
RUN curl -fsSL https://dl.google.com/linux/linux_signing_key.pub \
      | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg
RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
      > /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update -y -q || true
RUN apt-get install -y --no-install-recommends google-chrome-stable
RUN apt-get install -y --no-install-recommends fonts-ipafont-gothic
RUN apt-get install -y --no-install-recommends fonts-wqy-zenhei
RUN apt-get install -y --no-install-recommends fonts-thai-tlwg
RUN apt-get install -y --no-install-recommends fonts-kacst
RUN apt-get install -y --no-install-recommends fonts-freefont-ttf
RUN apt-get install -y --no-install-recommends libxss1
RUN rm -rf /var/lib/apt/lists/*

# Install DuckDB CLI (for parquet <-> jsonl conversion)
RUN curl -L -o /tmp/duckdb.zip https://github.com/duckdb/duckdb/releases/download/v1.1.3/duckdb_cli-linux-amd64.zip \
  && unzip -q -o /tmp/duckdb.zip -d /usr/local/bin/ \
  && chmod +x /usr/local/bin/duckdb \
  && rm /tmp/duckdb.zip

# Install HuggingFace `hf` CLI (for dataset/model repo download + upload)
RUN /home/python/venv/bin/pip install huggingface_hub \
  && ln -sf /home/python/venv/bin/hf /usr/local/bin/hf

# yt-dlp — `task download video` (1500+ sites: YouTube, TikTok,
# Twitter/X, Vimeo, SoundCloud, Twitch). Pip install keeps the
# version current; yt-dlp ships releases ~weekly.
RUN /home/python/venv/bin/pip install yt-dlp
RUN ln -sf /home/python/venv/bin/yt-dlp /usr/local/bin/yt-dlp

# ── Observability / profiling / dev-loop tools ────────────────────
# samply: cross-platform Rust sampling profiler (`task profile cpu`)
RUN cargo install samply || true

# strace already ships in build-essential's deps; install explicitly
# so `task trace process` resolves it without a fresh apt query.
RUN apt-get update -y -q && apt-get -y install strace || true

# ── Network / TLS diagnostics ─────────────────────────────────────
# openssl ships in the base image; add explicit dnsutils (dig / host)
# and bind9-host for `task inspect dns` and the planned `task dns ...`
# verb family.
RUN apt-get -y install dnsutils || true
RUN apt-get -y install bind9-host || true

# ── Secret scanning (`task scan env`, `task scan secrets`) ────────
RUN curl -fsSL https://github.com/gitleaks/gitleaks/releases/latest/download/gitleaks_8.21.2_linux_x64.tar.gz \
      -o /tmp/gitleaks.tar.gz \
  && tar -xzf /tmp/gitleaks.tar.gz -C /tmp gitleaks \
  && mv /tmp/gitleaks /usr/local/bin/gitleaks \
  && rm /tmp/gitleaks.tar.gz

RUN curl -fsSL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh \
      | sh -s -- -b /usr/local/bin || true

# ── Pentest aggregator coverage (hackingtool integration) ─────────
# Network / port / service scanners
RUN apt-get -y install nmap || true
RUN apt-get -y install masscan || true
RUN apt-get -y install whatweb || true

# Subdomain / web crawlers
RUN go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest || true
RUN go install github.com/projectdiscovery/katana/cmd/katana@latest || true
RUN go install github.com/projectdiscovery/httpx/cmd/httpx@latest || true
RUN go install github.com/jaeles-project/gospider@latest || true
RUN go install github.com/ffuf/ffuf/v2@latest || true
RUN go install github.com/OJ/gobuster/v3@latest || true
RUN apt-get -y install dirb || true
RUN apt-get -y install wfuzz || true

# Web vulnerability scanners
RUN apt-get -y install nikto || true
RUN apt-get -y install wapiti || true
# wpscan is a Ruby gem
RUN apt-get -y install ruby-full || true
RUN gem install wpscan || true

# SQL injection
RUN apt-get -y install sqlmap || true

# Bruteforce / credential
RUN apt-get -y install hydra || true
RUN apt-get -y install john || true
RUN apt-get -y install hashcat || true
RUN apt-get -y install crunch || true
RUN apt-get -y install cewl || true

# Wireless suite (Linux-only)
RUN apt-get -y install aircrack-ng || true
RUN apt-get -y install reaver || true
RUN apt-get -y install pixiewps || true

# Packet capture / replay
RUN apt-get -y install tshark || true
RUN apt-get -y install tcpdump || true
RUN apt-get -y install tcpreplay || true

# OSINT / recon
RUN /home/python/venv/bin/pip install theHarvester || true
RUN ln -sf /home/python/venv/bin/theHarvester /usr/local/bin/theharvester || true
RUN /home/python/venv/bin/pip install maigret || true
RUN ln -sf /home/python/venv/bin/maigret /usr/local/bin/maigret || true
RUN /home/python/venv/bin/pip install sherlock-project || true
RUN ln -sf /home/python/venv/bin/sherlock /usr/local/bin/sherlock || true
RUN /home/python/venv/bin/pip install photon-py || true
RUN /home/python/venv/bin/pip install recon-ng || true
RUN /home/python/venv/bin/pip install bbot || true

# Forensics / file carving
RUN apt-get -y install binwalk || true
RUN apt-get -y install foremost || true
RUN apt-get -y install bulk-extractor || true
RUN apt-get -y install sleuthkit || true
RUN apt-get -y install yara || true

# Steganography
RUN apt-get -y install steghide || true
RUN apt-get -y install stegseek || true
RUN apt-get -y install outguess || true
RUN gem install zsteg || true

# Memory forensics
RUN /home/python/venv/bin/pip install volatility3 || true
RUN ln -sf /home/python/venv/bin/vol /usr/local/bin/vol || true

# MITM / proxies / pivot
RUN apt-get -y install bettercap || true
RUN apt-get -y install ettercap-text-only || true
RUN apt-get -y install proxychains4 || true
RUN apt-get -y install tor || true
RUN apt-get -y install mitmproxy || true

# Posture / hardening checkers (`task audit dev`)
RUN apt-get -y install lynis || true
RUN apt-get -y install chkrootkit || true
RUN apt-get -y install rkhunter || true

# SSH-side audit (`task scan ssh --tool ssh-audit`)
RUN /home/python/venv/bin/pip install ssh-audit || true
RUN ln -sf /home/python/venv/bin/ssh-audit /usr/local/bin/ssh-audit || true

# CVE / dependency scanners
RUN curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh \
      | sh -s -- -b /usr/local/bin || true
RUN curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh \
      | sh -s -- -b /usr/local/bin || true
RUN curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh \
      | sh -s -- -b /usr/local/bin || true
RUN curl -sSfL https://github.com/google/osv-scanner/releases/latest/download/osv-scanner_linux_amd64 \
      -o /usr/local/bin/osv-scanner && chmod +x /usr/local/bin/osv-scanner || true

# Frameworks (heavy — installed `|| true` so a transient package
# server hiccup doesn't fail the whole image build)
RUN apt-get -y install metasploit-framework || true

# Make all the Go-installed tools visible on PATH for the runtime.
ENV PATH=/root/go/bin:$PATH
