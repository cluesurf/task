# Tier-1 image for task document / slides actions.
#
# Covers: LibreOffice conversions (doc/docx/odt/rtf), pandoc
# (markdown/html/rst/etc), calibre (ebook formats), marp-cli
# (markdown → html/pdf/pptx), Chrome for marp/puppeteer PDF export.
# Does NOT carry TeX Live — that lives in the tex image so document
# conversions that don't need LaTeX stay small.
# Target size: ≤ 3 GB. amd64-only because LibreOffice ships amd64.
FROM amd64/ubuntu:noble

ENV TERM=linux
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_VERSION=24.14.1

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Base shared tools (mirrors base image so this Dockerfile can be
# amd64-locked while keeping the same runtime).
RUN apt-get update -y -q \
  && apt-get upgrade -y -q \
  && apt-get install -y --no-install-recommends \
      ca-certificates curl wget gnupg git jq ripgrep fd-find \
      unzip zip xz-utils bzip2 zstd \
      apt-transport-https software-properties-common \
  && ln -sf /usr/bin/fdfind /usr/local/bin/fd \
  && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_24.x | bash - \
  && apt-get install -y --no-install-recommends nodejs \
  && npm install -g pnpm tsx typescript \
  && rm -rf /var/lib/apt/lists/*

# Document conversion toolchain.
RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      libreoffice \
      pandoc \
      calibre \
      unoconv \
      enscript \
  && rm -rf /var/lib/apt/lists/*

# marp-cli + prettier + sql-formatter ship as npm packages.
RUN npm install -g @marp-team/marp-cli prettier sql-formatter

# Google Chrome for marp / puppeteer PDF export.
RUN curl -fsSL https://dl.google.com/linux/linux_signing_key.pub \
      | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg \
  && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
      > /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -y -q || true \
  && apt-get install -y --no-install-recommends \
      google-chrome-stable \
      fonts-ipafont-gothic \
      fonts-wqy-zenhei \
      fonts-thai-tlwg \
      fonts-kacst \
      fonts-freefont-ttf \
      libxss1 \
  && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.source="https://github.com/cluesurf/task"
LABEL org.opencontainers.image.title="Task Document"
LABEL org.opencontainers.image.description="Document / slide conversion for @cluesurf/task."
