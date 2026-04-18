# Task Docker images

`@cluesurf/task` ships as a set of container images. Most users
only need one: the kitchen-sink image at the root of this
directory, which carries every native tool task knows how to shell
out to. The per-workload images underneath are for deployments
that only need a subset and want smaller pulls + faster starts.

## Layout

```
make/deck/docker/
  Dockerfile                # kitchen sink — every tool task supports
  base/Dockerfile           # Tier-0 base (Ubuntu + Node + common CLI)
  image/Dockerfile          # imagemagick, webp, inkscape, autotrace, ...
  font/Dockerfile           # fontforge, fonttools, woff2, harfbuzz, ...
  pdf/Dockerfile            # poppler, mupdf, ghostscript, qpdf
  document/Dockerfile       # libreoffice, pandoc, calibre, marp, chrome
  tex/Dockerfile            # texlive (xetex, luatex, extras)
  video/Dockerfile          # ffmpeg, id3v2, eyeD3
  embed/Dockerfile          # huggingface_hub, duckdb, python venv
  email/Dockerfile          # node only; pure HTTP provider calls
  mutate/Dockerfile         # postgresql-client
  binary/Dockerfile         # radare2, wabt, llvm/clang, objconv, exiftool
  cloud/Dockerfile          # kubectl, stern, doctl, wrangler
  code/Dockerfile           # compilers for ~13 languages + formatters
```

## Two tiers

**Tier 0 — `task-base`.** Ubuntu noble + Node 24 + pnpm + tsx +
a small CLI toolkit (curl, wget, gnupg, git, jq, ripgrep, fd,
zip / unzip / xz / zstd / bzip2). No native tools for any
specific task action. Every portable Tier-1 image `FROM`s this.
Target size: **≤ 350 MB**.

**Tier 1 — per-workload images.** Each image adds only the native
tools its workload needs. Use these when pull time, disk cache
pressure, or update blast radius matter.

| Image | Adds | Target |
|---|---|---|
| task-base | Ubuntu + Node + common CLI | 350 MB |
| task-email | (nothing; pure Node) | 400 MB |
| task-mutate | postgresql-client | 450 MB |
| task-pdf | poppler-utils, mupdf-tools, ghostscript, qpdf | 500 MB |
| task-font | fontforge, fonttools, woff2, harfbuzz, ktfmt | 500 MB |
| task-cloud | kubectl, stern, doctl, wrangler | 500 MB |
| task-binary | radare2, wabt, llvm/clang, objconv, exiftool | 700 MB |
| task-video | ffmpeg, id3v2, eyeD3 | 700 MB |
| task-image | imagemagick, webp, inkscape, autotrace, dcraw, … | 800 MB |
| task-embed | python venv, huggingface_hub, duckdb | 2.5 GB |
| task-document | libreoffice, pandoc, calibre, marp, chrome | 3 GB |
| task-tex | texlive + xetex + luatex + extras | 3.5 GB |
| task-code | compilers + formatters for ~13 languages | 8 GB |
| **kitchen sink** (`Dockerfile` at this dir) | all of the above | 5–8 GB |

## Architecture notes

Most images `FROM` `task-base` and run on both `amd64` and
`arm64`. A few are **amd64-only** because an upstream tool only
ships amd64 binaries:

- `document/Dockerfile` — LibreOffice
- `code/Dockerfile` — Swift, Dart

Those Dockerfiles pin `FROM amd64/ubuntu:noble` and duplicate the
base-image boilerplate (Node + common CLI) rather than chaining
through the portable base. Apple Silicon hosts run them under
emulation.

## Shared from-source builds

A few tools aren't in apt and must be built from source:

| Tool | Used by |
|---|---|
| autotrace | image |
| objconv | binary |
| ktfmt | font |
| google-java-format | code |
| bend-lang (cargo) | code |

Each image builds only its own. If a future workload shares a
from-source tool, factor out a dedicated builder stage that
multiple images can `COPY --from=...`.

## Build

From the repo root:

```sh
# Kitchen sink (default; carries every tool).
docker build -f make/deck/docker/Dockerfile -t ghcr.io/cluesurf/task:latest .

# Base + one workload (example: image).
docker build -f make/deck/docker/base/Dockerfile -t ghcr.io/cluesurf/task-base:latest .
docker build -f make/deck/docker/image/Dockerfile -t ghcr.io/cluesurf/task-image:latest .
```

Per-workload images depend on `task-base`. Build and publish
`task-base` first so the Tier-1 `FROM` line resolves.

## Size budget

Each image has a target. If a PR pushes a size past the target:

- prefer `--no-install-recommends` and explicit package lists
- purge build-only deps inside the same `RUN` that used them
- move from-source builds to a shared builder stage if multiple
  images need them
- split the image if the overage is structural

## When to use which

- **Running `@cluesurf/task` locally / in a dev container** — use
  the **kitchen sink**. One pull, every action works.
- **Running task as a dedicated worker for one workload class**
  (image resize, email send, document convert) — use the matching
  **Tier-1 image**. Faster starts, smaller disk footprint, narrower
  patch surface.
- **Mixing workloads in one process** — use the kitchen sink
  unless you've identified which Tier-1 images cover your actual
  workload set.
