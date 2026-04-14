# Project Organization for `@cluesurf/task`

Task is a function registry. It exposes a common set of actions
(convert, download, extract, format, etc.) across three surfaces:

1. **CLI** (`task <action> <thing>` from the shell)
2. **Node.js programmatic API** (everything, server-side)
3. **Browser programmatic API** (where a hack is possible in-browser)

## Top-level layout

```
code/
  base/          Native-tool wrappers (ffmpeg, pandoc, imagemagick, etc.)
  call/          High-level action handlers (convert, download, extract, ...)
  form/          Zod schemas, CLI definitions, action factories
  tool/          Shared utility code
  base.ts        Core bootstrap
  browser.ts     Browser entrypoint
  node.ts        Node entrypoint
  source.ts      Source exports
```

## How each action slot works

For any action (say `convert`), you'll see this split:

```
code/call/<action>/<concrete-thing>/
  base.ts        Declarative form schemas (hand-written)
  shared.ts      Shared logic (cross-env)
  node.ts        Node implementation
  browser.ts     Browser implementation (optional)
  handler.ts     Request router / dispatch
```

Then `pnpm make:type` generates the corresponding TypeScript types and
zod parsers here (never hand-edit):

```
code/form/action/<action>/<concrete-thing>/
  cli/index.ts + cli/parsers.ts        (generated)
  node/index.ts + node/parsers.ts      (generated)
  browser/index.ts + browser/parsers.ts (generated)
```

## Environment split

Strong distinction between three runtime contexts:

- **`node.ts`** — Node.js only. May use `fs`, `child_process`,
  `node:path`, native binaries. Shelling out to ffmpeg, duckdb, pandoc,
  etc. goes here.
- **`browser.ts`** — Browser only. Uses Web APIs, fetch, WASM. No `fs`,
  no `child_process`.
- **`shared.ts`** — Works in both. Pure functions. No I/O.

Types and zod parsers often live in `cli/` (for CLI args), `node/` (for
Node-internal shape), and `browser/` (for browser-internal shape). When
they differ, each env gets its own parser; common pieces live in a
`shared.ts` or a shared object type under `form/object/`.

## Imports

Use the `~/` alias (configured in `tsconfig.json`). Example:

```ts
import { LocalPath } from '~/code/form/object/file/index'
```

Never relative imports across top-level boundaries.

## Where things go

- **Schema declarations**: `code/base/<domain>/base.ts` — hand-written
  using `@cluesurf/form` primitives. Includes both primitive types
  (formats, enums, codecs) AND the action input/output forms (via
  `buildConvertForms` etc.). Generates `code/form/object/*` and
  `code/form/action/*`.
- **`code/base/<tool>/` is schema-only.** Holds `base.ts` with
  the `@cluesurf/form` declarations (formats, codecs, enums) and
  any raw JSON data files those lists point to. **Never put
  node.ts or any `child_process` code here** — it belongs next
  to the action that uses it. Canonical example:
  `code/base/image-magick/` has only `base.ts` + JSON format
  lists.
- **Action implementations**: `code/call/<action>/<thing>/` —
  `base.ts` (action-input form schemas, via `buildConvertForms`
  etc.), `shared.ts` (cross-env logic), `node.ts` (Node entry
  point for the action), `browser.ts` (browser equivalent),
  `handler.ts` (dispatch), `console.ts` (yargs subcommand).
- **Command-line assembly**: `code/call/<action>/<thing>/command.ts`
  — pure functions that return argv arrays or SQL strings. No
  `execSync` / `spawn` here. See
  `code/call/archive/command.ts` for the canonical example.
- **Per-tool execution wrappers** (when an action can use one
  of several tools): `code/call/<action>/<thing>/<tool>/node.ts`
  actually spawns the binary. Canonical example:
  `code/call/convert/image/imagemagick/node.ts` runs imagemagick.
  `./command.ts` assembles the argv; `./<tool>/node.ts` runs it.
- **Utilities used throughout the task repo**: `code/tool/`, split by
  runtime — `code/tool/shared/` (cross-env), `code/tool/node/` (Node
  only), `code/tool/browser/` (browser only). Put helpers here that
  multiple actions will reuse (file I/O helpers, path resolution,
  command runners, etc.).
- **Generated types and parsers**: `code/form/object/*` and
  `code/form/action/*`. Never hand-edit.
  Each generated folder contains three files (new
  `@cluesurf/form` naming — previously `parsers.ts` and
  `constants.ts`):
  - `index.ts` — TypeScript type exports
  - `take.ts` — zod parsers (was `parsers.ts`)
  - `base.ts` — constant values, enum lists, etc. (was
    `constants.ts`)
  When importing generated output, use the paths `~/code/form/.../index`
  for types, `~/code/form/.../take` for parsers, `~/code/form/.../base`
  for constants.
- **CLI entrypoint**: `code/console.ts` — the file the `task` bin
  points to in `package.json`. Imports the top-level action-group
  consoles and wires them into yargs.
- **Top-level action-group consoles**:
  `code/call/<action>/console.ts` (e.g. `convert/console.ts`,
  `download/console.ts`). Each defines the yargs `CommandModule`
  for its verb and imports its concrete sub-things.
- **Concrete per-thing consoles**:
  `code/call/<action>/<thing>/console.ts`, and sometimes deeper
  when an action ships per-implementation subfolders. For
  example `format` and `compile` both nest under a `/code/`
  folder and then split by language:
  `code/call/format/code/<language>/node.ts` and
  `code/call/compile/code/<language>/node.ts`. **The intermediate
  `/code/` path segment is organizational only; it is NOT a CLI
  level.** From the shell the command is flat
  (`task format python ...`, `task compile c ...`), so the
  group-level `code/call/format/console.ts` and
  `code/call/compile/console.ts` import the language consoles
  directly (`./code/python/console`, `./code/c/console`, etc.)
  without a mid-level aggregator.
  Each concrete console exports a yargs `CommandModule` whose
  handler lazy-imports `./node` so heavy deps (DuckDB, ffmpeg,
  etc.) only load when the command runs. Options are derived
  from the generated form schema via `code/tool/shared/cli.ts`
  helpers — don't hand-write yargs option specs.

## Action handler pattern

Every Node action implementation in `code/call/<action>/<thing>/node.ts`
dispatches on an input `handle` field that splits the request into
one of three call modes. Preserve this shape; don't flatten it even
for simple actions.

```ts
export async function <action>Node(source, native) {
  const input = <Action>NodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await <action>NodeRemote(input, native)
    case 'external':
      return await <action>NodeLocalExternal(input, native)
    default:
      return await <action>NodeLocalInternal(input, native)
  }
}
```

The three modes:

- **`local / internal`** (default): input and output paths are
  already inside the repo's own working area. Straight pass-through
  to the local worker.
- **`local / external`**: input files live at arbitrary filesystem
  paths outside our working area.
  `resolveInputForLocalExternalNode` normalizes them before calling
  the shared `local` worker.
- **`remote`**: input arrived over the network (task.surf HTTP
  server, another worker). `resolveInputForRemoteNode` pulls the
  bytes down; `<action>NodeClientInputParser` validates the
  client-facing shape; the request is then dispatched via
  `buildRequestTo<Action>` + `resolveWorkFileNode` rather than
  running locally.

Both `local` branches converge on a single `<action>NodeLocal`
worker that calls into `./command.ts` (or a per-tool
`./<tool>/node.ts`) to actually run the binary.

Canonical reference: `code/call/compile/code/c/node.ts`. Shared
resolver helpers live at `code/call/<action>/<thing>/tool/node.ts`
(e.g. `code/call/compile/code/tool/node.ts`) and are reused across
every concrete sub-thing of that action.

## Principles

- **Schemas are declarative, types are generated.** Never hand-write
  zod parsers or TypeScript types for CLI / Node / Browser input
  shapes. Declare the schema in `code/call/<action>/<thing>/base.ts`
  using `@cluesurf/form` primitives (`Form`, `List`, `Hash`) and the
  `buildConvertForms` / `buildConvertFormsWithOutputDirectory`
  helpers. Running `pnpm make:type` generates the corresponding
  TypeScript and zod code under `code/form/action/<action>/<thing>/`.
  Files in `code/form/action/*` and `code/form/object/*` are all
  generated — never hand-edit them.
- **Environment split is load-bearing.** Node I/O never in `shared.ts`.
  Browser-incompatible code never in `shared.ts` or `browser.ts`.
- **Every action validates input at its boundary.** Use the generated
  parser from `code/form/action/<action>/<thing>/node/parser` (or
  the equivalent path).
- **Use `kink` for errors**, not `throw new Error`. See
  `code/tool/shared/kink.ts`.
- **Paths in imports**: use `~/` alias, never relative across package
  boundaries.
- **Never hardcode filesystem paths** in business logic. Take them
  as input; resolve via `code/tool/node/file.ts` helpers.

## Build steps

- `pnpm make:type` — runs `make/index.ts`, which imports every
  exported schema from `code/source.ts`, walks them through
  `@cluesurf/form/make`, and writes generated form/take/base files
  back under `code/form/*`. Run after any change to a
  `code/call/<action>/<thing>/base.ts` or `code/base/<tool>/base.ts`.
- **`code/base.ts` is the single registration point.** It
  re-exports every `base.ts` schema in the project so both the
  codegen (`make/index.ts`) and the compiled runtime can see
  every form. When you add a new `base.ts` under
  `code/base/<domain>/` or `code/call/<action>/<thing>/`, add
  a matching `export * from ...` line to `code/base.ts` or
  nothing will register it. **Never use `~/code/source` — that
  pattern is gone; there's only `code/base.ts`.**
- `pnpm make` — `tsc && tsc-alias` over the whole package.
- **External tools live in two install manifests**:
  - `deck/task/Dockerfile` installs everything the scripts shell
    out to (ffmpeg, pandoc, imagemagick, duckdb, hf CLI, etc.)
    so the containerized version of task can run every action.
  - `deck/homebrew-code/Tool/task/` + `deck/homebrew-code/Casks/task.rb`
    do the same for macOS
    developer installs via `brew install cluesurf/code/task`.
  Whenever an action adds a new `code/base/<tool>/` wrapper
  that shells out to a new binary, update both of these so the
  binary is present wherever task runs.

## Schema definitions and code generation

For rich domain types (codecs, formats, enums of known values),
schemas are defined declaratively in `code/base/<tool>/base.ts`
using `@cluesurf/form` primitives (`List`, `Hash`, `Form`). These
source definitions reference JSON files of values and generate
TypeScript types + zod parsers under
`code/form/object/<tool>/`.

Canonical example: `code/base/ffmpeg/base.ts` declares
`ffmpeg_codec_audio`, `ffmpeg_codec_data`,
`ffmpeg_codec_content`, etc. Running the codegen pipeline
produces `code/form/object/ffmpeg/index.ts`, `parsers.ts`, and
`constants.ts`. Actions like
`code/call/convert/video/ffmpeg/node.ts` then import the
generated types and parsers via `~/code/form/node/parser` and
`~/code/form/object/ffmpeg/index`.

Pattern to follow when a tool has a bounded vocabulary (enum of
codecs, list of formats, named options):

1. Put the raw values in `code/base/<tool>/*.json`.
2. Declare the form/list/hash in `code/base/<tool>/base.ts`.
3. Run the codegen to produce `code/form/object/<tool>/`.
4. Import the generated types/parsers in your action.

For convert-style actions, use one of the helpers in
`code/tool/shared/base.ts`:

- `buildConvertForms(name, save, inputFormatType, outputFormatType)` —
  standard single-file convert flow with `file` input/output.
- `buildConvertFormsWithOutputDirectory(...)` — same but the output is
  a directory (e.g. when walking a folder tree).

These emit every variant (`node_input`, `node_remote_input`,
`node_local_internal_input`, `browser_input`, etc.) in one call. See
`code/call/convert/archive/base.ts` for a canonical example.

For download/upload or other action kinds without a helper, hand-write
the `Form`/`List`/`Hash` declarations in `base.ts` (still using
`@cluesurf/form` primitives, not zod). The codegen picks them up the
same way.

## Known tech debt

The browser entrypoint (`code/browser.ts`) currently loads every action
into one bundle. Goal is per-action imports
(`import { convertImage } from '@cluesurf/task/convert/image'`) so the
browser can tree-shake. Node imports are already per-action and unaffected.

## Where docs live

Architecture docs, plans, and design notes go in the parent `note/` tree
(not inside this package). Task is a library; rationale lives with the
platform.
