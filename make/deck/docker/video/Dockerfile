# Tier-1 image for task video / audio actions.
#
# Covers: ffmpeg convert, trim, concat, frame extract, thumbnail
# sheet, subtitle convert, audio metadata (id3v2 / eyeD3).
# Target size: ≤ 700 MB.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      ffmpeg \
      id3v2 \
      python3 \
      python3-venv \
  && rm -rf /var/lib/apt/lists/*

# eyeD3 (ID3 tag editor) is a Python package; install into a venv so
# it doesn't collide with system Python.
RUN python3 -m venv /home/python/venv \
  && /home/python/venv/bin/pip install --no-cache-dir eyeD3 \
  && ln -sf /home/python/venv/bin/eyeD3 /usr/local/bin/eyeD3

LABEL org.opencontainers.image.title="Task Video"
LABEL org.opencontainers.image.description="Video / audio tooling for @cluesurf/task."
