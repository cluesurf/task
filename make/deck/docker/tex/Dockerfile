# Tier-1 image for LaTeX-based conversions.
#
# TeX Live is huge (~3 GB on its own). Kept in a dedicated image so
# documents that don't need LaTeX (90%+ of conversions) stay small.
# Covers: pdflatex, xelatex, lualatex, make4ht (via
# texlive-extra-utils).
# Target size: ≤ 3.5 GB.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      texlive \
      texlive-xetex \
      texlive-luatex \
      texlive-extra-utils \
  && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.title="Task TeX"
LABEL org.opencontainers.image.description="TeX Live toolchain for @cluesurf/task."
