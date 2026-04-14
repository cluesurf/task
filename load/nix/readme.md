# Nix (cross-platform)

Declarative, reproducible install of the `@cluesurf/task` native
toolchain. Works on Linux, macOS, and WSL from the same derivation.

No `make.sh` — Nix *is* the builder.

## Install into your profile

```sh
nix-env -f default.nix -i cluesurf-task
```

## Ad-hoc dev shell

```sh
nix-shell                 # every tool on PATH inside the shell
nix-shell --run 'task convert a.png a.jpg'
```

## One-off build

```sh
nix-build default.nix
./result/bin/ffmpeg -version
```

## Setup (one-time)

Nix has no central package registry — users consume the derivation
straight out of the cluesurf/task GitHub repo. The only "publish"
step is tagging a release so the URL is stable.

You need write access to `github.com:cluesurf/task` and `git` on
PATH. That's it.

## Publish

```sh
./publish.sh
```

`publish.sh` reads the version from `package.json`, creates an
annotated `vX.Y.Z` tag, and pushes. Skips silently if the tag
already exists.

End-user install becomes:

```sh
nix profile install "github:cluesurf/task/v0.5.0?dir=deck/task/load/nix"
```

## Flake-style (optional)

Pin nixpkgs in your own flake and import this file:

```nix
{
  inputs.cluesurf-task.url = "github:cluesurf/task?dir=deck/task/load/nix";
  ...
}
```

## What ships

- Nothing custom — Nix consumes `default.nix` and `shell.nix`
  straight from the git tag. The "build" is an out-of-tree
  derivation Nix evaluates locally on each user's machine.

## Notes

- `buildEnv` produces a profile, not a first-class package with
  `Depends:` semantics. That's fine — `nix-env -i` wires every
  binary into `$HOME/.nix-profile/bin`.
- TeX Live is `scheme-medium` (~1.5 GB). Swap for `scheme-full` or
  `scheme-basic` depending on what `task` actually needs.
- No Swift — not in nixpkgs. Use the macOS or Linux native
  toolchain for that one backend.
