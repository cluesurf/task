# Tier-1 image for binary analysis / inspection / disassembly.
#
# Covers: radare2, wabt (wasm tooling), objconv (from source),
# llvm-17 / clang-17 / clang-format / clang-tidy, exiftool.
# Target size: ≤ 700 MB.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      radare2 \
      wabt \
      llvm-17 \
      clang-17 \
      clang-format-17 \
      clang-tidy-17 \
      exiftool \
  && ln -sf /usr/bin/clang-17 /usr/bin/clang \
  && ln -sf /usr/bin/clang-format-17 /usr/bin/clang-format \
  && ln -sf /usr/bin/clang-tidy-17 /usr/bin/clang-tidy \
  && ln -sf /usr/bin/llc-17 /usr/bin/llc \
  && rm -rf /var/lib/apt/lists/*

# objconv from source — not in apt. Build once, discard sources.
RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends build-essential g++ make \
  && wget -O /tmp/objconv.tar.gz https://github.com/gitGNU/objconv/archive/refs/tags/v2.50.tar.gz \
  && tar -xzf /tmp/objconv.tar.gz -C /tmp \
  && cd /tmp/objconv-2.50/src \
  && ./build.sh \
  && mv objconv /usr/local/bin \
  && cd / \
  && rm -rf /tmp/objconv.tar.gz /tmp/objconv-2.50 \
  && apt-get purge -y --auto-remove build-essential g++ make \
  && apt-get install -y --no-install-recommends make \
  && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.title="Task Binary"
LABEL org.opencontainers.image.description="Binary analysis / disassembly for @cluesurf/task."
