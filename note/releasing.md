# Releasing

End-to-end runbook for cutting a new `@cluesurf/task` release across
every channel.

A release ships **two layers**:

1. **Node CLI / library** → npm.
2. **Native toolchain metapackage** → 10 OS package managers
   (deb / rpm / arch / alpine / opensuse / gentoo / homebrew / winget
   / scoop / choco / nix) + Docker.

Both layers track the same version in `package.json`.

## One-time setup

Done once per maintainer machine. See each ecosystem's
`load/<...>/readme.md` → *Setup* for the full walkthrough.

| env var               | how to obtain                                           |
| --------------------- | ------------------------------------------------------- |
| `APT_SIGNING_KEY`     | `gpg --full-generate-key`; same key used for rpm + apt  |
| `APT_REPO_DIR`        | local clone of `cluesurf/apt-code` (GitHub Pages repo)  |
| `RPM_REPO_DIR`        | local clone of `cluesurf/rpm-code`                      |
| `ALPINE_REPO_DIR`     | local clone of `cluesurf/apk-code`                      |
| `ABUILD_KEY`          | `abuild-keygen -a -i -n` → `~/.abuild/<email>-<n>.rsa`  |
| `AUR_REMOTE`          | `ssh://aur@aur.archlinux.org/cluesurf-task.git`         |
| `OBS_PROJECT`         | `home:cluesurf` on build.opensuse.org                   |
| `GENTOO_OVERLAY_DIR`  | local clone of `cluesurf/gentoo-overlay`                |
| `SCOOP_BUCKET_DIR`    | local clone of `cluesurf/scoop-bucket`                  |
| `WINGET_PKGS_DIR`     | local fork of `microsoft/winget-pkgs`                   |
| `CHOCO_API_KEY`       | community.chocolatey.org → My Account → API Key         |
| `NPM_TOKEN`           | `npm login` (or set in CI)                              |
| `GITHUB_TOKEN`        | `gh auth login` (used for releases + winget PR)         |

Persist these in your shell profile.

## Per-release flow

### 1. Bump the version

```sh
cd deck/task
pnpm version <patch|minor|major>     # writes package.json + commits + tags
./load/sync-versions.sh              # propagates to every non-templated file
```

`pnpm version` updates `package.json` and creates a git tag.
`sync-versions.sh` then mirrors that version into the few places
the build templates can't (the homebrew Cask's hand-edited
`version` line, `chocoVersion` in `package.json`).

Every other manifest (deb / rpm / arch / alpine / scoop / winget /
choco / nix) reads the version straight from `package.json` via
`load/shared/meta.sh` — no manual sync needed.

### 2. Build everything locally

```sh
pnpm install
pnpm test                  # node + browser + cli
pnpm make                  # tsc compile to host/
```

Verify the CLI works:

```sh
./host/code/console.js convert test/fixtures/sample.png /tmp/sample.jpg
```

### 3. Publish the Node CLI to npm

```sh
pnpm publish --access=public
```

Tagged from `package.json`'s version. Uses your `~/.npmrc` token.

### 4. Build + push the Docker image

```sh
docker build --platform linux/amd64 -t ghcr.io/cluesurf/task:$(node -p "require('./package.json').version") .
docker tag  ghcr.io/cluesurf/task:$(node -p "require('./package.json').version") ghcr.io/cluesurf/task:latest
docker push ghcr.io/cluesurf/task:$(node -p "require('./package.json').version")
docker push ghcr.io/cluesurf/task:latest
```

### 5. Build every native package

```sh
cd load
./make.sh             # everything the host can build natively
./linux/docker-build.sh    # the Linux formats your host can't build natively
```

Artifacts land in `load/<ecosystem>/dist/`.

### 6. Tag + push the GitHub release

```sh
cd ../..    # repo root
git push --follow-tags
gh release create v$(node -p "require('deck/task/package.json').version") \
  --generate-notes \
  deck/task/load/windows/winget/dist/cluesurf-task.zip
```

The winget stub zip **must** be a release asset — `load/windows/winget/make.sh`
already wires `InstallerUrl` to `releases/download/v<ver>/cluesurf-task.zip`.

### 7. Publish to every package manager

```sh
cd deck/task/load
./publish.sh
```

Or one at a time while you're verifying:

```sh
./publish.sh deb
./publish.sh rpm
./publish.sh arch
./publish.sh alpine
./publish.sh opensuse
./publish.sh gentoo
./publish.sh scoop
./publish.sh winget       # opens the winget-pkgs PR via gh
./publish.sh choco        # Windows host required
./publish.sh nix          # just tags the repo
```

What each does → `load/readme.md` table.

### 8. Push the Homebrew cask

`sync-versions.sh` already bumped the cask's `version` line in
step 1. Just commit + push:

```sh
cd deck/homebrew-code
git add Casks/task.rb && git commit -m "task $(node -p "require('../task/package.json').version")" && git push
```

Users now `brew upgrade --cask task` to pick it up.

### 9. Smoke-test the published artifacts

Spin up a clean container per platform and run the documented install
commands from `note/install.md`. Catches typos in the publishing
configs before users do.

```sh
docker run --rm -it ubuntu:24.04 bash -c "apt update && apt install -y curl gnupg && \
  curl -fsSL https://cluesurf.github.io/apt-code/pubkey.asc | gpg --dearmor -o /usr/share/keyrings/cluesurf.gpg && \
  echo 'deb [signed-by=/usr/share/keyrings/cluesurf.gpg] https://cluesurf.github.io/apt-code stable main' > /etc/apt/sources.list.d/cluesurf.list && \
  apt update && apt install -y cluesurf-task"
```

Repeat for fedora/arch/alpine.

## Hotfix flow

Same as above, with `pnpm version patch`. Skip the npm step if only
a packaging fix is shipping (e.g. one distro's `Depends:` was wrong).

## CI

The runbook above is what a future GitHub Actions workflow will
automate. Until then it lives here. The publish scripts are designed
to be CI-idempotent: running `publish.sh deb` twice for the same
version is a no-op as long as the underlying repo dir is consistent.

## What not to forget

- Run `pnpm publish` **before** `gh release create`. The npm version
  has to be live when users hit the install commands in the release
  notes.
- The winget stub zip's `InstallerSha256` is computed at `make.sh`
  time. If you rebuild between `make.sh` and uploading the zip, the
  hash drifts — re-run `load/windows/winget/make.sh` after any
  change.
- Tag format is `v<version>` everywhere (`v0.5.0`, not `0.5.0`).
  The Nix install URL and winget `InstallerUrl` both depend on it.
- Don't ship if `pnpm test` is red. Don't ship from a dirty working
  tree.
