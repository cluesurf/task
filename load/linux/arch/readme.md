# Arch / Manjaro (PKGBUILD → AUR)

Metapackage for the Arch family. Package name: `cluesurf-task`.

## Build locally

```sh
./make.sh
```

Produces `dist/cluesurf-task-<version>-1-any.pkg.tar.zst`. Requires
`base-devel` (`makepkg`). From non-Arch hosts:

```sh
load/linux/docker-build.sh arch
```

Install the built package:

```sh
sudo pacman -U dist/cluesurf-task-*.pkg.tar.zst
```

## Setup (one-time)

The AUR is a git server; you push to it the same way you push to
GitHub. Steps:

1. Register an account at <https://aur.archlinux.org/register>.

2. Add your SSH public key under *My Account* → *SSH Public Key*.

3. Submit a placeholder package (the AUR refuses pushes to a name
   that doesn't exist yet). On the AUR site click *Submit* and
   paste the rendered `PKGBUILD` once. After the first push you can
   automate.

4. Set the remote so `publish.sh` can push:

    ```sh
    export AUR_REMOTE=ssh://aur@aur.archlinux.org/cluesurf-task.git
    ```

5. Make sure `~/.ssh/config` knows about the AUR host (saves typing
   user, port, and key path):

    ```
    Host aur.archlinux.org
      User aur
      IdentityFile ~/.ssh/id_ed25519
    ```

## Publish

```sh
AUR_REMOTE=ssh://aur@aur.archlinux.org/cluesurf-task.git \
./publish.sh
```

`publish.sh` clones the AUR repo, drops in the freshly rendered
`PKGBUILD`, regenerates `.SRCINFO`, and pushes. Users install with
an AUR helper:

```sh
yay -S cluesurf-task
paru -S cluesurf-task
```

## What ships to the AUR

- `PKGBUILD` (rendered) and `.SRCINFO` (regenerated). That's all the
  AUR ever stores — no built artifacts.

The built `.pkg.tar.zst` in `dist/` is just for local install/test;
the AUR rebuilds from `PKGBUILD` on each user's machine.

## Notes

- `arch=('any')` — metapackage, no compiled binaries.
- A few tools (`unar`, `unoconv`) live in the AUR rather than the
  official repos. If AUR-only deps cause the submission to fail
  AUR policy, split them out of `depends` into a README note or
  into `optdepends`.
