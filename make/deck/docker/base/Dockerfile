# Tier-0 base image for @cluesurf/task workload containers.
#
# Carries Ubuntu + Node + pnpm + a small set of general-purpose CLI
# tools that every workload image needs. No native tools for any
# specific action live here — those go in the per-workload images
# that FROM this.
#
# Target size: ≤ 350 MB.
#
# Architecture note: LibreOffice, Swift, and some cloud tools only
# ship amd64 binaries, so workload images that pull those lock the
# tag to `amd64/ubuntu`. Base stays portable.
FROM ubuntu:noble

ENV TERM=linux
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_VERSION=24.14.1

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -y -q \
  && apt-get upgrade -y -q \
  && apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      wget \
      gnupg \
      git \
      jq \
      ripgrep \
      fd-find \
      unzip \
      zip \
      xz-utils \
      bzip2 \
      zstd \
      apt-transport-https \
      software-properties-common \
  && ln -sf /usr/bin/fdfind /usr/local/bin/fd \
  && rm -rf /var/lib/apt/lists/*

# Node 24 via NodeSource + pnpm + tsx globally. Every workload image
# runs TypeScript entry points through tsx or compiled JS; keeping
# Node here means workload images don't each re-install it.
RUN curl -sL https://deb.nodesource.com/setup_24.x | bash - \
  && apt-get install -y --no-install-recommends nodejs \
  && npm install -g pnpm tsx typescript \
  && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.source="https://github.com/cluesurf/task"
LABEL org.opencontainers.image.title="Task Base"
LABEL org.opencontainers.image.description="Shared base for @cluesurf/task workload images (Ubuntu + Node + common CLI)."
