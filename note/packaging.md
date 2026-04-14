# Packaging

How `@cluesurf/task` ships across every OS.

## The mental model

Every mainstream OS has three layers. Same shape everywhere.

**1. System package manager** → apps, binaries, system libs.
**2. Language package manager** → project / dev deps.
**3. Cross-platform layer (optional)** → reproducibility, portability.

Same boxes, different names.

| layer              | macOS         | Linux                         | Windows                 |
| ------------------ | ------------- | ----------------------------- | ----------------------- |
| System             | Homebrew      | apt / dnf / pacman / zypper / apk | WinGet / Scoop / Choco |
| Language           | npm / pip / cargo / gem / go install | (same)                 | (same)                 |
| Cross-platform     | Nix, Docker   | Nix, Flatpak, Snap, Docker    | Nix (WSL), Docker       |

Windows didn't invent Winget vs Scoop vs Choco. Linux already had the
distinction for decades.

## How `@cluesurf/task` fits

Task is two things:

- **A Node CLI + library** → ships on **npm**.
- **A metapackage over native tools** (ffmpeg, imagemagick, pandoc,
  libreoffice, qpdf, ...) → ships per-OS in the layer-1 manager of
  each platform.

Layer 1 installs the toolchain. Layer 2 installs the CLI.

### macOS

```sh
brew install cluesurf/code/task   # layer 1: native deps
pnpm add -g @cluesurf/task        # layer 2: the CLI
```

Source: [`deck/homebrew-code/Casks/task.rb`](../../homebrew-code/Casks/task.rb).

### Linux

Pick your family. All map to the same `cluesurf-task` name.

```sh
# Debian / Ubuntu
sudo apt install cluesurf-task

# Fedora / RHEL / Rocky / Alma
sudo dnf install cluesurf-task

# Arch / Manjaro (AUR)
yay -S cluesurf-task

# Alpine
sudo apk add cluesurf-task

# openSUSE
sudo zypper install cluesurf-task

# Gentoo (overlay)
sudo emerge app-misc/cluesurf-task

# then, on any of them:
pnpm add -g @cluesurf/task
```

Source: [`load/linux`](../load/linux).

### Windows

```powershell
winget install ClueSurf.Task      # layer 1 — recommended default
scoop install cluesurf/cluesurf-task   # alternative: Homebrew-feel, user-space
choco install cluesurf-task       # alternative: legacy
pnpm add -g @cluesurf/task        # layer 2
```

Source: [`load/windows`](../load/windows).

### Any OS with a container runtime

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/cluesurf/task:latest
```

Both layers baked in. Best for CI and cross-platform reproducibility.

### Any OS with Nix

```sh
nix-build load/nix/task.nix
```

Single derivation, works on macOS + Linux + WSL. Most reproducible
option.

## Which one should you recommend?

Depends on the user.

**Default per OS.** Picks the manager already installed — zero
bootstrap.

| audience              | recommendation              |
| --------------------- | --------------------------- |
| macOS devs            | Homebrew                    |
| Ubuntu / Debian devs  | apt                         |
| Fedora / RHEL devs    | dnf                         |
| Arch devs             | AUR                         |
| Windows end-users     | WinGet                      |
| Windows power-devs    | Scoop                       |

**Cross-platform / reproducible builds.** One command, same output
everywhere.

- **Nix** if you want the system-level story. True dependency
  isolation, rollbacks, version pinning.
- **Docker** if you want an isolated runtime. Best for CI.

**Enterprise Windows shops.** Chocolatey remains the incumbent;
WinGet is replacing it. Keep the nuspec warm but don't invest there.

## Layer-2 is the same everywhere

The Node CLI always comes from npm:

```sh
pnpm add -g @cluesurf/task
```

No OS-specific split. If you see a distro package called
`cluesurf-task` it's the layer-1 toolchain metapackage. The Node CLI
is on npm, period.

## Where this lives in the repo

```
deck/task/
  load/
    shared/       meta + render (all OSes use this)
    linux/        deb, rpm, arch, alpine, opensuse, gentoo
    windows/      winget, scoop, choco
    nix/          cross-platform derivation
  ../homebrew-code/    macOS cask (one layer up, shared across cluesurf)
  Dockerfile    baked-in layer-1 + layer-2 image
```

Each subdir has its own `readme.md` with build + publish
instructions.

## What the GitHub Pages site has to be

**Just static file hosting. No UI required.**

apt / dnf / apk are HTTP clients. They fetch raw files at fixed
paths and parse them — they never render HTML. The Pages site only
needs to serve the file tree the publishers wrote:

```
https://cluesurf.github.io/host/task/
  apt/
    pool/main/cluesurf-task_<ver>_all.deb
    dists/stable/Release
    dists/stable/InRelease
    dists/stable/Release.gpg
    dists/stable/main/binary-all/Packages
    dists/stable/main/binary-all/Packages.gz
    pubkey.asc
  rpm/
    cluesurf-task-<ver>-1.noarch.rpm
    repodata/repomd.xml
    repodata/repomd.xml.asc
    repodata/<sha>-primary.xml.gz
    pubkey.asc
  apk/
    cluesurf-task-<ver>-r0.apk
    APKINDEX.tar.gz
    cluesurf.rsa.pub
```

Pages serves all of that with the right `Content-Type` and CORS
defaults already. **You don't need Jekyll, a theme, `_config.yml`,
or any rendering pipeline.** The deploy workflow in
[`accounts.md` §2](./accounts.md) just uploads `site/` as the
artifact.

A bare `site/index.md` (or `index.html`) is a nice-to-have for
humans who paste the root URL into a browser — a one-paragraph
"this is the cluesurf-task package mirror, install instructions
here: …" landing page. **Optional.** Without it the root URL
returns a 404, which is fine for package managers.
