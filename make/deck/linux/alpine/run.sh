#!/usr/bin/env bash
# Run an Alpine command inside the cluesurf-task build image.
# Mounts the repo, .env, and (when present) ABUILD_KEY into the
# container. Use this when the host doesn't have `apk` / `abuild`
# (most macOS / Windows dev machines).
#
#   ./run.sh                              # interactive shell
#   ./run.sh ./make.sh                    # build the .apk
#   ./run.sh ./publish.sh                 # sign + index the repo
#   ./run.sh apk add --no-cache curl      # one-off apk command
#
# Required env (only for publish):
#   ABUILD_KEY        host path to abuild private key
#   ALPINE_REPO_DIR   host path for the repo output

set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../../../.." && pwd)"
image="cluesurf/alpine-build"

# Build the image if it isn't there yet. Quick no-op once it's
# cached locally.
if ! docker image inspect "$image" >/dev/null 2>&1; then
  echo "→ building $image (one-time)" >&2
  docker build -t "$image" "$here"
fi

# Auto-load .env so ABUILD_KEY / ALPINE_REPO_DIR don't have to be
# in the calling shell. `with-env.sh` exports any KEY=VALUE in the
# task package's .env and then exec's the rest of the args; here
# we just want the side effect of loading.
set -a
[ -f "$root/.env" ] && . "$root/.env"
set +a

mounts=(
  -v "$root:/work"
  -w "/work/make/deck/linux/alpine"
)

# Mount the abuild private key + its sibling .pub if the user
# pointed ABUILD_KEY at one. Keys go in /keys read-only — the
# container resolves $ABUILD_KEY relative to that path.
if [ -n "${ABUILD_KEY:-}" ]; then
  key_dir="$(dirname "$ABUILD_KEY")"
  key_name="$(basename "$ABUILD_KEY")"
  mounts+=(-v "$key_dir:/keys:ro" -e "ABUILD_KEY=/keys/$key_name")
fi

# Mount the host repo output dir straight through so `publish.sh`
# can write the signed APKINDEX into it.
if [ -n "${ALPINE_REPO_DIR:-}" ]; then
  mkdir -p "$ALPINE_REPO_DIR"
  mounts+=(-v "$ALPINE_REPO_DIR:/repo" -e "ALPINE_REPO_DIR=/repo")
fi

# Pass any other env vars publish.sh may want.
for var in APT_SIGNING_KEY RPM_REPO_DIR APT_REPO_DIR; do
  [ -n "${!var:-}" ] && mounts+=(-e "$var=${!var}")
done

if [ $# -eq 0 ]; then
  exec docker run --rm -it "${mounts[@]}" "$image" bash
else
  exec docker run --rm -i "${mounts[@]}" "$image" "$*"
fi
