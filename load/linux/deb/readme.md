# Debian / Ubuntu package

Metapackage that pulls in every native tool `@cluesurf/task` shells out
to (ffmpeg, imagemagick, pandoc, libreoffice, ...). Mirrors the macOS
cask at `deck/homebrew-code/Casks/task.rb` and the Chocolatey nuspec at
`load/choco/task.nuspec`.

Package name: `cluesurf-task`.

## Layout

```
load/linux/deb/
  make.sh          build the .deb
  publish.sh       build a signed apt repo from built .debs
  template/        DEBIAN control + hooks staged into the package
  dist/            build output (gitignored)
```

## Build

```sh
./make.sh
```

Produces `dist/cluesurf-task_<version>_all.deb`. Version tracks
`package.json`.

Requires `dpkg-deb` on the build host:

```sh
brew install dpkg                          # macOS
# or: load/linux/docker-build.sh deb       # any host with Docker
```

## Setup (one-time)

Generate a GPG signing key for the repo. The same key is reused for
the rpm and alpine repos — make it once.

```sh
gpg --full-generate-key      # RSA, 4096, no expiry, "ClueSurf APT" / lp@elk.fm
gpg --list-secret-keys --keyid-format=long
# copy the long key id (e.g. ABCD1234EF567890)

export APT_SIGNING_KEY=ABCD1234EF567890
```

Persist `APT_SIGNING_KEY` in your shell profile (or your CI secret
store). Back up the secret key:

```sh
gpg --export-secret-keys --armor "$APT_SIGNING_KEY" > ~/cluesurf-apt.key.asc
# stash this somewhere offline / in 1Password
```

Pick a directory the repo tree lives in. Easiest setup: a clone of
a `cluesurf/apt-code` GitHub Pages repo:

```sh
git clone git@github.com:cluesurf/apt-code ~/cluesurf-apt
export APT_REPO_DIR=~/cluesurf-apt
```

After publishing you `cd "$APT_REPO_DIR" && git add . && git commit
-am 'release' && git push` — Pages serves it at
`https://cluesurf.github.io/apt-code` (or whatever you renamed the
repo to).

## Publish

```sh
APT_REPO_DIR=/path/to/output-repo \
APT_SIGNING_KEY=<gpg-key-id> \
./publish.sh
```

Copies every `.deb` in `dist/` into `<output-repo>/pool/main/`, runs
`dpkg-scanpackages` to build `dists/stable/main/binary-all/Packages`
+ `Packages.gz`, and generates `Release` + a detached `InRelease`
signature with `gpg`.

Host the resulting tree over HTTPS. GitHub Pages is the simplest —
point `cluesurf/apt-code` (or whatever repo you host from) at the
tree and you're done.

## Install (end user)

```sh
# one-time trust of the repo signing key
curl -fsSL https://cluesurf.github.io/apt/pubkey.asc \
  | sudo gpg --dearmor -o /usr/share/keyrings/cluesurf.gpg

# register the repo
echo "deb [signed-by=/usr/share/keyrings/cluesurf.gpg] https://cluesurf.github.io/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/cluesurf.list

sudo apt update
sudo apt install cluesurf-task
```

## What ships in the .deb

- `DEBIAN/control` (rendered from `template/DEBIAN/control.in`) — the
  `Depends:` list is the entire payload of this metapackage.
- `DEBIAN/postinst` — pip + go installs that mirror the macOS cask.

That's it. No binaries, no `/usr/...` files. `make.sh` and the rest
of `template/` stay in the source tree.

## Notes

- Metapackage only. It installs no files of its own — its job is
  `Depends:`. The Node CLI itself is shipped via npm
  (`pnpm add -g @cluesurf/task`); this package is what makes that CLI
  work on a fresh Ubuntu.
- Swift is not in apt and is excluded. Users who need `task compile
  swift` follow swift.org's Ubuntu install. The Dockerfile does the
  same.
- `postinst` installs the Python and Go helper tools the homebrew
  cask's `postflight` block installs (black, nbconvert, docx2pdf,
  huggingface_hub, fonttools, asmfmt, shfmt). Failures are warned
  about but do not abort the apt install.
- Target distro is Ubuntu 24.04 (noble) and newer. Package names track
  that baseline — older releases may need local overrides.
