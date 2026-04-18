# Tier-1 image for task font actions.
#
# Covers: font convert (ttf/otf/woff/woff2), inspect, subset, preview,
# shape, glyph extraction.
# Target size: ≤ 500 MB.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends \
      fontforge \
      fonttools \
      woff2 \
      libharfbuzz-bin \
  && rm -rf /var/lib/apt/lists/*

# ktfmt (Kotlin formatter) ships as a JAR. Build once via maven,
# drop into /usr/local/bin. Kept in the font image only because it
# shares JDK tooling used for font ops — move if a dedicated JVM
# formatter image makes sense later.
RUN apt-get update -y -q \
  && apt-get install -y --no-install-recommends default-jdk-headless maven \
  && wget -O /tmp/ktfmt.tar.gz https://github.com/facebook/ktfmt/archive/refs/tags/v0.46.tar.gz \
  && tar -xzf /tmp/ktfmt.tar.gz -C /tmp \
  && cd /tmp/ktfmt-0.46 \
  && mvn -B install --file pom.xml \
  && mv core/target/ktfmt-0.46-jar-with-dependencies.jar /usr/local/bin/ \
  && cd / \
  && rm -rf /tmp/ktfmt.tar.gz /tmp/ktfmt-0.46 \
  && rm -rf /var/lib/apt/lists/*

LABEL org.opencontainers.image.title="Task Font"
LABEL org.opencontainers.image.description="Font tooling for @cluesurf/task."
