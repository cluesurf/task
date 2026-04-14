# Public API Design: `import task from '@cluesurf/task'`

Goal: ship a single default-exported `task` object where every
top-level action (`convert`, `format`, `archive`, `extract`,
`upload`, `download`, `compile`, etc.) is a single method with
typed overloads. The user passes a plain input object; task
figures out the right concrete implementation at runtime.

Yes, TypeScript handles this cleanly via function overloads.

## Shape

```ts
import Task from '@cluesurf/task'

const task = new Task({ host: 'https://task.surf' }) // host optional

const out = await task.convert({
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})
```

`Task` is a class, not a singleton. Construct it with an optional
`host` (for remote dispatch) and optional `code`. Multiple instances
with different hosts / keys can coexist — useful for tests and for
apps talking to more than one backend.

One verb method per top-level action. Input is a nested object.
Output depends on the dispatched sub-thing.

## How dispatch works

Each top-level verb looks at the input and routes to the
matching `code/call/<verb>/<thing>/node.ts` (or `browser.ts`).
The routing key depends on the verb:

| Verb | Dispatch key |
|---|---|
| `convert` | `(input.format, output.format)` pair |
| `format` | `input.format` |
| `archive` | `output.format` (zip, tar, 7z...) |
| `extract` | `input.format` |
| `compile` | `input.format` |
| `upload` | `location.service` |
| `download` | `location.service` |
| `inspect` | `input.format` or `input.kind` |
| `optimize` | `input.format` |
| `disassemble` | `input.format` |

### Dispatch table shape

A flat `Record<"in:out", loader>` does not scale. Tools like ffmpeg
declare hundreds of input formats and hundreds of output formats —
materialising `in×out` pairs would produce tens of thousands of
entries per tool, most of them never hit.

Instead, codegen emits one **entry per tool**, pointing at the
already-existing format `List`s:

### Two-level lazy loading

The format lists can be huge — ffmpeg has hundreds of codecs,
imagemagick has 200+ formats — and the handler modules themselves
pull in `child_process`, WASM binaries, pandoc wrappers, etc. The
router should pay for neither until it has to. So each route entry
holds **two** lazy loaders:

1. **`loadBase()`** — imports just the tool's format definitions
   (`code/form/object/<tool>/base.ts`, a small value-only module of
   string arrays). Used to *decide* whether this tool handles the
   requested `(in, out)` pair.
2. **`loadCall()`** — imports the actual handler
   (`code/call/<action>/<thing>/<tool>/node.ts`), which pulls in the
   native-tool wrapper, `child_process`, etc. Only loaded after the
   base-level probe picks this tool.

```ts
// code/form/task/route/node.ts (AUTO-GENERATED)
export type ConvertRoute = {
  tool: string
  loadBase: () => Promise<{
    input: ReadonlyArray<string>
    output: ReadonlyArray<string>
  }>
  loadCall: () => Promise<{
    run: (input: any, ctx: CallContext) => Promise<any>
  }>
}

export const convertRouteNode: ConvertRoute[] = [
  {
    tool: 'imagemagick',
    loadBase: () => import('~/code/form/object/imagemagick/base'),
    loadCall: () => import('~/code/call/convert/image/imagemagick/node'),
  },
  {
    tool: 'ffmpeg',
    loadBase: () => import('~/code/form/object/ffmpeg/base'),
    loadCall: () => import('~/code/call/convert/video/ffmpeg/node'),
  },
  // ...
]
```

Router walks the table, awaits `loadBase()` for each tool until the
format sets match, then awaits `loadCall()` on the winner and runs:

```ts
async function runConvert(input: any, ctx: CallContext) {
  for (const route of convertRouteNode) {
    if (input.tool && route.tool !== input.tool) continue
    const base = await route.loadBase()
    if (
      base.input.includes(input.input.format) &&
      base.output.includes(input.output.format)
    ) {
      const call = await route.loadCall()
      return call.run(input, ctx)
    }
  }
  throw new Error(
    `No handler for convert ${input.input.format} → ${input.output.format}`,
  )
}
```

Both levels are cached by the module system. A repeated
`task.convert(...)` with the same tool pair pays zero additional
imports. An explicit `input.tool: 'pandoc'` skips the probe entirely:
only pandoc's `loadBase` + `loadCall` fire.

Base modules stay small on purpose — they export only string arrays
of supported formats, no runtime code, no heavy imports. If a
`form/object/<tool>/base.ts` ever starts pulling in non-trivial
dependencies, split out a dedicated `format.ts` sibling and point
`loadBase` at that instead.

### Eager vs lazy rule

The only things allowed to be imported eagerly (non-`import type`)
anywhere in the `Task` class entrypoint (`code/node.ts`,
`code/browser.ts`) or the generated `code/form/task/route/*.ts` are
**pure type declarations** — what lives in `code/form/.../index.ts`
and the `TaskSurface` interface itself. Those import statements
erase to nothing at runtime.

Every value — format arrays, codec lists, constants from
`code/form/object/<tool>/base.ts`, the tool's `run` function —
must only be reachable through a `() => import(...)` in a route
entry. That keeps the boot cost of `new Task()` to exactly the size
of the type-stripped entrypoint plus the route tables.

Lookup walks the table and picks the first entry whose `input` and
`output` sets both contain the requested formats. `O(tools)` — usually
under 20 — not `O(in × out)`.

```ts
function pickConvertRoute(inFmt: string, outFmt: string, tool?: string) {
  for (const entry of convertRouteNode) {
    if (tool && entry.tool !== tool) continue
    if (entry.input.has(inFmt) && entry.output.has(outFmt)) return entry
  }
  return undefined
}
```

Ordering matters when two tools overlap (e.g. pandoc and libre-office
both handle `docx:pdf`). Either sort the table with a per-pair
preference and let the caller override with `input.tool: 'pandoc'`,
or keep the preferred tool first in the list.

The same codegen pass that emits `code/form/task/node.ts` and
`code/form/task/browser.ts` also emits `code/form/task/route/node.ts`
and `code/form/task/route/browser.ts` from the same schema
data — single source of truth.

## Typing: overloads

Each verb is declared as a set of overloaded function signatures.
Per-overload types come from the generated schema output in
`code/form/action/<action>/<thing>/node/index.ts`.

```ts
// code/form/task/node.ts — AUTO-GENERATED by pnpm make:type.
import type { ConvertImageWithImageMagickNodeInput, ConvertImageWithImageMagickNodeOutput } from '~/code/form/action/convert/imagemagick/node'
import type { ConvertVideoWithFfmpegNodeInput, ConvertVideoWithFfmpegNodeOutput } from '~/code/form/action/convert/ffmpeg/node'
import type { ConvertArchiveNodeInput, ConvertArchiveNodeOutput } from '~/code/form/action/convert/archive/node'
// ... more

export interface TaskSurface {
  convert(input: ConvertImageWithImageMagickNodeInput): Promise<ConvertImageWithImageMagickNodeOutput>
  convert(input: ConvertVideoWithFfmpegNodeInput): Promise<ConvertVideoWithFfmpegNodeOutput>
  convert(input: ConvertArchiveNodeInput): Promise<ConvertArchiveNodeOutput>
  // ... and so on for every (from-format → to-format) the system supports
}
```

The generated file declares the typed overload surface as an
`interface TaskSurface`. The runtime class `Task` (below) implements
that interface — the class carries the constructor, `host`, and
`code` state; the interface carries the typed method signatures.

TypeScript picks the right overload when the user passes an
object whose `format` combination matches one declared shape.
The return type is the matching `*Output` type.

Tradeoffs:

- **Pros**: excellent editor experience, full IntelliSense for
  each supported conversion, return-type narrowing automatically.
- **Cons**: the overload list grows as you add supported tools.
  Need to generate it automatically (see "Auto-generated
  overloads" below) rather than hand-maintaining it.

## Typing: discriminated unions (alternative)

If the overload list would be unwieldy, collapse it to a
discriminated union:

```ts
type ConvertInput =
  | ConvertImageInput
  | ConvertVideoInput
  | ConvertArchiveInput
  | ConvertDocumentInput
  | ConvertFontInput

export interface Task {
  convert(input: ConvertInput): Promise<ConvertOutput>
}
```

Cleaner signature but loses per-case return-type narrowing
unless the union is crafted so the discriminator (e.g.
`input.format` + `output.format`) picks the output. Overloads
give a nicer DX.

## Auto-generated overloads

Don't hand-write the overload list. Instead, extend
`make/index.ts` to emit `code/form/task/node.ts` and `code/form/task/browser.ts`:

```ts
// AUTO-GENERATED by pnpm make:type.
export interface Task {
  convert(input: ConvertImageWithImageMagickNodeInput): Promise<ConvertImageWithImageMagickNodeOutput>
  convert(input: ConvertImageWithInkscapeNodeInput): Promise<ConvertImageWithInkscapeNodeOutput>
  convert(input: ConvertVideoWithFfmpegNodeInput): Promise<ConvertVideoWithFfmpegNodeOutput>
  // ... one line per (action × thing × tool) that has a node.ts
  format(input: FormatPythonNodeInput): Promise<FormatPythonNodeOutput>
  format(input: FormatRustNodeInput): Promise<FormatRustNodeOutput>
  // ...
}
```

The generator walks the mesh and emits one overload per action
input form that ends in `_node_input` or `_browser_input`. The
same codegen already produces the types — it just needs to
collect them into a Task interface.

## Runtime implementation

`Task` is a class. Each instance holds its own `host` and `code`,
so multiple clients (different backends, tests) can coexist.

```ts
// code/node.ts — default export
import type { TaskSurface } from '~/code/form/task/node'
import { convertNode } from '~/code/call/convert/node'
import { formatNode } from '~/code/call/format/node'
import { archiveNode } from '~/code/call/archive/node'
// ... one per verb

export type TaskOptions = {
  host?: string   // remote dispatch endpoint (default: https://task.surf)
  code?: string // API key for remote calls
}

export type Work = { id: string }

export default class Task implements TaskSurface {
  private host: string
  private code?: string

  constructor(options: TaskOptions = {}) {
    this.host = options.host ?? 'https://task.surf'
    this.code = options.code
  }

  convert(input: any): Promise<any> {
    return convertNode(input, { host: this.host, code: this.code })
  }
  format(input: any): Promise<any> {
    return formatNode(input, { host: this.host, code: this.code })
  }
  archive(input: any): Promise<any> {
    return archiveNode(input, { host: this.host, code: this.code })
  }
  // ... one method per verb

  async wait(work: Work): Promise<void> {
    /* poll remote server until done */
  }

  async resolve<T>(work: Work): Promise<T> {
    /* fetch final output by work id */
    return {} as T
  }
}
```

The method bodies all have a single implementation signature (`input: any`)
that is broader than the overloads declared on `TaskSurface`. TypeScript
uses the interface overloads for call-site type checking; the broad
body signature is what actually runs. This is the standard way to
implement overloaded methods on a class.

Browser entrypoint mirrors this at `code/browser.ts`, importing
browser-side verb routers and `TaskSurface` from `~/code/form/task/browser`.

Each dispatch function reads the input, finds the tool route,
lazy-imports it, and invokes. The class passes its per-instance
`host` + `code` through as a second argument:

```ts
// code/call/convert/node.ts
import { convertRouteNode } from '~/code/form/task/route/node'

export type CallContext = { host: string; code?: string }

export async function convertNode(input: any, ctx: CallContext): Promise<any> {
  if (input.remote) return runRemote('convert', input, ctx)
  if (input.explain) return describe('convert', input)

  const entry = pickConvertRoute(
    input.input.format,
    input.output.format,
    input.tool,
  )
  if (!entry) {
    throw new Error(
      `No handler for convert ${input.input.format} → ${input.output.format}`,
    )
  }
  const mod = await entry.load()
  const fn = mod.default ?? Object.values(mod).find(f => typeof f === 'function')
  return fn(input)
}
```

## Remote vs local

Controlled by the `remote` flag on input:

- `remote: false` (default): run locally via the lazy-loaded
  `node.ts` or `browser.ts`.
- `remote: true`: serialize the input, POST to the configured
  `host`, return a `Work` handle. Uses the instance's `code`.

`work: true` returns immediately with the work handle. Without
it, the remote path blocks until completion and returns the
final output.

Single helper covers remote dispatch; every verb calls it up front:

```ts
async function runRemote(verb: string, input: any, ctx: CallContext) {
  const res = await fetch(`${ctx.host}/${verb}`, {
    method: 'POST',
    headers: {
      ...(ctx.code ? { 'x-api-key': ctx.code } : {}),
      'content-type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(await res.text())
  const work = await res.json()
  return input.work ? work : resolveWork(work, ctx)
}
```

## Browser vs node

Two different default exports, same interface:

- `code/node.ts` — default export: `class Task` for Node.
- `code/browser.ts` — default export: `class Task` for browser.
  Browser-only transports (WASM, fetch) are what the
  per-thing `browser.ts` files already wrap.

`package.json` `exports` field picks the right one via the
`node` / `browser` / `default` conditions:

```json
{
  "exports": {
    ".": {
      "node": "./host/code/node.js",
      "browser": "./host/code/browser.js",
      "default": "./host/code/node.js",
      "types": "./host/code/form/task.d.ts"
    }
  }
}
```

Both files import the same auto-generated `Task` interface so
the public TypeScript surface is identical.

## Extras already in the desired API

- **`task.open(...)`**: opens output in a viewer window (local)
  or browser tab (browser). Dispatches on `format` (`window`,
  `tab`, `preview`). Same shape as other verbs.
- **`new Task({ code })`**: API key for remote calls. Passed to the
  constructor; no separate setter method.
- **`task.wait(work)` / `task.resolve(work)`**: Work helpers.
  Poll the remote server for status or fetch the final output
  by work ID. Typed against a `Work` handle returned by
  `remote: true, work: true` calls.
- **`task.explain: true`**: short-circuits to return the
  resolved command/plan instead of executing. The existing
  `handler.ts` in each action already knows the shape; dispatch
  returns that instead of running.

## Work items

1. Extend `make/index.ts` to emit `code/form/task/node.ts` and
   `code/form/task/browser.ts` with the overloaded `Task` interface.
   One overload per concrete action.thing.tool that has a
   `_node_input` / `_browser_input` form. **(done)**
2. Extend `make/index.ts` to also emit
   `code/form/task/route/node.ts` and
   `code/form/task/route/browser.ts` — one entry per tool, each
   entry holding the tool's `*_input_format` / `*_output_format`
   `List`s as `Set`s plus a lazy `load()`. No `in×out` cross-product.
3. Write `code/call/<verb>/{node,browser}.ts` for each top-level verb. Each
   imports the generated dispatch table, scans for a matching entry,
   and invokes. Handles `remote` / `explain` up front.
4. Write `code/node.ts` and `code/browser.ts` — thin entrypoints that
   export a `default class Task implements TaskSurface`, with a
   constructor taking `{ host?, code? }` and one method per verb.
5. Add `remote`, `work`, `explain` flags to every action schema
   (or add them in a common-inputs helper so they're applied
   uniformly).
6. Update `package.json` `exports` to map `.` to the new
   entrypoints with `node` / `browser` conditions.
7. Keep the per-action exports (`@cluesurf/task/convert/data`
   etc.) as escape hatches for users who want to skip the
   dispatch layer.

## Is this feasible?

Yes. The dispatch object with overloaded methods is a common
TypeScript pattern. Real-world examples: `axios` (method-level
overloads for each HTTP verb), `sharp` (overloaded image-op
signatures), `ffmpeg-concat` style wrappers. The only
non-trivial piece is automating the overload emission from the
form schemas, and that's additive to the existing codegen —
nothing structural changes.
