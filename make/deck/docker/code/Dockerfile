# Tier-1 image for compile / format / lint actions across languages.
#
# This is intentionally the heaviest workload image — it carries
# full compiler toolchains for many target languages. Most runtime
# workflows won't need it; route code-running / code-formatting
# queues here, leave everything else to the narrower images.
# Target size: ≤ 8 GB. amd64-only because Swift ships amd64.
FROM amd64/ubuntu:noble

ENV TERM=linux
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_VERSION=24.14.1

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Shared base tools (mirrors task-base; duplicated because this image
# is amd64-locked and cannot FROM the portable base).
RUN apt-get update -y -q \
  && apt-get upgrade -y -q \
  && apt-get install -y --no-install-recommends \
      ca-certificates curl wget gnupg git jq ripgrep fd-find \
      unzip zip xz-utils bzip2 zstd \
      apt-transport-https software-properties-common \
      build-essential pkg-config \
  && ln -sf /usr/bin/fdfind /usr/local/bin/fd \
  && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_24.x | bash - \
  && apt-get install -y --no-install-recommends nodejs \
  && npm install -g pnpm tsx typescript prettier sql-formatter \
  && rm -rf /var/lib/apt/lists/*

# ── Core compilers from apt ───────────────────────────────────────
RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      llvm-17 clang-17 clang-format-17 clang-tidy-17 \
      golang \
      rustc rustfmt \
      kotlin \
      ghc \
      ocaml ocamlformat \
      nim \
      coq \
      ruby3.2 ruby3.2-dev rubygems-integration \
      ormolu \
      python3 python3-venv \
      default-jdk-headless maven \
      php-cli \
      g++ make cmake \
  && ln -sf /usr/bin/clang-17 /usr/bin/clang \
  && ln -sf /usr/bin/clang-format-17 /usr/bin/clang-format \
  && ln -sf /usr/bin/clang-tidy-17 /usr/bin/clang-tidy \
  && ln -sf /usr/bin/llc-17 /usr/bin/llc \
  && rm -rf /var/lib/apt/lists/*

# ── Swift (amd64 tarball from swift.org) ──────────────────────────
ARG SWIFT_PLATFORM=ubuntu24.04
ARG SWIFT_BRANCH=swift-6.0.3-release
ARG SWIFT_VERSION=swift-6.0.3-RELEASE
ARG SWIFT_WEBROOT=https://download.swift.org

RUN set -e; \
    apt-get update -y -q \
    && apt-get install -y --no-install-recommends \
        binutils unzip libc6-dev libedit2 libgcc-11-dev libpython3-dev \
        libsqlite3-0 libstdc++-11-dev libxml2-dev libz3-dev pkg-config \
        python3-lldb tzdata zlib1g-dev; \
    SWIFT_WEBDIR="$SWIFT_WEBROOT/$SWIFT_BRANCH/$(echo "$SWIFT_PLATFORM" | tr -d .)"; \
    SWIFT_BIN_URL="$SWIFT_WEBDIR/$SWIFT_VERSION/$SWIFT_VERSION-$SWIFT_PLATFORM.tar.gz"; \
    SWIFT_SIG_URL="$SWIFT_BIN_URL.sig"; \
    GNUPGHOME="$(mktemp -d)"; export GNUPGHOME; \
    curl -fsSL https://swift.org/keys/all-keys.asc | gpg --batch --quiet --import -; \
    curl -fsSL "$SWIFT_BIN_URL" -o swift.tar.gz; \
    curl -fsSL "$SWIFT_SIG_URL" -o swift.tar.gz.sig; \
    gpg --batch --verify swift.tar.gz.sig swift.tar.gz; \
    tar -xzf swift.tar.gz --directory / --strip-components=1; \
    chmod -R o+r /usr/lib/swift; \
    rm -rf "$GNUPGHOME" swift.tar.gz.sig swift.tar.gz; \
    rm -rf /var/lib/apt/lists/*

# ── Dart (Google apt repo, amd64) ─────────────────────────────────
RUN wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub \
      | gpg --dearmor -o /usr/share/keyrings/dart.gpg \
  && echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' \
      > /etc/apt/sources.list.d/dart_stable.list \
  && apt-get update -y -q || true \
  && apt-get install -y --no-install-recommends dart \
  && rm -rf /var/lib/apt/lists/*

# ── PHP tooling (composer + php-cs-fixer) ─────────────────────────
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php \
  && php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer \
  && rm /tmp/composer-setup.php \
  && wget -O /usr/local/bin/php-cs-fixer \
      https://github.com/PHP-CS-Fixer/PHP-CS-Fixer/releases/download/v3.13.0/php-cs-fixer.phar \
  && chmod a+x /usr/local/bin/php-cs-fixer

# ── Python formatter (black) + Julia installer (jill) + Bend ──────
RUN python3 -m venv /home/python/venv \
  && /home/python/venv/bin/pip install --no-cache-dir \
      black "black[jupyter]" jill antlr4-tools \
  && ln -sf /home/python/venv/bin/black /usr/local/bin/black \
  && ln -sf /home/python/venv/bin/antlr4-parse /usr/local/bin/antlr4-parse \
  && /home/python/venv/bin/jill install --confirm

# ── Go-installed formatters ───────────────────────────────────────
RUN go install github.com/klauspost/asmfmt/cmd/asmfmt@ef134b9cec704e2b7b336fb02153b7d1a58247da \
  && go install mvdan.cc/sh/v3/cmd/shfmt@v3.7.0

# ── Ruby formatter ────────────────────────────────────────────────
RUN gem install rubocop

# ── google-java-format (JAR + shell launcher) ─────────────────────
RUN curl -fsSL -o /usr/local/lib/google-java-format.jar \
      "https://github.com/google/google-java-format/releases/download/v1.25.2/google-java-format-1.25.2-all-deps.jar" \
  && printf '#!/bin/sh\nexec java -jar /usr/local/lib/google-java-format.jar "$@"\n' \
      > /usr/local/bin/google-java-format \
  && chmod +x /usr/local/bin/google-java-format

# ── Bend (HVM-backed language via cargo) ──────────────────────────
RUN cargo install bend-lang || echo "bend install failed — install manually with cargo install bend-lang"

LABEL org.opencontainers.image.source="https://github.com/cluesurf/task"
LABEL org.opencontainers.image.title="Task Code"
LABEL org.opencontainers.image.description="Compiler / formatter toolchains for @cluesurf/task."
