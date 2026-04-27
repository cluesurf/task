# Contributing

Stack: TypeScript + Node.js + pnpm + zod. Every action input is a
single object that a generated zod parser validates; the underlying
types and parsers come from declarative schemas in the repo — you
never hand-write them.

## Setup

```sh
pnpm install
pnpm link -g     # optional — puts the `task` bin on your PATH
```

## Commands

```sh
pnpm make:type   # regenerate TypeScript + zod from the schemas
pnpm make        # tsc + tsc-alias into host/
pnpm tsx code/console.ts --help    # run the CLI against source
```

After editing any `code/base/<tool>/base.ts` or
`code/call/<action>/<thing>/base.ts`, run `pnpm make:type` to refresh
`code/form/**`.

## Repo layout

```
code/
  base/            # native-tool wrappers (ffmpeg, pandoc, imagemagick, ...)
  call/            # per-action handlers
  form/            # GENERATED types + parsers — never hand-edit
  tool/            # shared utilities (shared, node, browser)
  node.ts          # Task class for Node
  browser.ts       # Task class for browser
  console.ts       # CLI entrypoint
make/
  index.ts         # schema → TS/zod/Task-surface codegen
note/              # design docs, architecture, roadmap
test/              # manual/CLI tests
```

Full rules in [CLAUDE.md](../CLAUDE.md) — codify-before-hand-writing
is the defining principle.

## Adding a new action

The full step-by-step lives in [`action-pattern.md`](./action-pattern.md).
That doc covers the canonical four-branch dispatch (remote /
local-external / local-internal converging on a shared local
worker), the per-backend subdir layout for multi-tool things,
the three layers of CLI console wiring (verb-group → thing →
optional per-backend), and how the `Task` class in
`code/node.ts` lazy-imports each handler.

The TL;DR loop:

1. Declare the schema in `code/call/<verb>/<thing>/base.ts`.
2. Register it in `code/base.ts` (`export * from ...`).
3. `pnpm make:type` → generated types and parsers land under
   `code/form/action/<verb>/<thing>/`.
4. Write `command.ts` (pure argv builder, no I/O).
5. Write `node.ts` with four-branch dispatch (or the
   lightweight pattern if the work is intrinsically local).
6. Write `console.ts` with `buildActionCommand` + the generated
   `console/options`.
7. Wire console up: `code/call/<verb>/console.ts` (group) →
   `code/console.ts` (root binary).
8. Add a method to `Task` in `code/node.ts`.
9. Register the binary in `code/tool/shared/install-hint.ts`
   plus the Docker / Homebrew manifests.
10. Add the per-action `package.json` export.
11. Drop a vitest under `test/node/` and a bash suite under
    `test/console/`.

Read `action-pattern.md` before writing anything new — the
file layout and dispatch contract is load-bearing for the
remote worker, codegen, and bundler tree-shaking.

## Tests

```sh
./test/cli.sh
pnpm test
```

## Publishing

```sh
pnpm move        # tsc + commit + patch-bump + push
npm dist-tag add @cluesurf/task@<version> latest   # set latest tag
```
