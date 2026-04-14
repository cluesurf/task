# WinGet manifest

WinGet is the official, built-in package manager on Windows 10/11.
Manifests live in `microsoft/winget-pkgs` and ship via PRs.

Package id: `ClueSurf.Task`.

## Render + build

```sh
./make.sh
```

Writes:

- `dist/cluesurf-task.zip` — a stub installer containing one `.cmd`.
  WinGet does not have first-class metapackages, so the stub exists
  to give the manifest something to install while
  `Dependencies.PackageDependencies` pulls in the real toolchain.
- `dist/manifests/c/ClueSurf/Task/<version>/` — three YAML files
  (version, locale, installer) in the exact layout
  `winget-pkgs` expects.

## Setup (one-time)

1. Fork <https://github.com/microsoft/winget-pkgs>. Clone your fork
   locally:

    ```sh
    gh repo fork microsoft/winget-pkgs --clone
    cd winget-pkgs
    git remote add upstream https://github.com/microsoft/winget-pkgs

    export WINGET_PKGS_DIR=$PWD
    ```

2. Install the GitHub CLI if you want `publish.sh` to open the PR
   for you:

    ```sh
    brew install gh && gh auth login
    ```

3. Upload `dist/cluesurf-task.zip` as an asset on the matching
   release at `https://github.com/cluesurf/task/releases/tag/v<version>`.
   `make.sh` already wires `InstallerUrl` to that path. If you host
   the zip elsewhere, override before publishing:

    ```sh
    export WINGET_RELEASE_URL=https://example.com/cluesurf-task.zip
    ```

## Publish

```sh
WINGET_PKGS_DIR=~/winget-pkgs \
./publish.sh
```

`publish.sh` keeps `WINGET_PKGS_DIR` in sync with `upstream/master`,
copies the rendered manifests in, creates a `cluesurf-task-<version>`
branch, pushes, and (if `gh` is available) opens the PR.
Microsoft's automated validators run on the PR; merge lands in
~24 h on a successful run.

## Install (end user)

```powershell
winget install ClueSurf.Task
```

## What ships

- Three YAML manifests under
  `manifests/c/ClueSurf/Task/<version>/` (PR'd to `winget-pkgs`).
- One zip asset on the GitHub release: `cluesurf-task.zip`,
  containing one `.cmd` stub. WinGet requires *something* to
  install; `Dependencies.PackageDependencies` does the real work.

`make.sh`, templates, and `dist/stub/` stay local.

## Notes

- `PackageDependencies` entries must already be in `winget-pkgs`.
  A couple of ids in `shared/deps.sh` (e.g. `bloodrock.pkg-config`,
  `OliverBetz.Poppler`) are community publishers; verify each
  `PackageIdentifier` against `winget search <id>` before shipping.
- The stub zip approach is what other metapackages use. It's ugly,
  but WinGet doesn't offer a pure-metadata package type.
- If you can't get the winget-pkgs PR through validation, ship the
  manifest yourself and tell users to
  `winget install --manifest <path>`.
