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
 * Each verb method lazy-imports its handler on first call so the
 * Task class boots instantly without pulling every binary wrapper
 * into memory.
 */

export type TaskOptions = {
  host?: string
  code?: string
}

export default class Task {
  private host: string
  private code?: string

  constructor(options: TaskOptions = {}) {
    this.host = options.host ?? 'https://task.surf'
    this.code = options.code
  }

  /** Inject `handle: 'internal'` when not present. All
   * programmatic calls are local-internal by default. */
  private local(input: any): any {
    if (input && typeof input === 'object' && !input.handle) {
      return { ...input, handle: 'internal' }
    }
    return input
  }

  async archive(input: any) {
    const mod = await import('~/code/call/archive/node')
    return mod.default(this.local(input))
  }

  async combine(input: any) {
    const mod = await import('~/code/call/combine/node')
    return mod.default(this.local(input))
  }

  async compile(input: any) {
    const inPath = input.input?.file?.path ?? ''
    const ext = typeof inPath === 'string' ? inPath.split('.').pop()?.toLowerCase() ?? '' : ''
    switch (ext) {
      case 'c': case 'h': {
        const m = await import('~/code/call/compile/code/c/node')
        return m.default(this.local(normalized))
      }
      case 'cpp': case 'cc': case 'cxx': {
        const m = await import('~/code/call/compile/code/cpp/node')
        return m.default(this.local(normalized))
      }
      case 'rs': {
        const m = await import('~/code/call/compile/code/rust/node')
        return m.default(this.local(normalized))
      }
      case 'swift': {
        const m = await import('~/code/call/compile/code/swift/node')
        return m.default(this.local(normalized))
      }
      default:
        throw new Error(`compile: unsupported extension .${ext}`)
    }
  }

  async compress(input: any) {
    const { compressAudioNode } = await import('~/code/call/compress/audio/node')
    const { compressFontNode } = await import('~/code/call/compress/font/node')
    const { compressImageNode } = await import('~/code/call/compress/image/node')
    const { compressVideoNode } = await import('~/code/call/compress/video/node')
    // Dispatch by checking which fields exist
    if ('input' in input && 'output' in input) {
      const inPath = input.input?.file?.path ?? ''
      const ext = inPath.split('.').pop()?.toLowerCase() ?? ''
      if (['mp3', 'wav', 'flac', 'ogg', 'opus', 'm4a', 'aac'].includes(ext)) return compressAudioNode(this.local(input))
      if (['mp4', 'mov', 'mkv', 'webm', 'avi'].includes(ext)) return compressVideoNode(this.local(input))
      if (['ttf', 'otf', 'woff', 'woff2'].includes(ext)) return compressFontNode(this.local(input))
      return compressImageNode(this.local(input))
    }
    return compressImageNode(this.local(input))
  }

  async convert(input: any) {
    const { default: convertNode } = await import('~/code/call/convert/node')
    return convertNode(this.local(input))
  }

  async crop(input: any) {
    const mod = await import('~/code/call/crop/document/node')
    return mod.default(this.local(input))
  }

  async decrypt(input: any) {
    const mod = await import('~/code/call/decrypt/file/node')
    return mod.default(this.local(input))
  }

  async disassemble(input: any) {
    const { disassembleWasmNode } = await import('~/code/call/disassemble/wasm/node')
    const { disassembleJvmNode } = await import('~/code/call/disassemble/jvm/node')
    const { disassembleDotnetNode } = await import('~/code/call/disassemble/dotnet/node')
    const { disassembleRadareNode } = await import('~/code/call/disassemble/radare/node')
    const { disassembleGhidraNode } = await import('~/code/call/disassemble/ghidra/node')
    // Dispatch by input path extension or explicit tool field
    const inPath = input.input?.file?.path ?? input.input ?? ''
    const ext = typeof inPath === 'string' ? inPath.split('.').pop()?.toLowerCase() ?? '' : ''
    if (ext === 'wasm') return disassembleWasmNode(this.local(input))
    if (ext === 'class' || ext === 'jar') return disassembleJvmNode(this.local(input))
    if (ext === 'dll' || ext === 'exe') return disassembleDotnetNode(this.local(input))
    if (input.profile || input.ghidraHome) return disassembleGhidraNode(this.local(input))
    return disassembleRadareNode(this.local(input))
  }

  async dump(input: any) {
    const mod = await import('~/code/call/dump/font/node')
    return mod.default(this.local(input))
  }

  async encrypt(input: any) {
    const mod = await import('~/code/call/encrypt/file/node')
    return mod.default(this.local(input))
  }

  async flip(input: any) {
    const mod = await import('~/code/call/flip/image/node')
    return mod.default(this.local(input))
  }

  async format(input: any) {
    // Format dispatches by language. Accept either `language` or
    // `format` field. The handler schema expects `format`.
    const lang = input.language ?? input.format ?? input.input?.format
    if (!lang) throw new Error('format: language required')
    const normalized = { ...input, format: lang }
    delete normalized.language
    switch (lang) {
      case 'c': case 'cpp': case 'objc': {
        const m = await import('~/code/call/format/code/clang/node')
        return m.default(this.local(normalized))
      }
      case 'python': {
        const m = await import('~/code/call/format/code/python/node')
        return m.default(this.local(normalized))
      }
      case 'rust': {
        const m = await import('~/code/call/format/code/rust/node')
        return m.default(this.local(normalized))
      }
      case 'swift': {
        const m = await import('~/code/call/format/code/swift/node')
        return m.default(this.local(normalized))
      }
      case 'kotlin': {
        const m = await import('~/code/call/format/code/kotlin/node')
        return m.default(this.local(normalized))
      }
      case 'ruby': {
        const m = await import('~/code/call/format/code/ruby/node')
        return m.default(this.local(normalized))
      }
      case 'assembly': case 'asm': {
        const m = await import('~/code/call/format/code/assembly/node')
        return m.default(this.local(normalized))
      }
      default:
        throw new Error(`format: unsupported language "${lang}"`)
    }
  }

  async normalize(input: any) {
    const mod = await import('~/code/call/normalize/audio/node')
    return mod.default(this.local(input))
  }

  async optimize(input: any) {
    const { optimizeVideoNode } = await import('~/code/call/optimize/video/node')
    return optimizeVideoNode(this.local(input))
  }

  async pad(input: any) {
    const mod = await import('~/code/call/pad/node')
    return mod.default(this.local(input))
  }

  async remove(input: any) {
    const { removePasswordNode } = await import('~/code/call/remove/password/node')
    const { removeProfileNode } = await import('~/code/call/remove/profile/node')
    const { removeTransparencyNode } = await import('~/code/call/remove/transparency/node')
    const { removeSubtitlesNode } = await import('~/code/call/remove/subtitles/node')
    const { removeExifNode } = await import('~/code/call/remove/exif/node')
    const { removeMetadataNode } = await import('~/code/call/remove/metadata/node')
    const { removeAudioNode } = await import('~/code/call/remove/audio/node')
    // Dispatch by what fields exist
    if (input.tag || input.preset) return removeExifNode(this.local(input))
    if (input.password !== undefined) return removePasswordNode(this.local(input))
    if (input.background) return removeTransparencyNode(this.local(input))
    return removeMetadataNode(this.local(input))
  }

  async render(input: any) {
    const mod = await import('~/code/call/render/font/node')
    return mod.default(this.local(input))
  }

  async resize(input: any) {
    const mod = await import('~/code/call/resize/video/node')
    return mod.default(this.local(input))
  }

  async rotate(input: any) {
    const { rotateImageNode } = await import('~/code/call/rotate/image/node')
    return rotateImageNode(this.local(input))
  }

  async shape(input: any) {
    const mod = await import('~/code/call/shape/font/node')
    return mod.default(this.local(input))
  }

  async split(input: any) {
    const mod = await import('~/code/call/split/node')
    return mod.default(this.local(input))
  }

  async subset(input: any) {
    const mod = await import('~/code/call/subset/font/node')
    return mod.default(this.local(input))
  }

  async trim(input: any) {
    const { trimAudioNode } = await import('~/code/call/trim/audio/node')
    const { trimVideoNode } = await import('~/code/call/trim/video/node')
    const { trimImageNode } = await import('~/code/call/trim/image/node')
    const inPath = input.input?.file?.path ?? ''
    const ext = typeof inPath === 'string' ? inPath.split('.').pop()?.toLowerCase() ?? '' : ''
    if (['mp3', 'wav', 'flac', 'ogg', 'opus', 'm4a', 'aac'].includes(ext)) return trimAudioNode(this.local(input))
    if (['mp4', 'mov', 'mkv', 'webm', 'avi'].includes(ext)) return trimVideoNode(this.local(input))
    return trimImageNode(this.local(input))
  }

  async update(input: any) {
    const { updateFontNode } = await import('~/code/call/update/font/node')
    return updateFontNode(this.local(input))
  }

  async verify(input: any) {
    const mod = await import('~/code/call/verify/image/node')
    return mod.default(this.local(input))
  }

  // Network verbs (no file I/O)
  async fetch(input: any) {
    const mod = await import('~/code/call/fetch/node')
    return mod.default(this.local(input))
  }

  async search(input: any) {
    const mod = await import('~/code/call/search/node')
    return mod.default(this.local(input))
  }

  async sync(input: any) {
    const mod = await import('~/code/call/sync/node')
    return mod.default(this.local(input))
  }

  async merge(input: any) {
    const mod = await import('~/code/call/merge/node')
    return mod.default(this.local(input))
  }

  // Highlight
  async highlight(input: any) {
    const mod = await import('~/code/call/highlight/node')
    return mod.default(this.local(input))
  }
}

export { Task }
