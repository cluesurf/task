# Tier-1 image for task pdf actions.
#
# Covers: inspect pdf, pdftotext, pdfimages, pdfinfo, ghostscript
# compression, qpdf split/merge/linearize, mutool flows.
# Target size: ≤ 500 MB.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      poppler-utils \
      mupdf-tools \
      ghostscript \
      qpdf \
  && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.title="Task PDF"
LABEL org.opencontainers.image.description="PDF / PostScript tooling for @cluesurf/task."
