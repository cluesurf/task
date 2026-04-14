# Public API Design: `import task from '@cluesurf/task'`

Goal: ship a single default-exported `task` object where every
top-level action (`convert`, `format`, `archive`, `extract`,
`upload`, `download`, `compile`, etc.) is a single method with
typed overloads. The user passes a plain input object; task
figures out the right concrete implementation at runtime.

Yes, TypeScript handles this cleanly via function overloads.

## Shape

```ts
import task from '@cluesurf/task'

const out = await task.convert({
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})
```

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

```ts
// code/form/task/dispatch.node.ts (AUTO-GENERATED)
import IMAGEMAGICK_IN from '~/code/form/object/imagemagick/imagemagick.format.input.json'
import IMAGEMAGICK_OUT from '~/code/form/object/imagemagick/imagemagick.format.output.json'
import FFMPEG_IN from '~/code/form/object/ffmpeg/ffmpeg.format.input.json'
import FFMPEG_OUT from '~/code/form/object/ffmpeg/ffmpeg.format.output.json'
// ... one pair per tool

export const convertDispatchNode: ConvertEntry[] = [
  {
    tool: 'imagemagick',
    input:  new Set(IMAGEMAGICK_IN),
    output: new Set(IMAGEMAGICK_OUT),
    load:   () => import('~/code/call/convert/image/imagemagick/node'),
  },
  {
    tool: 'ffmpeg',
    input:  new Set(FFMPEG_IN),
    output: new Set(FFMPEG_OUT),
    load:   () => import('~/code/call/convert/video/ffmpeg/node'),
  },
  // ...
]
```

Lookup walks the table and picks the first entry whose `input` and
`output` sets both contain the requested formats. `O(tools)` — usually
under 20 — not `O(in × out)`.

```ts
function pickConvertEntry(inFmt: string, outFmt: string, tool?: string) {
  for (const entry of convertDispatchNode) {
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
`code/form/task/browser.ts` also emits `code/form/task/dispatch.node.ts`
and `code/form/task/dispatch.browser.ts` from the same schema
data — single source of truth.

## Typing: overloads

Each verb is declared as a set of overloaded function signatures.
Per-overload types come from the generated schema output in
`code/form/action/<action>/<thing>/node/index.ts`.

```ts
// Generated per action/thing by pnpm make:type.
import type { ConvertImageWithImageMagickNodeInput, ConvertImageWithImageMagickNodeOutput } from '@/form/action/convert/image/imagemagick/node'
import type { ConvertVideoWithFfmpegNodeInput, ConvertVideoWithFfmpegNodeOutput } from '@/form/action/convert/video/ffmpeg/node'
import type { ConvertArchiveNodeInput, ConvertArchiveNodeOutput } from '@/form/action/convert/archive/node'
// ... more

export interface Task {
  convert(input: ConvertImageWithImageMagickNodeInput): Promise<ConvertImageWithImageMagickNodeOutput>
  convert(input: ConvertVideoWithFfmpegNodeInput): Promise<ConvertVideoWithFfmpegNodeOutput>
  convert(input: ConvertArchiveNodeInput): Promise<ConvertArchiveNodeOutput>
  // ... and so on for every (from-format → to-format) the system supports
}
```

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

Minimal, shared between browser and node:

```ts
// code/index.ts (shared default export)
import { convert } from './dispatch/convert'
import { format } from './dispatch/format'
import { archive } from './dispatch/archive'
import { extract } from './dispatch/extract'
import { compile } from './dispatch/compile'
import { upload } from './dispatch/upload'
import { download } from './dispatch/download'
import { open } from './dispatch/open'
import type { Task } from './form/task'

let apiKey: string | undefined

const task: Task & {
  code(key: string): void
  wait(work: Work): Promise<void>
  resolve<T>(work: Work): Promise<T>
} = {
  convert,
  format,
  archive,
  extract,
  compile,
  upload,
  download,
  open,

  code(key) {
    apiKey = key
  },
  async wait(work) {
    /* poll remote server until done */
  },
  async resolve(work) {
    /* fetch final output by work id */
  },
}

export default task
```

Each dispatch function reads the input, finds the matching tool entry,
lazy-imports it, and invokes:

```ts
// code/dispatch/convert.node.ts
import { convertDispatchNode } from '~/code/form/task/dispatch.node'

export async function convert(input: any): Promise<any> {
  if (input.remote) return runRemote('convert', input)
  if (input.explain) return describe('convert', input)

  const entry = pickConvertEntry(
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
- `remote: true`: serialize the input, POST to the task.surf
  HTTP server, return a `Work` handle. Uses the `code(...)`
  registered API key.

`work: true` returns immediately with the work handle. Without
it, the remote path blocks until completion and returns the
final output.

Single helper function covers remote dispatch; every verb calls
it up front:

```ts
async function runRemote(verb: string, input: any) {
  const res = await fetch(`${TASK_SURF_URL}/${verb}`, {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(await res.text())
  const work = await res.json()
  return input.work ? work : resolveWork(work)
}
```

## Browser vs node

Two different default exports, same interface:

- `code/index.node.ts` — dispatches to `node.ts` files.
- `code/index.browser.ts` — dispatches to `browser.ts` files.
  Browser-only transports (WASM, fetch) are what the
  per-thing `browser.ts` files already wrap.

`package.json` `exports` field picks the right one via the
`node` / `browser` / `default` conditions:

```json
{
  "exports": {
    ".": {
      "node": "./host/code/index.node.js",
      "browser": "./host/code/index.browser.js",
      "default": "./host/code/index.node.js",
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
- **`task.code(apiKey)`**: sets module-level API key for remote
  calls. Not a verb, no overloads needed.
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
   `code/form/task/dispatch.node.ts` and
   `code/form/task/dispatch.browser.ts` — one entry per tool, each
   entry holding the tool's `*_input_format` / `*_output_format`
   `List`s as `Set`s plus a lazy `load()`. No `in×out` cross-product.
3. Write `code/dispatch/<verb>.ts` for each top-level verb. Each
   imports the generated dispatch table, scans for a matching entry,
   and invokes. Handles `remote` / `explain` up front.
4. Write `code/index.node.ts` and `code/index.browser.ts` as
   thin wrappers that expose the `Task` object.
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
