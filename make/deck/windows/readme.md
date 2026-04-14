# Windows packaging

Three delivery paths for `@cluesurf/task`'s native toolchain on
Windows. Each subdir renders its manifest from `../shared/` +
`windows/shared/deps.sh` so the dep list stays in one place.

| manager   | dir             | status / when to pick it                     |
| --------- | --------------- | -------------------------------------------- |
| WinGet    | [winget](./winget) | Default choice. Built into Windows 10/11, Microsoft-backed, growing repo. |
| Scoop     | [scoop](./scoop)   | "Homebrew on Windows" feel. User-space, clean paths, no admin, native `depends`. Recommended for dev workstations. |
| Chocolatey | [choco](./choco)  | Legacy. Keep the nuspec in sync, but prefer WinGet / Scoop for new installs. |

## Shared

- [`shared/deps.sh`](./shared/deps.sh) — canonical tool set mapped
  into choco / scoop / winget package ids.

## Build all

```sh
for d in winget scoop choco; do
  ( cd "$d" && ./make.sh )
done
```

## Cross-platform alternative

[Nix](../nix) works on Windows via WSL and gives you the same
reproducibility story as on Linux/macOS. If you're already
WSL-resident, it may be a better fit than any of the native
managers.
