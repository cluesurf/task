# Alpine (APKBUILD → .apk)

Metapackage for Alpine Linux. Package name: `cluesurf-task`.

## Build

```sh
./make.sh
```

Requires `abuild` + `alpine-sdk` on the build host. From non-Alpine
hosts:

```sh
load/linux/docker-build.sh alpine
```

## Setup (one-time)

Generate an `abuild` signing key (Alpine doesn't reuse the apt/rpm
GPG key — it has its own RSA-based scheme):

```sh
sudo apk add abuild        # on Alpine
abuild-keygen -a -i -n     # creates ~/.abuild/<email>-<n>.rsa{,.pub}
```

`-i` installs the public key under `/etc/apk/keys/` so your local
machine trusts the resulting repo too. Note the path it printed —
that's `ABUILD_KEY`:

```sh
export ABUILD_KEY=~/.abuild/your-email-1234abcd.rsa
```

Pick a directory the repo lives in. As with deb/rpm, easiest setup
is a clone of `cluesurf/apk-code` (or whichever GitHub Pages repo
you host from):

```sh
git clone git@github.com:cluesurf/apk-code ~/cluesurf-apk
export ALPINE_REPO_DIR=~/cluesurf-apk
```

Back up the private key — losing it means rotating the key on every
end-user machine.

## Publish

```sh
ALPINE_REPO_DIR=/path/to/output-repo \
ABUILD_KEY=~/.abuild/your-email-1234abcd.rsa \
./publish.sh
```

Generates `APKINDEX.tar.gz`, signs it, and copies the matching
`.rsa.pub` next to it so end users can fetch it.

## Install (end user)

```sh
echo https://cluesurf.github.io/task/apk | doas tee -a /etc/apk/repositories
doas wget -O /etc/apk/keys/cluesurf.rsa.pub https://cluesurf.github.io/task/apk/cluesurf.rsa.pub
doas apk update && doas apk add cluesurf-task
```

## What ships in the .apk

- The rendered `APKBUILD`'s metadata (`pkgname`, `pkgver`, `depends`).
  No `package()` body, no files.

`make.sh`, the template, and the `.rsa` private key stay local.

## Notes

- Alpine's userland is `busybox` — some tools behave subtly
  differently from their glibc counterparts. `texlive-full` is huge;
  consider a slimmer subset if image size matters.
- Node runs on Alpine but `@cluesurf/task`'s puppeteer and
  libreoffice code paths drag in a lot of shared libs. The Alpine
  build is best used for CI scratch images, not desktops.
