# Releasing

End-to-end runbook. **Everything is a `pnpm` command.** Walk down
the list, top to bottom.

A release ships **two layers**:

1. **Node CLI / library** → npm.
2. **Native toolchain metapackage** → 10 OS package managers
   (deb / rpm / arch / alpine / opensuse / gentoo / homebrew /
   winget / scoop / choco / nix) + Docker.

Both layers track the same version in `package.json`.

---

## One-time setup

Done once per maintainer machine. Account creation, key generation,
repo setup → [`accounts.md`](./accounts.md). All steps work from
macOS.

## Hosting model

Every Linux repo (apt, rpm, apk) lives in **one branch on this same
repo**, called `site`, under a `site/` folder served via GitHub
Pages:

```
cluesurf/task  (branch: site)
  site/
    apt/    →  https://cluesurf.github.io/task/apt
    rpm/    →  https://cluesurf.github.io/task/rpm
    apk/    →  https://cluesurf.github.io/task/apk
    pubkey.asc
```

Setup is documented in [`accounts.md` §2](./accounts.md). After the
first push to `site`, a Pages workflow auto-deploys.

`pnpm host:pkg` writes into `$APT_REPO_DIR` / `$RPM_REPO_DIR` /
`$ALPINE_REPO_DIR` (which point at `site/apt`, `site/rpm`,
`site/apk` inside a worktree of the `site` branch). Then you commit
+ push from that worktree to publish.

Other channels (AUR, AUR overlay, Scoop bucket, winget-pkgs fork,
Chocolatey feed, npm, ghcr.io) stay on their respective external
hosts.

---

## Per-release flow

### 1. Bump

```sh
pnpm version <patch|minor|major>     # commits + tags
pnpm sync:vers                       # propagates to non-templated files
```

`pnpm version` updates `package.json` and tags `vX.Y.Z`.
`pnpm sync:vers` mirrors that into the homebrew Cask's `version`
line and `chocoVersion`. Every other manifest reads `package.json`
at build time.

### 2. Build everything

```sh
pnpm release:build
```

Equivalent to:

```sh
pnpm test            # node + browser + cli
pnpm make            # tsc + tsc-alias
pnpm docker:build       # docker build (linux/amd64)
pnpm make:pkg        # every native package the host can build
pnpm make:pkg:linux  # the Linux formats your host can't build natively
```

Artifacts land under `load/<ecosystem>/dist/`.

### 3. Publish everything

```sh
pnpm release:host
```

Equivalent to:

```sh
pnpm host            # npm publish (the Node CLI)
pnpm docker:push       # docker push to ghcr.io
pnpm host:gh         # gh release create + upload winget zip
pnpm host:pkg        # publish.sh for every ecosystem
pnpm host:cask       # commit + push the homebrew Cask
```

### 4. Smoke-test

Prereqs:

- Docker Desktop running.
- For `test:smoke` (pulls `ghcr.io/cluesurf/task:latest`): if the
  image is private, run `pnpm docker:login` once.
- For `test:smoke:local`: nothing else — the script builds the
  local `Dockerfile` first.
- For `test:smoke:{apt,rpm,apk}`: the Pages site must already be
  live (i.e. you've completed step 3, the `site` branch was
  pushed, and the Pages workflow finished deploying — usually
  ~30s after push).

```sh
pnpm test:smoke           # against the latest published image + npm package
pnpm test:smoke:local     # against your local Dockerfile build
```

Defined in `test/Dockerfile.test`. Inherits from the production
image (`ghcr.io/cluesurf/task:latest` by default), installs the
published `@cluesurf/task` from npm, and runs a handful of real
conversions through different backends (imagemagick, pandoc,
qpdf). Exit 0 = the published npm CLI + native deps + dispatch
tables all line up.

Per-channel checks (each spins up a fresh container, registers the
hosted repo, installs `cluesurf-task`, asserts a sentinel binary
landed on PATH):

```sh
pnpm test:smoke:apt    # ubuntu:24.04 → apt repo
pnpm test:smoke:rpm    # fedora:latest → rpm repo
pnpm test:smoke:apk    # alpine:latest → apk repo
```

For Arch / openSUSE / Gentoo / Scoop / WinGet / Choco, no equivalent
one-liner — install the package by hand on a target machine when
debugging.

---

## All in one

```sh
pnpm release          # build + host (after pnpm version + pnpm sync:vers)
pnpm release:hotfix   # patch bump + sync + release
```

---

## One ecosystem at a time

While debugging or verifying, target a single channel:

```sh
pnpm host:pkg:deb
pnpm host:pkg:rpm
pnpm host:pkg:arch
pnpm host:pkg:alpine
pnpm host:pkg:opensuse
pnpm host:pkg:gentoo
pnpm host:pkg:scoop
pnpm host:pkg:winget
pnpm host:pkg:choco        # Windows host required
pnpm host:pkg:nix
```

Each runs the matching `load/<...>/publish.sh` and fails fast if any
required env var (see [`accounts.md`](./accounts.md)) is missing.

---

## Script reference

| pnpm script              | what it does                                              |
| ------------------------ | --------------------------------------------------------- |
| `pnpm version <bump>`    | bump `package.json`, commit, tag                          |
| `pnpm sync:vers`         | propagate version to Cask + `chocoVersion`                |
| `pnpm test`              | node + browser + cli tests                                |
| `pnpm make`              | tsc compile to `host/`                                    |
| `pnpm docker:build`         | `docker build` the linux/amd64 image                      |
| `pnpm make:pkg`          | build every native package the host supports              |
| `pnpm make:pkg:linux`    | docker-cross-build the Linux formats                      |
| `pnpm host`              | `npm publish --access=public`                             |
| `pnpm docker:push`         | `docker push ghcr.io/cluesurf/task:...`                   |
| `pnpm host:gh`           | `gh release create v$ver` + attach winget zip             |
| `pnpm host:pkg[:<eco>]`  | publish all (or one) native package                       |
| `pnpm host:cask`         | commit + push the homebrew Cask                           |
| `pnpm release:build`     | test + make + docker:build + make:pkg + make:pkg:linux       |
| `pnpm release:host`      | host + docker:push + host:gh + host:pkg + host:cask         |
| `pnpm release`           | release:build + release:host                              |
| `pnpm release:hotfix`    | `pnpm version patch && pnpm sync:vers && pnpm release`    |

---

## What not to forget

- Run `pnpm host` (npm) **before** `pnpm host:gh`. The npm version
  has to be live when users hit the install commands in the
  release notes.
- The winget stub zip's `InstallerSha256` is computed at `make.sh`
  time. If you rebuild between `make:pkg` and `host:gh`, the hash
  drifts — re-run `pnpm make:pkg` after any change.
- Tag format is `v<version>` everywhere (`v0.5.0`, not `0.5.0`).
  The Nix install URL and winget `InstallerUrl` both depend on it.
- Don't ship if `pnpm test` is red. Don't ship from a dirty working
  tree.

---

## CI

The runbook is what a future GitHub Actions workflow will automate.
The publish scripts are designed to be CI-idempotent: running
`pnpm host:pkg:deb` twice for the same version is a no-op as long
as the underlying repo dir is consistent.
