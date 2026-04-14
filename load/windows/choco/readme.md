# Chocolatey

Legacy Windows packaging. Kept in sync with the other windows
managers but not the default install path — prefer
[WinGet](../winget) or [Scoop](../scoop) for new users.

Package id: `cluesurf-task`.

## Render + pack

```sh
./make.sh
```

Writes `dist/cluesurf-task.nuspec` and, if `choco` is on PATH, runs
`choco pack` to produce `dist/cluesurf-task.<version>.nupkg`.

On macOS / Linux: `make.sh` only renders the nuspec. Copy the file
onto a Windows host (or a Docker container with `mono` +
`chocolatey`) to build the actual `.nupkg`.

## Setup (one-time)

1. Register at <https://community.chocolatey.org/account/Register>.
   Verify email.

2. Open <https://community.chocolatey.org/account> and copy the API
   key shown under *My API Key*.

    ```sh
    export CHOCO_API_KEY=<long token>
    export CHOCO_SOURCE=https://push.chocolatey.org   # default; override for a self-hosted feed
    ```

3. (Optional) For the first push the community moderators have to
   approve the package. The original `task` submission was rejected;
   ours uses a different id (`cluesurf-task`) but expect friction.
   Self-host the feed instead if approval drags on:

    ```sh
    # GitHub Pages-served feed
    export CHOCO_SOURCE=https://cluesurf.github.io/choco-code
    ```

## Publish

```sh
CHOCO_API_KEY=<token> ./publish.sh
```

`publish.sh` runs `choco push` on every `.nupkg` in `dist/`. Must
run on a Windows host (or a container with `choco` installed) —
the official tool is .NET-only.

## Install (end user)

```powershell
choco install cluesurf-task                                 # community feed
choco sources add -n cluesurf -s $env:CHOCO_SOURCE          # self-hosted
choco install cluesurf-task --source cluesurf
```

## What ships in the .nupkg

- The rendered `cluesurf-task.nuspec`. `<dependencies>` is the
  whole payload — no `tools/` folder, no `chocolateyinstall.ps1`.

`make.sh`, the template, and `dist/` stay local.

## Notes

- `<dependencies>` entries are generated from
  [`../shared/deps.sh`](../shared/deps.sh). Add new tools there,
  not here.
- The nupkg itself ships no files — it's a pure metapackage whose
  job is to drag in its `<dependencies>`.
- The legacy hand-maintained `task.nuspec` is superseded by this
  template-driven build.
