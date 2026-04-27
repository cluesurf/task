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

# eyeD3 (ID3 tag editor) and yt-dlp (`task download video`) are
# Python packages; install both into a venv so they don't
# collide with system Python. One install per RUN so changing
# one doesn't bust the other's layer cache.
RUN python3 -m venv /home/python/venv

RUN /home/python/venv/bin/pip install --no-cache-dir eyeD3
RUN ln -sf /home/python/venv/bin/eyeD3 /usr/local/bin/eyeD3

RUN /home/python/venv/bin/pip install --no-cache-dir yt-dlp
RUN ln -sf /home/python/venv/bin/yt-dlp /usr/local/bin/yt-dlp

LABEL org.opencontainers.image.title="Task Video"
LABEL org.opencontainers.image.description="Video / audio tooling for @cluesurf/task."
