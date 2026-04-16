# Packaging

Per-ecosystem builds of the `@cluesurf/task` native-toolchain
metapackage.

```
make/deck/
  shared/          metadata + template renderer (used by all)
  linux/           per-distro: deb, rpm, arch, alpine, gentoo, opensuse
  windows/         per-manager: winget, scoop, choco
  nix/             cross-platform derivation (Linux + macOS + WSL)
  make.sh          top-level builder
  publish.sh       top-level publisher
```

Every subdir follows the same convention:

```
<ecosystem>/
  make.sh       build the artifact (uses ../shared/ + per-OS deps.sh)
  publish.sh    push the artifact to the right place
  template/     manifest source with __TOKEN__ placeholders
  readme.md     per-ecosystem details
  dist/         build output (gitignored)
```

## Build

```sh
./make.sh             # build every format with an available tool
./make.sh deb rpm     # just the listed ones
./make.sh --list      # preview what would build vs skip
```

Cross-build the Linux formats from macOS / any Docker host:

```sh
./linux/docker-build.sh           # every Linux format in its container
./linux/docker-build.sh deb rpm   # just the listed ones
```

## Publish

Every ecosystem has a `publish.sh`. The top-level dispatcher runs
them in turn:

```sh
./publish.sh             # publish every ecosystem
./publish.sh deb scoop   # just the listed ones
```

Each script is configured via env vars and fails fast if anything
required is missing. Set everything once in your shell profile (or
in CI secrets) and re-run.

| ecosystem | path                          | required env                                                                      | what `publish.sh` does                                                          |
| --------- | ----------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| deb       | [linux/deb](./linux/deb)            | `APT_REPO_DIR`, `APT_SIGNING_KEY`                                                 | Builds a signed apt repo tree under `APT_REPO_DIR`                              |
| rpm       | [linux/rpm](./linux/rpm)            | `RPM_REPO_DIR`, `APT_SIGNING_KEY`                                                 | `createrepo_c` + `gpg --detach-sign` over `RPM_REPO_DIR`                        |
| arch      | [linux/arch](./linux/arch)          | `AUR_REMOTE`                                                                      | `git push` PKGBUILD + `.SRCINFO` to the AUR repo                                |
| alpine    | [linux/alpine](./linux/alpine)      | `ALPINE_REPO_DIR`, `ABUILD_KEY`                                                   | `apk index` + `abuild-sign` into `ALPINE_REPO_DIR`                              |
| opensuse  | [linux/opensuse](./linux/opensuse)  | `OBS_PROJECT`, `OBS_PACKAGE`                                                      | `osc commit` of the rendered spec                                               |
| gentoo    | [linux/gentoo](./linux/gentoo)      | `GENTOO_OVERLAY_DIR`, `GENTOO_CATEGORY`                                           | `git push` ebuild into your overlay repo                                        |
| scoop     | [windows/scoop](./windows/scoop)    | `SCOOP_BUCKET_DIR`                                                                | `git push` manifest into your bucket repo                                       |
| winget    | [windows/winget](./windows/winget)  | `WINGET_PKGS_DIR`                                                                 | Stages manifests into your `winget-pkgs` fork, pushes branch, opens PR via `gh` |
| choco     | [windows/choco](./windows/choco)    | `CHOCO_API_KEY`, `CHOCO_SOURCE`                                                   | `choco push` the nupkg                                                          |
| nix       | [nix](./nix)                        | —                                                                                 | `git tag` + push so users can `nix-build github:cluesurf/task`                   |

After publishing, hosting the static repos (deb, rpm, alpine) over
HTTPS — GitHub Pages or any object store — is enough. End-user
install snippets live in each subdir's `readme.md`.

## Shared

Everything OS-agnostic lives in [`shared/`](./shared):

- [`meta.sh`](./shared/meta.sh) — package name, version (from
  `package.json`), description, homepage, license, maintainer.
- [`render.sh`](./shared/render.sh) — `__TOKEN__` substitution used
  by every `make.sh`.

Per-OS dep lists live next to each family:

- [`linux/shared/deps.sh`](./linux/shared/deps.sh) — deb / rpm /
  arch / alpine / gentoo
- [`windows/shared/deps.sh`](./windows/shared/deps.sh) — choco /
  scoop / winget

Adding a new tool: update both `deps.sh` files (one line per
manager) and rebuild the affected packages.

## macOS

macOS uses the Homebrew cask at
[`@cluesurf/homebrew-code/Casks/task.rb`](https://github.com/cluesurf/homebrew-code/blob/make/Casks/task.rb),
which mirrors the same canonical tool set.
