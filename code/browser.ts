/**
 * Programmatic browser API for `@cluesurf/task`. Usage:
 *
 *   import Task from '@cluesurf/task/browser'
 *   const task = new Task({ host: 'http://localhost:5010/v2' })
 *   const out = await task.convert({
 *     input:  { format: 'png', file: { content: blob, sha256 } },
 *     output: { format: 'jpg' },
 *   })
 *   // out.file.content is a Blob
 *
 * Mirrors `code/node.ts`. Defaults `handle` to `'remote'`
 * and configures the shared `remote` base URL on
 * construction so every per-verb browser handler routes to
 * the host the caller passed in.
 *
 * Each method lazy-imports its handler on first call so
 * cold boot only pays for type-stripped routing — the
 * per-verb browser modules (which may bundle WASM later)
 * load when their verb runs.
 */

import {
  configure,
  DEFAULT_REMOTE_TASK_PATH,
} from '~/code/tool/shared/config'
import type { WorkFileAsBlob } from '~/code/tool/shared/work'
import type { NativeOptions } from '~/code/tool/shared/request'

export type TaskOptions = {
  host?: string
}

type BrowserVerb<I = unknown, O = WorkFileAsBlob> = (
  input: I,
  native?: NativeOptions,
) => Promise<O>

type BrowserLoader<I = unknown, O = WorkFileAsBlob> = () => Promise<{
  default: BrowserVerb<I, O>
}>

export default class Task {
  private host: string

  constructor(options: TaskOptions = {}) {
    this.host = options.host ?? DEFAULT_REMOTE_TASK_PATH
    configure('remote', this.host)
    configure('environment', 'browser')
  }

  /** Tag input with `handle: 'remote'` so handler dispatch lands on the remote branch. */
  private remote<T>(input: T): T {
    if (input && typeof input === 'object' && !('handle' in input)) {
      return { ...input, handle: 'remote' } as T
    }
    return input
  }

  /** Lazy-import a verb module and call its default export. */
  private async run<I, O = WorkFileAsBlob>(
    loader: BrowserLoader<I, O>,
    input: I,
    native?: NativeOptions,
  ): Promise<O> {
    const m = await loader()
    return m.default(this.remote(input), native)
  }

  // ── Single-handler verbs ───────────────────────────

  archive(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.archive, i, native)
  }
  combine(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.combine, i, native)
  }
  compile(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.compile, i, native)
  }
  compress(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.compress, i, native)
  }
  convert(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.convert, i, native)
  }
  crop(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.crop, i, native)
  }
  decrypt(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.decrypt, i, native)
  }
  detect(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.detect, i, native)
  }
  disassemble(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.disassemble, i, native)
  }
  dump(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.dump, i, native)
  }
  encrypt(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.encrypt, i, native)
  }
  fetch(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.fetch, i, native)
  }
  flip(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.flip, i, native)
  }
  format(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.format, i, native)
  }
  highlight(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.highlight, i, native)
  }
  inspect(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.inspect, i, native)
  }
  merge(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.merge, i, native)
  }
  normalize(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.normalize, i, native)
  }
  optimize(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.optimize, i, native)
  }
  pad(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.pad, i, native)
  }
  query(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.query, i, native)
  }
  remove(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.remove, i, native)
  }
  render(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.render, i, native)
  }
  resize(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.resize, i, native)
  }
  rotate(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.rotate, i, native)
  }
  sanitize(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.sanitize, i, native)
  }
  search(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.search, i, native)
  }
  set(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.set, i, native)
  }
  shape(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.shape, i, native)
  }
  split(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.split, i, native)
  }
  subset(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.subset, i, native)
  }
  trim(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.trim, i, native)
  }
  update(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.update, i, native)
  }
  verify(i: unknown, native?: NativeOptions) {
    return this.run(LOAD.verify, i, native)
  }
}

/**
 * Static loader table — webpack needs literal `import(...)`
 * targets to bundle the chunks. Update this when adding a
 * new verb's top-level browser module.
 */
const LOAD = {
  archive: () => import('~/code/call/archive/browser') as never,
  combine: () => import('~/code/call/combine/browser') as never,
  compile: () => import('~/code/call/compile/browser') as never,
  compress: () => import('~/code/call/compress/browser') as never,
  convert: () => import('~/code/call/convert/browser') as never,
  crop: () => import('~/code/call/crop/browser') as never,
  decrypt: () => import('~/code/call/decrypt/browser') as never,
  detect: () => import('~/code/call/detect/browser') as never,
  disassemble: () => import('~/code/call/disassemble/browser') as never,
  dump: () => import('~/code/call/dump/browser') as never,
  encrypt: () => import('~/code/call/encrypt/browser') as never,
  fetch: () => import('~/code/call/fetch/browser') as never,
  flip: () => import('~/code/call/flip/browser') as never,
  format: () => import('~/code/call/format/browser') as never,
  highlight: () => import('~/code/call/highlight/browser') as never,
  inspect: () => import('~/code/call/inspect/browser') as never,
  merge: () => import('~/code/call/merge/browser') as never,
  normalize: () => import('~/code/call/normalize/browser') as never,
  optimize: () => import('~/code/call/optimize/browser') as never,
  pad: () => import('~/code/call/pad/browser') as never,
  query: () => import('~/code/call/query/browser') as never,
  remove: () => import('~/code/call/remove/browser') as never,
  render: () => import('~/code/call/render/browser') as never,
  resize: () => import('~/code/call/resize/browser') as never,
  rotate: () => import('~/code/call/rotate/browser') as never,
  sanitize: () => import('~/code/call/sanitize/browser') as never,
  search: () => import('~/code/call/search/browser') as never,
  set: () => import('~/code/call/set/browser') as never,
  shape: () => import('~/code/call/shape/browser') as never,
  split: () => import('~/code/call/split/browser') as never,
  subset: () => import('~/code/call/subset/browser') as never,
  trim: () => import('~/code/call/trim/browser') as never,
  update: () => import('~/code/call/update/browser') as never,
  verify: () => import('~/code/call/verify/browser') as never,
} satisfies Record<string, BrowserLoader>

export { Task }
