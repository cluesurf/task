# Scoop bucket

Scoop is the closest "Homebrew on Windows" experience: user-space
install, per-app clean paths under `~/scoop`, JSON manifests that
natively support `depends`. Perfect for a metapackage.

Package id: `cluesurf-task`.

## Render the manifest

```sh
./make.sh
```

Writes `dist/cluesurf-task.json`.

## Setup (one-time)

Scoop reads manifests out of git repos called *buckets*. You need
your own bucket repo to publish to.

1. Create an empty repo on GitHub (e.g. `cluesurf/scoop-bucket`).

2. Clone it and seed the layout (scoop conventionally puts manifests
   in `bucket/`):

    ```sh
    git clone git@github.com:cluesurf/scoop-bucket ~/cluesurf-scoop
    cd ~/cluesurf-scoop
    mkdir -p bucket
    git add . && git commit --allow-empty -m "init bucket" && git push

    export SCOOP_BUCKET_DIR=~/cluesurf-scoop
    ```

No signing — scoop trusts the bucket by URL.

## Publish

```sh
SCOOP_BUCKET_DIR=~/cluesurf-scoop \
./publish.sh
```

`publish.sh` copies the rendered manifest into `<bucket>/bucket/`,
commits, and pushes.

## Install (end user)

```powershell
scoop bucket add cluesurf https://github.com/cluesurf/scoop-bucket
scoop install cluesurf-task
```

## What ships to the bucket

- One file: `bucket/cluesurf-task.json`. Scoop reads `depends` from
  it and resolves the rest from other buckets.

No payload, no `bin/`. Source-tree-only: `make.sh`, the template,
and `dist/`.

## Notes

- `depends` pulls in each dep via its own manifest — no extra work
  required. A couple of tools (`libreoffice`, `miktex`, `calibre`,
  `inkscape`, `fontforge`) live in the `extras` bucket, so the
  manifest prefixes those ids with `extras/`. Scoop auto-adds the
  bucket if needed.
- No `bin` field — this package installs no executables of its own.
  It exists purely to pull in its dependencies.
