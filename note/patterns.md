# Implementing a `task` action

This is the canonical playbook for adding a new verb to `@cluesurf/task`.
Every action wires three surfaces — CLI, Node programmatic API, and
(where possible) browser API — from a single declarative schema.
Follow this exact shape so codegen, four-branch dispatch, remote
workers, and the help registry all light up for free.

The canonical reference implementation is
`code/call/convert/image/imagemagick/`. Read it alongside this doc.

---

## File layout

```
code/call/<verb>/<thing>/
  base.ts            Schema declarations (hand-written, @cluesurf/form)
  console.ts         Yargs CommandModule for `task <verb> <thing>`
  node.ts            Node entrypoint — four-branch dispatch
  browser.ts         Browser entrypoint (optional, same dispatch shape)
  shared.ts          Cross-env helpers + type-guard (testXxxNode)
  command.ts         Pure argv builder ({bin, args}) — no spawn
```

Plus the generated output of `pnpm make:type`, which lives under:

```
code/form/action/<verb>/<thing>/
  cli/index.ts + cli/take.ts + cli/base.ts
  node/index.ts + node/take.ts + node/base.ts
  browser/index.ts + browser/take.ts + browser/base.ts
  shared/index.ts + shared/take.ts + shared/base.ts
  console/options.ts                  ← yargs option list
```

**Never hand-edit anything under `code/form/`.** It is regenerated
on every `pnpm make:type` run from `code/base.ts` (which re-exports
every schema `base.ts` in the project).

### Multi-backend layout

When a verb has more than one concrete backend (different binary,
different cloud platform, per-OS shell-out), nest each backend in
its own subdirectory:

```
code/call/<verb>/<thing>/
  base.ts                       Shared form, references each backend's input/output format lists
  shared.ts                     Cross-backend helpers
  console.ts                    Top-level thing console — reads --tool / --platform and dispatches
  <backend>/
    node.ts
    browser.ts
    command.ts
    shared.ts                   Per-backend type-guard (testConvertImageWithImageMagick)
```

Examples: `convert/image/{imagemagick,ffmpeg,inkscape,...}/`,
`disassemble/binary/{radare,objdump,llvm-objdump}/` (planned),
`list/machine/{digital-ocean,aws,...}/`,
`compress/font/{fonttools,woff2,...}/`.

When a thing has exactly one backend and will never grow a second,
flat `<thing>/node.ts` is fine. The moment a `--tool`, `--platform`,
or `--engine` flag appears, the per-backend subdir shape is
**required** — do not propagate flat layouts past that point.

---

## 1. Declare the schema (`base.ts`)

Schemas are written declaratively with `@cluesurf/form` primitives
(`Form`, `List`, `Hash`). Codegen turns them into TypeScript types
and zod parsers under `code/form/...`. **Never** hand-write parsers
or input/output types.

For convert-style verbs use one of the helpers in
`code/tool/shared/base.ts`:

- `buildConvertForms(name, save, inputFormatType, outputFormatType)`
- `buildConvertFormsWithOutputDirectory(...)` — directory-output flavor

These emit every variant in one call:

- `<Verb><Thing>NodeRemoteInput` (over the wire)
- `<Verb><Thing>NodeLocalExternalInput` (arbitrary host paths)
- `<Verb><Thing>NodeLocalInternalInput` (cwd-internal paths)
- `<Verb><Thing>NodeLocalInput` (post-resolution shape, both local branches converge here)
- `<Verb><Thing>NodeClientInput` / `<Verb><Thing>NodeOutput`
- Browser equivalents

For non-convert verbs, hand-write the `Form`/`List`/`Hash`
declarations directly. Example: `code/call/inspect/file/base.ts`,
`code/call/dump/font/base.ts`.

After writing or editing any `base.ts`, register it in
`code/base.ts` with an `export * from '...'` line and run
`pnpm make:type`. If you skip the registration, codegen never
sees your schema and the form/take/base files stay missing.

---

## 2. Wire the argv builder (`command.ts`)

Pure function, returns `{ bin, args }`. **No `execSync`, no
`spawn`, no I/O.** It must be safe to call from a unit test
without binaries on the path.

```ts
// code/call/<verb>/<thing>/command.ts (or per-backend command.ts)
export function buildCommandToConvertImageWithImageMagick(
  input: ConvertImageWithImageMagickNodeLocalInput,
): { bin: 'magick'; args: string[] } {
  const args = [input.input.file.path]
  if (input.quality) args.push('-quality', String(input.quality))
  args.push(input.output.file.path)
  return { bin: 'magick', args }
}
```

### Argument escaping rule of thumb

`spawn(bin, args, ...)` does **not** invoke a shell — each element
of `args` becomes one argv slot, byte-exact. So you do not need
shell-style quoting here. What you DO need:

- **SQL / query strings** that interpolate identifiers or values:
  use the SQL-string and SQL-identifier escapers in
  `~/code/tool/shared/sql.ts`. Never concatenate user input into
  `WHERE x = '${input.value}'`.
- **Glob expansion**: don't pre-expand globs in `command.ts`.
  Pass them through and let the binary (DuckDB, ffmpeg, rsync)
  resolve them. Pre-expanding silently drops files that arrive
  between argv-build time and spawn time.
- **Filenames with leading dashes**: prepend `--` (the GNU end-of-options
  marker) before the positional, or use the binary's `--input=<path>`
  long form.
- **Environment passthrough**: never embed env values into argv when
  the binary supports `KEY=value` env. Pass via `env` on `spawnAndWait`.

For builders that emit a string (SQL via psql `-c`, awk script,
shell `-c` payload), still pass via the `args` array — `spawn`
treats it as one argv. The escaping concern is **inside** the
string (proper SQL quoting), not around it.

---

## 3. Wire the Node entrypoint (`node.ts`) — four-branch dispatch

This is the heart of the pattern. Every Node handler dispatches
on `input.handle` into one of three branches. Both local branches
converge on a single shared `Local` worker.

```ts
// code/call/<verb>/<thing>/[<backend>/]node.ts

import {
  ConvertImageWithImageMagickNodeInput,
  ConvertImageWithImageMagickNodeLocalExternalInput,
  ConvertImageWithImageMagickNodeLocalInternalInput,
  ConvertImageWithImageMagickNodeRemoteInput,
} from '~/code/form/action/convert/imagemagick/node'
import {
  ConvertImageWithImageMagickNodeClientInputParser,
  ConvertImageWithImageMagickNodeInputParser,
  ConvertImageWithImageMagickNodeLocalInputParser,
  ConvertImageWithImageMagickNodeOutputParser,
} from '~/code/form/action/convert/imagemagick/node/take'
import { buildCommandToConvertImageWithImageMagick } from '../command'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../../tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToConvert } from '../../shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'

async function convertImageWithImageMagickNode(
  source: ConvertImageWithImageMagickNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertImageWithImageMagickNodeInputParser.parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertImageWithImageMagickNodeRemote(input, native)
    case 'external':
      return await convertImageWithImageMagickNodeLocalExternal(input, native)
    default:
      return await convertImageWithImageMagickNodeLocalInternal(input, native)
  }
}

async function convertImageWithImageMagickNodeLocalInternal(
  source: ConvertImageWithImageMagickNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertImageWithImageMagickNodeLocal(input, native)
}

async function convertImageWithImageMagickNodeLocalExternal(
  source: ConvertImageWithImageMagickNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertImageWithImageMagickNodeLocal(input, native)
}

async function convertImageWithImageMagickNodeRemote(
  source: ConvertImageWithImageMagickNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput = ConvertImageWithImageMagickNodeClientInputParser.parse(
    extend(input, { handle: 'client' }),
  )
  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)
  return ConvertImageWithImageMagickNodeOutputParser.parse({
    file: { path: input.output.file.path },
  })
}

async function convertImageWithImageMagickNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertImageWithImageMagickNodeLocalInputParser.parse(input)
  const { bin, args } = buildCommandToConvertImageWithImageMagick(localInput)
  await spawnAndWait({ verb: 'convert', bin, args })
  return ConvertImageWithImageMagickNodeOutputParser.parse({
    file: { path: localInput.output.file!.path },
  })
}

export function testConvertImageWithImageMagickNode(
  input: any,
): input is ConvertImageWithImageMagickNodeInput {
  return testConvertImageWithImageMagick(input)
}

export default convertImageWithImageMagickNode
export { convertImageWithImageMagickNode }
```

### What each branch is for

- **`local / internal`** — input + output paths are already inside the
  worker's working area (cwd / pathScope). The fast path. No copy,
  no resolve, just spawn.
- **`local / external`** — input lives at an arbitrary host path
  outside the working area. `resolveInputForLocalExternalNode`
  normalizes it (symlink, hardlink, or copy depending on perms)
  before the local worker runs.
- **`remote`** — input arrived over the network from task.surf or
  a peer worker. `resolveInputForRemoteNode` pulls the bytes,
  `<Verb>NodeClientInputParser` validates the wire-facing shape,
  the request is dispatched via `buildRequestTo<Verb>` +
  `resolveWorkFileNode`. The actual processing happens on the
  remote worker; this branch is the client.

The `<Verb>NodeLocal` worker is the **single funnel** every local
execution passes through. Put argv build + spawn + output parse
there, and only there. Both local-internal and local-external
converge after their respective `resolve*` calls.

The `testXxxNode` type-guard is exported so the parent verb's
`<thing>/node.ts` (or the convert format-pair router) can dispatch
to this implementation without parsing.

### Lightweight pattern — when you can skip the dispatch

A handful of verbs don't make sense to run remotely (no file I/O,
or the work is the spawn itself). For them, the four-branch wiring
is overkill. These use a single async function with a hand-typed
input:

- `code/call/fetch/node.ts` — work is the network call itself
- `code/call/sync/node.ts` — destination paths can be ssh / smb,
  nothing to "upload"
- `code/call/inspect/port/node.ts`, `inspect/process/node.ts` —
  whole-machine introspection, can't be remoted
- `code/call/query/db/node.ts` — connection strings already encode
  the remote side
- `code/call/watch/process/node.ts` — long-running TTY loop

If your new verb fits these criteria — no file artifact moves
between machines, the work is intrinsically local — the
lightweight pattern is fine. Otherwise default to four-branch.

---

## 4. Wire the CLI (`console.ts`)

The CLI is implemented entirely in `console.ts` files. Three
levels of console wiring exist:

### 4a. Verb-group console — `code/call/<verb>/console.ts`

Top-level group dispatcher. Imports each thing's console and
mounts it under the verb. Registers help via `registerGroupHelp`.

```ts
// code/call/convert/console.ts
import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { convertArchiveConsole } from './archive/console'
import { convertAudioConsole } from './audio/console'
// ...

registerGroupHelp({
  command: 'task convert',
  describe: 'Convert between formats',
  commands: [
    { name: 'archive', describe: 'Convert between archive formats' },
    { name: 'audio',   describe: 'Convert between audio formats' },
    // ...
  ],
})

export const convertConsole: CommandModule = {
  command: 'convert <thing>',
  describe: 'Convert between formats',
  builder: y =>
    y
      .command(convertArchiveConsole)
      .command(convertAudioConsole)
      // ...
      .demandCommand(1, 'Specify what to convert'),
  handler: () => {},
}
```

### 4b. Thing console — `code/call/<verb>/<thing>/console.ts`

Schema-driven verbs use `buildActionCommand` from
`~/code/tool/shared/console.ts`, fed by the generated
options file at `~/code/form/action/<verb>/<thing>/console/options`:

```ts
// code/call/convert/image/console.ts
import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/convert/shared/console/options'

export const convertImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Convert between image formats',
  options,
  loadHandler: () => import('~/code/call/convert/node'),
  path: ['convert', 'image'],
  examples: [
    { comment: 'png → jpg', command: 'task convert image -i a.png -o a.jpg' },
  ],
})
```

`buildActionCommand` reads the options array (≤5 flags can also
be inline-declared per `code/call/copy/environment/console.ts`),
auto-accepts a positional `[file]` path when the schema has both
input and output paths (so `task pad song.mp3 --to 3:00` does
in-place edit), registers help, and lazy-imports the node handler.

### 4c. Per-backend console — `code/call/<verb>/<thing>/<backend>/console.ts`

Only used when the thing dispatches by `--tool` / `--platform`.
The thing-level `console.ts` reads the flag and lazy-imports the
matching backend handler. Per-backend `console.ts` files are
rare; usually only the per-backend `node.ts` exists.

### Final wiring — `code/console.ts`

The bin file `code/console.ts` (the `task` entrypoint per
`package.json`) imports every verb-group console and stitches
them into one yargs tree. Adding a new verb is one new import
+ one `.command(...)` line in this file.

### Heavy-import rule

In console handlers: `await import('./node')` (lazy) is correct —
the node module pulls in DuckDB, ffmpeg, etc. and we want that
cost only when the verb actually runs. Shared lightweight helpers
(`runAction` from `~/code/tool/node/log`, `registerHelp`,
`spawnAndWait`) are static `import` at the top of the file. The
test: if the module is pure re-exports with no side-effects,
import statically. If it transitively loads native bindings or
runs I/O at import time, lazy-import.

**Never** `import * as MESH from '~/code/base'` from a console
file. The `code/base/*` tree is the full codegen schema universe
and pulls every format/codec into the bundle. Use the tiny
generated `code/form/action/<verb>/<thing>/console/options.ts`
instead.

---

## 5. Wire the Node API (`code/node.ts`)

The `Task` class in `code/node.ts` is the public programmatic
surface. Every verb gets one method that lazy-imports its
handler. The dispatch logic in `Task` matches the dispatch in
the corresponding `<verb>` group console — by media kind, by
language, or by file extension.

```ts
// code/node.ts
class Task {
  trim(i: any) {
    return this.byKind(i, {
      audio: '~/code/call/trim/audio/node',
      video: '~/code/call/trim/video/node',
    }, '~/code/call/trim/image/node')
  }

  query(i: any) {
    return this.byTool(i, {
      duckdb: '~/code/call/query/sql/duckdb/node',
      psql:   '~/code/call/query/db/node',
    })
  }
}
```

The `local()` wrapper inside `Task` injects `handle: 'internal'`
so the four-branch dispatch lands on local-internal by default.
Callers can override with explicit `handle: 'remote'` when they
want the remote branch.

Heavy native deps (ffmpeg, imagemagick, duckdb) are NOT loaded
at `import Task from '@cluesurf/task'` time. They land only when
their verb is called.

---

## 6. Browser entrypoint (`browser.ts`) — optional

The browser handler mirrors the Node four-branch shape, but
collapses to **two branches** since the browser sandbox has
no host filesystem and therefore no `external` distinction.
The dispatch is `remote` (send to a task-compatible REST
server) or `local` (run a WASM build of the underlying
binary in-page).

```ts
// code/call/<verb>/<thing>/[<backend>/]browser.ts

import {
  Convert<Thing>With<Tool>BrowserInput,
  Convert<Thing>With<Tool>BrowserLocalInput,
  Convert<Thing>With<Tool>BrowserRemoteInput,
} from '~/code/form/action/convert/<tool>/browser'
import {
  Convert<Thing>With<Tool>BrowserInputParser,
} from '~/code/form/action/convert/<tool>/browser/take'
import { buildFormDataRequestToConvert } from '../../shared'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'
import { testConvertImageWithImageMagick } from './shared'
import kink from '~/code/tool/shared/kink'

async function convertImageWithImageMagickBrowser(
  source: ConvertImageWithImageMagickBrowserInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const input =
    ConvertImageWithImageMagickBrowserInputParser.parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertImageWithImageMagickBrowserRemote(
        input,
        native,
      )
    default:
      return await convertImageWithImageMagickBrowserLocal(
        input,
        native,
      )
  }
}

async function convertImageWithImageMagickBrowserRemote(
  input: ConvertImageWithImageMagickBrowserRemoteInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestToConvert(input)
  return await resolveWorkFileAsBlob(request, native)
}

async function convertImageWithImageMagickBrowserLocal(
  input: ConvertImageWithImageMagickBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'convertImageWithImageMagickBrowserLocal',
  })
}

export function testConvertImageWithImageMagickBrowser(
  input: any,
): input is ConvertImageWithImageMagickBrowserInput {
  return testConvertImageWithImageMagick(input)
}

export default convertImageWithImageMagickBrowser
export { convertImageWithImageMagickBrowser }
```

### What each branch is for

- **`remote`** — the canonical browser path until WASM lands.
  Inputs are real `Blob` / `File` references; the handler
  serializes them with `buildFormDataRequestToConvert`
  (multipart, including the file content + the rest of the
  form), POSTs to `/<verb>!/<inputFormat>/<outputFormat>` on
  whatever host the `Task` was constructed with, polls
  `/work/:id`, then `fetch`-es the result and returns a
  `WorkFileAsBlob`. Any host that exposes the same REST
  surface (the production `task.surf`, the test fastify
  server, or a self-hosted worker) handles the request.

  **Verb URLs end in `!`.** Action endpoints (`/convert!/...`,
  `/extract!/...`, `/compile!/...`) are visually distinct
  from the noun reads (`/work/:id`, `/files/:id`) so logs,
  request traces, and route tables make the side-effecting
  calls obvious. The `!` lives on the verb itself, before
  any path params.
- **`local`** — runs a WASM build of the underlying binary
  inside the page. Most browsers throw
  `kink('task_not_implemented')` from this branch as a
  deliberate placeholder; flip it on once the WASM port
  lands. Until then the `remote` branch is the working path
  and the `local` placeholder lets the schema generate the
  full union without breaking type checking.

The `testXxx<Backend>Browser` type-guard mirrors the node
counterpart so the parent verb's `<thing>/browser.ts` (or
the convert format-pair router) can dispatch by pair without
parsing.

### What's intentionally absent

- **No `external` branch.** Browsers cannot reach into a host
  filesystem; the `local` branch already operates on
  in-memory `Blob` content.
- **No `command.ts`.** WASM bindings expose direct function
  calls, not argv. When you wire a `local` WASM
  implementation, put the call directly in the
  `<verb>BrowserLocal` worker (or in a per-backend module
  next to it).
- **No `node:fs`, `node:path`, `child_process`, or
  `~/code/tool/node/*` imports.** If you need it in
  `browser.ts`, it belongs in `shared.ts` or a new
  `~/code/tool/browser/*` helper.

### Per-action package export

Add a `browser` condition next to `node` in
`package.json` `exports` so `import { ... } from
'@cluesurf/task/<verb>/<thing>'` resolves to `browser.ts`
when bundled for the web:

```jsonc
"./convert/image": {
  "node":    "./host/code/call/convert/image/imagemagick/node.js",
  "browser": "./host/code/call/convert/image/imagemagick/browser.js",
  "default": "./host/code/call/convert/image/imagemagick/node.js"
}
```

### Browser `Task` class

`code/browser.ts` is the public programmatic surface for the
browser, mirroring `code/node.ts`. Same lazy-import
discipline (`await import('~/code/call/<verb>/<thing>/browser')`)
so `new Task()` boot cost stays at the type-stripped
entrypoint. The one behavioral difference: `Task` injects
`handle: 'remote'` rather than `handle: 'internal'`, since
the browser default is to forward to a server.

```ts
// code/browser.ts (sketch)
export default class Task {
  constructor(options: { host?: string } = {}) {
    configure('remote', options.host ?? DEFAULT_REMOTE_TASK_PATH)
    configure('environment', 'browser')
  }

  convert(i: ConvertBrowserInput): Promise<ConvertBrowserOutput> {
    return this.run('~/code/call/convert/node/browser', i)
  }
  // ...one method per verb, same shape as code/node.ts
}
```

`Task` calls `configure('remote', host)` once on construct
so every downstream `buildRemoteRequest` / `getRemote` /
`postRemote` picks up the right base URL.

### Tests — REST round-trip via a task-compatible server

Browser tests live under `test/browser/`. They drive the
`Task` browser API in a real Chromium page (Playwright)
against a stripped-down REST server that wraps the same Node
verb the production `task.surf` host runs:

```
test/browser/
  server.ts                 fastify server: POST /v2/convert/:in/:out runs the Node verb
  playwright.config.ts      starts server.ts as webServer, points baseURL at it
  page.html                 minimal page that loads the bundled browser surface
  page.entry.ts             webpack/vite entry that exposes Task on window
  fixture/                  small input files (png, wav, ...)
  convert.spec.ts           drives task.convert from inside the browser
```

The fastify server is intentionally thin: it accepts the
multipart upload the browser handler emits, hands the file
to the Node implementation
(`convertImageWithImageMagickNode`, etc.), stores the result
in a tmp dir, and exposes
`GET /v2/work/:id` + `GET /v2/files/:id` so
`resolveWorkFileAsBlob`'s polling loop completes the
round-trip. Anyone deploying their own `task.surf`-style
host implements the same three endpoints.

---

## 7. Per-action package export

Add a matching entry to `package.json` `exports`:

```jsonc
"./query/sql": {
  "node":    "./host/code/call/query/sql/duckdb/node.js",
  "browser": "./host/code/call/query/sql/duckdb/browser.js",
  "default": "./host/code/call/query/sql/duckdb/node.js"
}
```

Consumers then import a single action without paying for the rest:
`import { querySqlDuckdbNode } from '@cluesurf/task/query/sql'`.

---

## 8. External tool install manifests

Whenever a verb shells out to a NEW binary, add it to BOTH:

- `make/deck/docker/Dockerfile` (kitchen-sink container) and the
  matching workload Dockerfile under `make/deck/docker/<workload>/`
  (image, font, pdf, document, tex, video, embed, email, mutate,
  binary, cloud, code).
- `deck/homebrew-code/Tool/task/` + `deck/homebrew-code/Casks/task.rb`
  for macOS dev installs.
- `code/tool/shared/install-hint.ts` — cross-platform install hint
  the spawn helper prints on ENOENT.

If you skip these the verb works on your laptop and breaks for
everyone else.

---

## 9. Tests

Two harnesses share one fixture set under `seed-base/base/`:

- **CLI suite**: `test/console/<verb>.sh` — bash runner against
  the compiled binary or `pnpm tsx code/console.ts <verb> ...`.
- **Node suite**: `test/node/<verb>.test.ts` — vitest, imports
  `Task` from `~/code/node` and exercises the programmatic API.

Skip-when-uninstalled is the default: catch ENOENT-style errors
inside the test and `return` instead of throwing, so `task`
itself can ship without making CI fail on a missing `duckdb` or
`fswatch`.

---

## Quick checklist

When adding a new verb, in order:

1. [ ] Pick `code/call/<verb>/<thing>/` path (verb is verb-only;
       no noun-verb directories under `call/`).
2. [ ] Write `base.ts` with `@cluesurf/form` primitives.
3. [ ] Add `export * from './call/<verb>/<thing>/base'` to
       `code/base.ts`.
4. [ ] `pnpm make:type` to generate form/take/base/console output.
5. [ ] Write `command.ts` (pure argv builder).
6. [ ] Write `node.ts` with four-branch dispatch (or use the
       lightweight pattern only if file artifacts never move
       between machines).
7. [ ] Write `console.ts` using `buildActionCommand` + the
       generated `console/options`.
8. [ ] Wire the thing console into the verb-group `console.ts`.
       Wire the verb-group console into `code/console.ts` if it
       didn't already exist.
9. [ ] Add a method to `Task` in `code/node.ts` that lazy-imports
       the node handler.
10. [ ] Add the binary to `install-hint.ts` and the Docker /
        Homebrew manifests.
11. [ ] Add `package.json` export.
12. [ ] Drop a vitest under `test/node/<verb>.test.ts` and a
        bash suite under `test/console/<verb>.sh`.

When all twelve are checked the verb works in every direction
the rest of the codebase already works. If any are skipped the
verb either won't bundle, won't help-print, won't dispatch
remotely, or won't install on someone else's machine.
