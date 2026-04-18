# Tier-1 image for task image/raster/vector actions.
#
# Covers: convert image, optimize image, resize/crop/rotate,
# raster ↔ vector, animated image formats, RAW pipelines, HDR.
# Target size: ≤ 800 MB.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive
ENV AUTOTRACE_VERSION=0.31.10

RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      imagemagick \
      webp \
      potrace \
      librsvg2-bin \
      inkscape \
      dcraw \
      darktable \
      rawtherapee \
      openexr \
      pfstools \
      apngasm \
      gifsicle \
      exiftool \
  && rm -rf /var/lib/apt/lists/*

# autotrace is no longer in apt (Debian package unmaintained since
# ~24.04). Build from upstream git tag. Everything in one RUN so the
# build tree doesn't bloat the layer.
RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      build-essential pkg-config autoconf automake libtool libtool-bin \
      intltool gettext autopoint \
      libpng-dev libexif-dev libtiff-dev libjpeg-dev \
      libmagickcore-dev libmagickwand-dev \
  && mkdir -p /tmp/autotrace-build \
  && curl -fsSL -o /tmp/autotrace-build/autotrace.tar.gz \
       "https://github.com/autotrace/autotrace/archive/refs/tags/${AUTOTRACE_VERSION}.tar.gz" \
  && tar -xzf /tmp/autotrace-build/autotrace.tar.gz -C /tmp/autotrace-build \
  && cd /tmp/autotrace-build/autotrace-${AUTOTRACE_VERSION} \
  && ./autogen.sh \
  && ./configure --prefix=/usr/local --without-pstoedit \
  && make -j"$(nproc)" \
  && make install \
  && ldconfig \
  && cd / \
  && rm -rf /tmp/autotrace-build \
  && apt-get purge -y --auto-remove \
      build-essential pkg-config autoconf automake libtool libtool-bin \
      intltool gettext autopoint \
      libpng-dev libexif-dev libtiff-dev libjpeg-dev \
      libmagickcore-dev libmagickwand-dev \
  && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.title="Task Image"
LABEL org.opencontainers.image.description="Image / raster / vector tools for @cluesurf/task."
