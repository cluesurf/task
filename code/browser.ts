/**
 * Programmatic browser API for `@cluesurf/task`. Usage:
 *
 *   import Task from '@cluesurf/task/browser'
 *   const task = new Task({ host: 'http://localhost:4000/v2' })
 *   const out = await task.convert({
 *     input: {
 *       format: 'png',
 *       file: { sha256, content: blobOrFile },
 *     },
 *     output: { format: 'jpg' },
 *   })
 *   // out.file.content is a Blob
 *
 * Mirrors `code/node.ts` but defaults `handle` to `'remote'`
 * and configures the shared `remote` base URL on construction
 * so every `<verb>BrowserRemote` call routes to the host the
 * caller passed in.
 *
 * Each method lazy-imports its handler on first call so cold
 * boot only pays for type-stripped routing — the per-verb
 * browser modules (which may bundle WASM later) load when
 * their verb runs.
 */

import { configure, DEFAULT_REMOTE_TASK_PATH } from '~/code/tool/shared/config'
import type {
  ConvertBrowserInput,
  ConvertBrowserOutput,
} from '~/code/form/export/browser'
import type { WorkFileAsBlob } from '~/code/tool/shared/work'
import type { NativeOptions } from '~/code/tool/shared/request'

export type TaskOptions = {
  host?: string
}

export type MediaKind =
  | 'image'
  | 'audio'
  | 'video'
  | 'font'
  | 'document'
  | 'archive'
  | 'data'

const KIND_BY_EXT: Record<string, MediaKind> = {
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  gif: 'image',
  webp: 'image',
  bmp: 'image',
  tiff: 'image',
  tif: 'image',
  heic: 'image',
  avif: 'image',
  svg: 'image',

  mp3: 'audio',
  wav: 'audio',
  flac: 'audio',
  ogg: 'audio',
  opus: 'audio',
  m4a: 'audio',
  aac: 'audio',

  mp4: 'video',
  mov: 'video',
  mkv: 'video',
  webm: 'video',
  avi: 'video',
  m4v: 'video',

  ttf: 'font',
  otf: 'font',
  woff: 'font',
  woff2: 'font',
  eot: 'font',

  pdf: 'document',
  docx: 'document',
  odt: 'document',
  epub: 'document',
  md: 'document',
  html: 'document',
  txt: 'document',

  zip: 'archive',
  tar: 'archive',
  gz: 'archive',
  tgz: 'archive',
  '7z': 'archive',
  rar: 'archive',

  csv: 'data',
  tsv: 'data',
  json: 'data',
  parquet: 'data',
}

function kindOfFormat(fmt: string | undefined): MediaKind | undefined {
  if (!fmt) return undefined
  return KIND_BY_EXT[fmt.toLowerCase()]
}

function readFormat(input: unknown): string | undefined {
  const i = input as { input?: { format?: unknown } } | null | undefined
  const fmt = i?.input?.format
  return typeof fmt === 'string' ? fmt : undefined
}

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

  /** Resolve a static loader and call the loaded module's default export. */
  private async run<I, O>(
    loader: () => Promise<{ default: (i: I) => Promise<O> }>,
    input: I,
  ): Promise<O> {
    const m = await loader()
    return m.default(this.remote(input))
  }

  /** Pick a handler loader by media kind, with optional fallback. */
  private byKind<I, O>(
    input: I,
    routes: Partial<Record<MediaKind, BrowserLoader<I, O>>>,
    fallback?: BrowserLoader<I, O>,
  ): Promise<O> {
    const kind = kindOfFormat(readFormat(input))
    const loader = (kind && routes[kind]) ?? fallback
    if (!loader) {
      throw new Error(
        `task: no browser handler for kind "${kind ?? 'unknown'}"`,
      )
    }
    return this.run<I, O>(loader, input)
  }

  // ── Format-pair dispatch ───────────────────────────

  /**
   * Convert between formats. The browser dispatches to the
   * per-thing remote handler by media kind — the actual
   * tool is picked by the server based on the format pair.
   */
  convert(
    i: ConvertBrowserInput,
    native?: NativeOptions,
  ): Promise<ConvertBrowserOutput | WorkFileAsBlob> {
    return this.byKind<typeof i, ConvertBrowserOutput | WorkFileAsBlob>(
      i,
      CONVERT_BROWSER_BY_KIND,
    )
  }
}

type BrowserLoader<I, O> = () => Promise<{
  default: (input: I) => Promise<O>
}>

const CONVERT_BROWSER_BY_KIND: Partial<
  Record<
    MediaKind,
    BrowserLoader<ConvertBrowserInput, ConvertBrowserOutput | WorkFileAsBlob>
  >
> = {
  image: () =>
    import('~/code/call/convert/image/imagemagick/browser') as never,
  archive: () => import('~/code/call/convert/archive/browser') as never,
  font: () => import('~/code/call/convert/font/browser') as never,
  document: () =>
    import('~/code/call/convert/document/browser') as never,
  video: () =>
    import('~/code/call/convert/video/ffmpeg/browser') as never,
}

export { Task, kindOfFormat }
