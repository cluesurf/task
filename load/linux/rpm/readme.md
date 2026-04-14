# RPM (Fedora, RHEL, Rocky, Alma, openSUSE)

Metapackage build for the RPM family. Package name: `cluesurf-task`.

## Build

```sh
./make.sh
```

Produces `dist/cluesurf-task-<version>-1.<dist>.noarch.rpm`. Requires
`rpmbuild` on the build host:

```sh
sudo dnf install rpm-build         # Fedora / RHEL
sudo zypper install rpm-build      # openSUSE
# or: load/linux/docker-build.sh rpm   # any host with Docker
```

## Setup (one-time)

Reuses the same GPG signing key as the apt repo — see
[deb/readme.md → Setup](../deb/readme.md#setup-one-time) to create
`APT_SIGNING_KEY` if you haven't yet.

Pick (or create) a directory the rpm repo tree lives in. Easiest
setup: a clone of a `cluesurf/rpm-code` GitHub Pages repo:

```sh
git clone git@github.com:cluesurf/rpm-code ~/cluesurf-rpm
export RPM_REPO_DIR=~/cluesurf-rpm
```

`createrepo_c` must be on the build host:

```sh
sudo dnf install createrepo_c       # Fedora / RHEL
brew install createrepo_c           # macOS
```

## Publish

```sh
RPM_REPO_DIR=/path/to/output-repo \
APT_SIGNING_KEY=<gpg-key-id> \
./publish.sh
```

After publishing, commit + push the repo dir so GitHub Pages serves
it at `https://cluesurf.github.io/rpm-code`.

## Install (end user)

```sh
sudo rpm --import https://cluesurf.github.io/rpm/pubkey.asc
sudo tee /etc/yum.repos.d/cluesurf.repo <<'EOF'
[cluesurf]
name=ClueSurf
baseurl=https://cluesurf.github.io/rpm
enabled=1
gpgcheck=1
gpgkey=https://cluesurf.github.io/rpm/pubkey.asc
EOF
sudo dnf install cluesurf-task      # or: sudo zypper install
```

## What ships in the .rpm

- The rendered `.spec` (`Name`, `Version`, `Requires:`) — that's the
  whole payload of this metapackage.
- `%files` is intentionally empty.

`make.sh`, the template, and `dist/rpmbuild/` stay in the source tree.

## openSUSE / OBS

The same `.spec` builds cleanly under the Open Build Service. See
[`../opensuse`](../opensuse) for the OBS publishing path.

## Notes

- Uses distro-generic package names (`ImageMagick`, `pandoc`,
  `texlive-scheme-medium`, ...). Package names vary between RHEL 9,
  Fedora rawhide, and openSUSE Leap — a couple of `Requires:` may
  need adjustment for the exact target.
- No `%files` entries — this is a pure metapackage whose job is
  `Requires:`. `rpmbuild` warns about the empty `%files`; that's
  expected.
