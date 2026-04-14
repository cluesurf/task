# Linux packaging

Per-family metapackage builds for `@cluesurf/task`'s native
toolchain. Each subdir renders a distro-specific manifest from
`../shared/` + `linux/shared/deps.sh` and drives that distro's
build tool.

| family                 | dir              | format       | tool        |
| ---------------------- | ---------------- | ------------ | ----------- |
| Debian / Ubuntu        | [deb](./deb)         | `.deb`      | `dpkg-deb`  |
| RHEL / Fedora / Rocky / Alma | [rpm](./rpm) | `.rpm`      | `rpmbuild`  |
| openSUSE               | [opensuse](./opensuse) | `.rpm` (OBS) | `osc`    |
| Arch / Manjaro         | [arch](./arch)       | `PKGBUILD`  | `makepkg`   |
| Alpine                 | [alpine](./alpine)   | `.apk`      | `abuild`    |
| Gentoo                 | [gentoo](./gentoo)   | ebuild      | Portage     |
| NixOS / cross-platform | [../nix](../nix)     | derivation  | `nix-build` |

The Debian cousins (Mint, Pop!_OS, elementary) and the RPM cousins
(CentOS Stream, Amazon Linux 2023) reuse the `deb` and `rpm` builds
as-is.

## Shared

- [`shared/deps.sh`](./shared/deps.sh) — the canonical tool set
  translated into each distro's package names. Adding a tool means
  one line per distro, in one file.

Metadata (`name`, `version`, `description`) lives one level up in
[`../shared/`](../shared) so every OS reuses it.

## Build all

```sh
for d in deb rpm arch alpine gentoo; do
  ( cd "$d" && ./make.sh )
done
```

Or use [`../make.sh`](../make.sh) from the repo to build both OSes
at once.

## Cross-build from macOS / non-Linux hosts

```sh
./docker-build.sh             # every Linux format in its native container
./docker-build.sh deb rpm     # just the listed ones
```

Artifacts land in `<format>/dist/` on the host.

## Hosting

Each subdir's `readme.md` covers publishing for that ecosystem:
signed apt repo, `createrepo_c`, AUR git push, `apk index`, Portage
overlay, OBS project. GitHub Pages is a reasonable static host for
the first three.
