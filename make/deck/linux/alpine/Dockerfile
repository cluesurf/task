# Reusable Alpine build/publish environment for the cluesurf-task
# package. The host (macOS, Windows, any Linux without `apk`) gets
# a working `apk`, `abuild`, `abuild-sign`, and `apk index` by
# shelling into this image.
#
# Build it once:
#   docker build -t cluesurf/alpine-build make/deck/linux/alpine
#
# Then the convenience wrapper at `./run.sh` mounts the repo and
# .env into the container and execs whatever command you pass.

FROM alpine:3.20

# `alpine-sdk` pulls in abuild + the gcc toolchain. `bash` lets us
# reuse the same shell helpers (`shared/meta.sh`, `render.sh`) the
# rest of make/deck/ is written in. `sudo` is a hard requirement
# of abuild — it refuses to run as root and refuses to run without
# being able to escalate for `apk add`.
RUN apk add --no-cache \
        bash \
        coreutils \
        findutils \
        nodejs \
        sudo \
        alpine-sdk \
        gnupg \
        ca-certificates

# abuild won't run as root. Create a `build` user, drop them into
# the abuild group (so they can write to /var/cache/distfiles + the
# package tree), and give passwordless sudo for `apk add` during
# dependency resolution.
RUN adduser -D -s /bin/bash build \
 && addgroup build abuild \
 && echo 'build ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/build

# Mount points the wrapper script populates at `docker run` time:
#   /work     project root (read-write so dist/ can be written back)
#   /keys     directory containing $ABUILD_KEY + .pub
#   /repo     output dir for `apk index` / `abuild-sign`
WORKDIR /work
USER build

# Generate a throwaway packager keypair so `abuild` has something
# to sign intermediate `.apk` files with during the build. The
# real publish-time signature uses the user's $ABUILD_KEY mounted
# at /keys (handled by run.sh).
RUN abuild-keygen -a -i -n

# Drop into bash by default; the wrapper passes the actual command.
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["bash"]
