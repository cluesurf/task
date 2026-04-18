# Tier-1 image for database-adjacent actions.
#
# Covers: psql, pg_dump, schema inspect, query, dump, restore against
# Postgres. Other DB engines can be added behind additional apt
# packages (mysql-client, sqlite3, mongosh) as workloads require.
# Target size: ≤ 450 MB.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      postgresql-client \
  && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.title="Task Mutate"
LABEL org.opencontainers.image.description="Database / mutation tooling for @cluesurf/task."
