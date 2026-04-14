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

No prebuilt package yet. See the repo `Dockerfile` for the canonical
list of apt/brew packages. A `.deb` repo is planned ([roadmap.md](./roadmap.md)).

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
