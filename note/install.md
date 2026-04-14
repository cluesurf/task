# Install

`@cluesurf/task` wraps native CLI tools. Install the ones you need for
the actions you use. The Docker image ships with everything already set
up.

## Docker (recommended)

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/cluesurf/task:latest
```

Docker image: [`ghcr.io/cluesurf/task`](https://ghcr.io/cluesurf/task).

## MacOS

```sh
brew install cluesurf/code/task
```

Source: [cluesurf/homebrew-code](https://github.com/cluesurf/homebrew-code/blob/make/Casks/task.rb).

`docx2pdf` additionally requires Microsoft Word installed.

## Windows

A unified Chocolatey package was rejected by the community, so install
each dep directly. Run the bundled script
[`task/windows/install.sh`](../task/windows/install.sh) from an
elevated shell (git-bash / msys / WSL with `choco` on PATH):

```sh
./task/windows/install.sh
```

Source for the partial choco package: [load/choco](https://github.com/cluesurf/task/tree/make/load/choco).
Missing tools tracked in [roadmap.md](./roadmap.md).

## Linux

### Ubuntu / Debian

Pull the native toolchain via apt:

```sh
curl -fsSL https://cluesurf.github.io/task/apt/pubkey.asc \
  | sudo gpg --dearmor -o /usr/share/keyrings/cluesurf.gpg
echo "deb [signed-by=/usr/share/keyrings/cluesurf.gpg] https://cluesurf.github.io/task/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/cluesurf.list
sudo apt update
sudo apt install cluesurf-task
```

Source: [load/deb](../load/deb). `cluesurf-task` is a metapackage that
pulls in every native CLI task uses (ffmpeg, imagemagick, pandoc,
libreoffice, etc.). Swift is not in apt — install from swift.org when
`task compile swift` is needed.

### Other distros

No prebuilt package. See the repo `Dockerfile` for the canonical list
of apt packages and adapt per your package manager.

## Node package

With the native deps present:

```sh
pnpm add -g @cluesurf/task   # CLI everywhere
pnpm add @cluesurf/task   # library in one project
```

Inside a project, run the CLI via pnpm:

```sh
pnpm exec task convert image --input a.png --output a.jpg
```

## Archive tool matrix

`task archive` / `task extract` route by extension. Install only the
backends you need — `7z` + `unar` + `tar` + `unzip` covers most real
input. RAR creation is proprietary and rarely needed; skip it unless
you have to.

| format | extract                    | create                                           |
| ------ | -------------------------- | ------------------------------------------------ |
| `.zip` | `unzip` / `7z` / `unar`    | `zip` / `7z`                                     |
| `.rar` | `unar` (preferred) / `unrar` | `rar` (non-free)                               |
| `.7z`  | `7z`                       | `7z`                                             |
| `.tar(.*)` | `tar`                  | `tar`                                            |
| `.gz` / `.bz2` / `.xz` / `.zst` | `7z` / `tar`  | `7z` / `tar`                                     |
| unknown container | `atool` / `patool` | `atool` / `patool`                               |

### macOS (`brew`)

```sh
brew install unar                 # .rar + generic extract
brew install sevenzip             # .7z + generic (zip/tar) extract
brew install p7zip                # alias; either works
brew install atool                # wraps everything by extension
brew install --cask rar           # .rar *creation* (proprietary)
# unzip / tar ship in the base OS.
```

### Linux (`apt` shown; `pacman` / `dnf` analogous)

```sh
apt install unar unzip p7zip-full atool
pip install patool                # wider format dispatch
# `rar` / `unrar-nonfree` are in non-free repos, download direct
# from https://www.rarlab.com/rar_add.htm when needed.
```

### Windows (`winget` / `scoop` / `choco`)

```sh
winget install 7zip.7zip            # extract + create .zip / .7z / .tar
winget install RARLab.WinRAR        # installs `Rar.exe` + `UnRAR.exe`
scoop install unar                  # or via MSYS2
# `unzip` / `tar` are in Windows 10+ via BSD-tar; `curl` too.
```
