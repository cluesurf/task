/**
 * Programmatic Node.js API for `@cluesurf/task`. Usage:
 *
 *   import Task from '@cluesurf/task'
 *   const task = new Task()
 *   await task.convert({
 *     input:  { format: 'png', file: { path: 'a.png' } },
 *     output: { format: 'jpg', file: { path: 'a.jpg' } },
 *   })
 *
 * Each verb method lazy-imports its handler on first call.
 */

export type TaskOptions = {
  host?: string
  code?: string
}

type Handler = (input: any) => Promise<any>

/** Extension → handler module path for multi-kind verbs. */
type ExtRoute = Record<string, string>

const AUDIO_EXTS = ['mp3', 'wav', 'flac', 'ogg', 'opus', 'm4a', 'aac']
const VIDEO_EXTS = ['mp4', 'mov', 'mkv', 'webm', 'avi', 'm4v']
const FONT_EXTS = ['ttf', 'otf', 'woff', 'woff2', 'eot']

function extOf(input: any): string {
  const p = input?.input?.file?.path ?? ''
  return typeof p === 'string'
    ? (p.split('.').pop()?.toLowerCase() ?? '')
    : ''
}

function extMatch(ext: string, list: string[]): boolean {
  return list.includes(ext)
}

export default class Task {
  private host: string
  private code?: string

  constructor(options: TaskOptions = {}) {
    this.host = options.host ?? 'https://task.surf'
    this.code = options.code
  }

  /** Inject `handle: 'internal'` when not present. */
  private local(input: any): any {
    if (input && typeof input === 'object' && !input.handle) {
      return { ...input, handle: 'internal' }
    }
    return input
  }

  /** Load a default export and call it. */
  private async run(mod: string, input: any): Promise<any> {
    const m = await import(mod)
    return m.default(this.local(input))
  }

  /** Load a named export and call it. */
  private async call(
    mod: string,
    name: string,
    input: any,
  ): Promise<any> {
    const m = await import(mod)
    return m[name](this.local(input))
  }

  /** Dispatch by input file extension. */
  private async byExt(
    input: any,
    routes: ExtRoute,
    fallback?: string,
  ): Promise<any> {
    const ext = extOf(input)
    for (const [exts, mod] of Object.entries(routes)) {
      if (exts.split(',').includes(ext)) {
        return this.run(mod, input)
      }
    }
    if (fallback) return this.run(fallback, input)
    throw new Error(`No handler for extension .${ext}`)
  }

  // ── Single-handler verbs ───────────────────────────

  archive(i: any) { return this.run('~/code/call/archive/node', i) }
  combine(i: any) { return this.run('~/code/call/combine/node', i) }
  crop(i: any) { return this.run('~/code/call/crop/document/node', i) }
  decrypt(i: any) { return this.run('~/code/call/decrypt/file/node', i) }
  dump(i: any) { return this.run('~/code/call/dump/font/node', i) }
  encrypt(i: any) { return this.run('~/code/call/encrypt/file/node', i) }
  fetch(i: any) { return this.run('~/code/call/fetch/node', i) }
  flip(i: any) { return this.run('~/code/call/flip/image/node', i) }
  highlight(i: any) { return this.run('~/code/call/highlight/node', i) }
  merge(i: any) { return this.run('~/code/call/merge/node', i) }
  normalize(i: any) { return this.run('~/code/call/normalize/audio/node', i) }
  pad(i: any) { return this.run('~/code/call/pad/node', i) }
  render(i: any) { return this.run('~/code/call/render/font/node', i) }
  search(i: any) { return this.run('~/code/call/search/node', i) }
  shape(i: any) { return this.run('~/code/call/shape/font/node', i) }
  split(i: any) { return this.run('~/code/call/split/node', i) }
  subset(i: any) { return this.run('~/code/call/subset/font/node', i) }
  sync(i: any) { return this.run('~/code/call/sync/node', i) }
  verify(i: any) { return this.run('~/code/call/verify/image/node', i) }

  // ── Format-pair dispatch ───────────────────────────

  async convert(input: any) {
    const { default: fn } = await import('~/code/call/convert/node')
    return fn(this.local(input))
  }

  // ── Extension-dispatched verbs ─────────────────────

  compress(input: any) {
    return this.byExt(input, {
      [AUDIO_EXTS.join(',')]: '~/code/call/compress/audio/node',
      [VIDEO_EXTS.join(',')]: '~/code/call/compress/video/node',
      [FONT_EXTS.join(',')]: '~/code/call/compress/font/node',
    }, '~/code/call/compress/image/node')
  }

  trim(input: any) {
    return this.byExt(input, {
      [AUDIO_EXTS.join(',')]: '~/code/call/trim/audio/node',
      [VIDEO_EXTS.join(',')]: '~/code/call/trim/video/node',
    }, '~/code/call/trim/image/node')
  }

  resize(input: any) {
    return this.byExt(input, {
      [VIDEO_EXTS.join(',')]: '~/code/call/resize/video/node',
    }, '~/code/call/resize/image/node')
  }

  rotate(input: any) {
    return this.byExt(input, {
      [VIDEO_EXTS.join(',')]: '~/code/call/rotate/video/node',
    }, '~/code/call/rotate/image/node')
  }

  update(input: any) {
    return this.byExt(input, {
      [FONT_EXTS.join(',')]: '~/code/call/update/font/node',
      [VIDEO_EXTS.join(',')]: '~/code/call/update/video/node',
    }, '~/code/call/update/image/node')
  }

  optimize(input: any) {
    return this.byExt(input, {
      [VIDEO_EXTS.join(',')]: '~/code/call/optimize/video/node',
    }, '~/code/call/optimize/image/local/node')
  }

  // ── Compile by extension ───────────────────────────

  compile(input: any) {
    const ext = extOf(input)
    const map: Record<string, string> = {
      c: '~/code/call/compile/code/c/node',
      h: '~/code/call/compile/code/c/node',
      cpp: '~/code/call/compile/code/cpp/node',
      cc: '~/code/call/compile/code/cpp/node',
      cxx: '~/code/call/compile/code/cpp/node',
      rs: '~/code/call/compile/code/rust/node',
      swift: '~/code/call/compile/code/swift/node',
    }
    const mod = map[ext]
    if (!mod) throw new Error(`compile: unsupported extension .${ext}`)
    return this.run(mod, input)
  }

  // ── Format by language ─────────────────────────────

  format(input: any) {
    const lang = input.language ?? input.format
    if (!lang) throw new Error('format: language required')
    const map: Record<string, string> = {
      c: '~/code/call/format/code/clang/node',
      cpp: '~/code/call/format/code/clang/node',
      objc: '~/code/call/format/code/clang/node',
      python: '~/code/call/format/code/python/node',
      rust: '~/code/call/format/code/rust/node',
      swift: '~/code/call/format/code/swift/node',
      kotlin: '~/code/call/format/code/kotlin/node',
      ruby: '~/code/call/format/code/ruby/node',
      assembly: '~/code/call/format/code/assembly/node',
      asm: '~/code/call/format/code/assembly/node',
    }
    const mod = map[lang]
    if (!mod) throw new Error(`format: unsupported language "${lang}"`)
    // Normalize language → format for the handler schema
    const normalized = { ...input, format: lang }
    delete normalized.language
    return this.run(mod, normalized)
  }

  // ── Disassemble by extension / fields ──────────────

  disassemble(input: any) {
    const ext = extOf(input)
    if (ext === 'wasm') return this.run('~/code/call/disassemble/wasm/node', input)
    if (ext === 'class' || ext === 'jar') return this.run('~/code/call/disassemble/jvm/node', input)
    if (ext === 'dll' || ext === 'exe') return this.run('~/code/call/disassemble/dotnet/node', input)
    if (input.ghidraHome || input.profile === 'imports' || input.profile === 'exports')
      return this.run('~/code/call/disassemble/ghidra/node', input)
    return this.run('~/code/call/disassemble/radare/node', input)
  }

  // ── Remove by field presence ───────────────────────

  remove(input: any) {
    if (input.tag || input.preset) return this.run('~/code/call/remove/exif/node', input)
    if (input.password !== undefined) return this.run('~/code/call/remove/password/node', input)
    if (input.background) return this.run('~/code/call/remove/transparency/node', input)
    return this.run('~/code/call/remove/metadata/node', input)
  }

  // ── Inspect ────────────────────────────────────────

  inspect(input: any) {
    if (input.kind === 'metadata') return this.run('~/code/call/inspect/metadata/node', input)
    return this.run('~/code/call/inspect/file/node', input)
  }

  // ── Set (encoding, eol, metadata) ──────────────────

  set(input: any) {
    if (input.encoding) return this.call('~/code/call/set/encoding/node', 'setEncodingNode', input)
    if (input.eol) return this.call('~/code/call/set/eol/node', 'setEolNode', { target: input.eol, file: input.file, output: input.output })
    if (input.title || input.artist || input.album) return this.run('~/code/call/set/metadata/node', input)
    throw new Error('set: specify encoding, eol, or metadata fields')
  }

  // ── Detect ─────────────────────────────────────────

  detect(input: any) {
    return this.call('~/code/call/detect/bidi/node', 'detectBidiNode', input)
  }
}

export { Task }
