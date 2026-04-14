# Install

`@cluesurf/task` wraps native CLI tools. Install the ones you need for
the actions you use. The Docker image ships with everything already set
up.

## Docker (recommended)

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/cluesurf/task:latest
```

Image: [`ghcr.io/cluesurf/task`](https://ghcr.io/cluesurf/task).

## macOS

```sh
brew install cluesurf/load/basetask
```

Source: [cluesurf/homebrew-load](https://github.com/cluesurf/homebrew-load/blob/make/Casks/task.rb).

`docx2pdf` additionally requires Microsoft Word installed.

## Windows

A unified Chocolatey package was rejected by the community, so install
each dep directly.

```bat
choco install libreoffice-fresh imagemagick fontforge ffmpeg miktex.install
choco install inkscape gifsicle golang python3 rust ruby calibre unar
choco install maven llvm julia pandoc exiftool dart-sdk php
```

Source for the partial choco package: [load/choco](https://github.com/cluesurf/task/tree/make/load/choco).
Missing tools tracked in [roadmap.md](./roadmap.md).

## Linux

No prebuilt package yet. See the repo `Dockerfile` for the canonical
list of apt/brew packages. A `.deb` repo is planned ([roadmap.md](./roadmap.md)).

## Node package

With the native deps present:

```sh
pnpm add -g @cluesurf/task   # CLI everywhere
pnpm add    @cluesurf/task   # library in one project
```

Inside a project, run the CLI via pnpm:

```sh
pnpm exec task convert image --input a.png --output a.jpg
```
