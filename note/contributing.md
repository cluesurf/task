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

1. Declare the form in `code/call/<action>/<thing>/base.ts` using
   `@cluesurf/form` primitives (usually via `buildConvertForms` or a
   sibling helper).
2. Run `pnpm make:type` — that emits types + parsers under
   `code/form/action/<action>/<thing>/`.
3. Write the handler at
   `code/call/<action>/<thing>/node.ts` (and `browser.ts` if the
   action is browser-reachable). Follow the three-mode handler
   pattern (`remote` / `local-external` / `local-internal`) — see
   `code/call/compile/code/c/node.ts` as the canonical reference.
4. If the handler shells out to a tool, assemble argv in
   `code/call/<action>/<thing>/command.ts` (pure functions, no exec),
   and run it with `runCommandSequence` from
   `code/tool/node/command.ts`.
5. Add a route entry in `code/form/export/action/<action>/node.ts` so
   `task.<action>(...)` resolves to your handler via the two-level
   lazy-load probe (`loadBase` → format match → `loadCall`).
6. Add a subcommand at `code/call/<action>/<thing>/console.ts`
   (wraps the handler with `buildActionCommand`) and re-export it
   from `code/call/<action>/console.ts`.
7. Wire a per-action subpath in `package.json` `exports` so
   consumers can `import { ... } from '@cluesurf/task/<action>/<thing>'`.
8. If the handler needs a new binary installed, add it to the
   `Dockerfile` and to the homebrew cask so the managed installs stay
   in sync.

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
