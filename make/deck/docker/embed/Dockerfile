# Tier-1 image for embedding / ML / data actions.
#
# Covers: HuggingFace CLI (dataset / model download + upload),
# DuckDB (parquet ↔ jsonl, SQL over local files), Python venv for
# ML-adjacent scripts.
# Target size: ≤ 2.5 GB. GPU variant (CUDA) can extend this later.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      python3 \
      python3-venv \
      python3-dev \
      build-essential \
  && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /home/python/venv \
  && /home/python/venv/bin/pip install --no-cache-dir \
      huggingface_hub \
  && ln -sf /home/python/venv/bin/hf /usr/local/bin/hf

# DuckDB CLI for parquet / jsonl / csv SQL.
RUN curl -fsSL -o /tmp/duckdb.zip \
      https://github.com/duckdb/duckdb/releases/download/v1.1.3/duckdb_cli-linux-amd64.zip \
  && unzip -q -o /tmp/duckdb.zip -d /usr/local/bin/ \
  && chmod +x /usr/local/bin/duckdb \
  && rm /tmp/duckdb.zip

LABEL org.opencontainers.image.title="Task Embed"
LABEL org.opencontainers.image.description="Embedding / ML / data tooling for @cluesurf/task."
