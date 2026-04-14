/**
 * `task inspect file <path>` — produce a key/value table about a
 * file. Routes by extension to a per-format extractor:
 *
 *   .pdf                  → pdf-lib
 *   .png .jpg .gif .webp  → ffprobe (covers most raster + many
 *                            container formats)
 *   .mp3 .wav .flac .ogg  → ffprobe
 *   .mp4 .mov .mkv        → ffprobe
 *   anything else         → fallback: type + size only
 *
 * Returns `{ groups: [{ rows: [{ key, value }] }] }`. Pretty / text
 * mode prints the table to stdout; JSON mode emits the structure
 * (consumers that pipe this through `task ... -f json | jq` get
 * a stable shape).
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { exec } from '~/code/tool/node/process'
import { getCommand } from '~/code/tool/shared/command'
import { getLoggingStyle } from '~/code/tool/node/log'

export type InspectRow = { key: string; value: string }
export type InspectGroup = { label?: string; rows: InspectRow[] }

export type InspectFileNodeInput = {
  input: { file: { path: string } }
}

export type InspectFileNodeOutput = {
  file: { path: string }
  type: string
  groups: InspectGroup[]
}

export async function inspectFileNode(
  source: InspectFileNodeInput,
): Promise<InspectFileNodeOutput> {
  const filePath = source.input.file.path
  const stats = await fs.stat(filePath)
  const type = detectType(filePath)

  const header: InspectRow[] = [
    { key: 'type', value: type },
    { key: 'size', value: humanBytes(stats.size) },
  ]

  let extra: InspectGroup[] = []
  switch (type) {
    case 'pdf':
      extra = await inspectPdf(filePath)
      break
    case 'image':
    case 'video':
      extra = await inspectMedia(filePath, 'video')
      break
    case 'audio':
      extra = await inspectMedia(filePath, 'audio')
      break
    case 'font':
      extra = await inspectFont(filePath)
      break
    default:
      extra = await inspectGeneric(filePath)
      break
  }

  // Fold the per-type extractor's first group into the header so
  // the top block reads as one compact summary (type / size /
  // pages, type / size / codec, ...) instead of breaking after two
  // rows. Subsequent groups keep their own visual separator.
  const groups: InspectGroup[] = []
  if (extra.length > 0) {
    groups.push({ rows: [...header, ...extra[0]!.rows] })
    groups.push(...extra.slice(1))
  } else {
    groups.push({ rows: header })
  }

  // Render to stdout for the human modes; runAction handles JSON.
  if (
    getLoggingStyle() === 'pretty' ||
    getLoggingStyle() === 'text'
  ) {
    renderTable({
      title: path.basename(filePath),
      groups,
      color: getLoggingStyle() === 'pretty',
    })
  }

  return {
    file: { path: filePath },
    type,
    groups,
  }
}

// ---- per-type extractors ------------------------------------------

async function inspectPdf(filePath: string): Promise<InspectGroup[]> {
  const { PDFDocument } = await import('pdf-lib')
  const bytes = await fs.readFile(filePath)
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true })

  const pageCount = pdf.getPageCount()
  const firstPage = pageCount > 0 ? pdf.getPage(0) : undefined
  const size = firstPage?.getSize()
  const rotation = firstPage?.getRotation().angle ?? 0

  const meta: InspectRow[] = [{ key: 'pages', value: String(pageCount) }]
  const titles: InspectRow[] = []
  const tryAdd = (key: string, value: string | undefined) => {
    if (value && value.trim().length > 0) {
      titles.push({ key, value: value.trim() })
    }
  }
  tryAdd('title', pdf.getTitle())
  tryAdd('author', pdf.getAuthor())
  tryAdd('subject', pdf.getSubject())
  tryAdd('producer', pdf.getProducer())
  tryAdd('creator', pdf.getCreator())
  const created = pdf.getCreationDate()
  if (created) titles.push({ key: 'created', value: isoDate(created) })
  const modified = pdf.getModificationDate()
  if (modified) titles.push({ key: 'modified', value: isoDate(modified) })

  const layout: InspectRow[] = []
  if (size) {
    layout.push({
      key: 'dimensions',
      value: `${Math.round(size.width)} × ${Math.round(size.height)} pt` +
        ` (${describePageSize(size.width, size.height)})`,
    })
  }
  layout.push({ key: 'rotation', value: `${rotation}°` })

  const flags: InspectRow[] = [
    { key: 'encrypted', value: pdf.isEncrypted ? 'yes' : 'no' },
  ]

  const groups: InspectGroup[] = [{ rows: meta }]
  if (titles.length) groups.push({ rows: titles })
  groups.push({ rows: layout })
  groups.push({ rows: flags })
  return groups
}

async function inspectMedia(
  filePath: string,
  kind: 'audio' | 'video',
): Promise<InspectGroup[]> {
  const ffprobe = getCommand('ffprobe')
  ffprobe.link.push(
    '-v',
    'quiet',
    '-print_format',
    'json',
    '-show_format',
    '-show_streams',
    filePath,
  )
  const { stdout } = await exec(ffprobe.link)
  const probe: ProbeJson = stdout ? JSON.parse(stdout) : {}

  const stream = probe.streams?.find(s =>
    kind === 'audio' ? s.codec_type === 'audio' : s.codec_type === 'video',
  )
  const format = probe.format ?? {}

  const meta: InspectRow[] = []
  if (stream) {
    if (stream.codec_name) meta.push({ key: 'codec', value: stream.codec_name })
    if (stream.width && stream.height) {
      meta.push({
        key: 'dimensions',
        value: `${stream.width} × ${stream.height} px`,
      })
    }
    if (stream.sample_rate) {
      meta.push({ key: 'sample_rate', value: `${stream.sample_rate} Hz` })
    }
    if (stream.channels) {
      meta.push({ key: 'channels', value: String(stream.channels) })
    }
    if (stream.duration) {
      meta.push({
        key: 'duration',
        value: formatClock(Math.round(parseFloat(stream.duration) * 1000)),
      })
    } else if (format.duration) {
      meta.push({
        key: 'duration',
        value: formatClock(Math.round(parseFloat(format.duration) * 1000)),
      })
    }
  }

  const tags: InspectRow[] = []
  if (format.tags) {
    for (const k of ['title', 'artist', 'album', 'date', 'genre']) {
      const v = format.tags[k]
      if (v) tags.push({ key: k, value: v })
    }
  }

  const groups: InspectGroup[] = []
  if (meta.length) groups.push({ rows: meta })
  if (tags.length) groups.push({ rows: tags })
  return groups
}

async function inspectFont(filePath: string): Promise<InspectGroup[]> {
  // Pure-JS SFNT reader — no python subprocess. Covers TTF / OTF
  // directly and WOFF via zlib inflation. WOFF2's Brotli + table
  // transforms aren't implemented here; those callers get a hint
  // to go through `task dump font` (via ttx) instead.
  const { readFontInfo } = await import('./font')
  const info = await readFontInfo(filePath)

  if (info.wrapper === 'woff2') {
    return [
      {
        rows: [
          {
            key: 'note',
            value:
              'WOFF2 tables are Brotli-encoded; run `task dump font` to decode, ' +
              'then `task inspect file` on the .ttx.',
          },
        ],
      },
    ]
  }

  const nameRow = (id: number): InspectRow | undefined => {
    const v = info.name[String(id)]
    return v ? { key: nameLabel(id), value: v } : undefined
  }

  const names: InspectRow[] = [1, 2, 4, 5, 0, 13]
    .map(nameRow)
    .filter((r): r is InspectRow => !!r)

  const metrics: InspectRow[] = []
  if (info.head?.unitsPerEm) {
    metrics.push({ key: 'upem', value: String(info.head.unitsPerEm) })
  }
  if (info.hhea) {
    metrics.push({
      key: 'ascent/descent',
      value: `${info.hhea.ascent} / ${info.hhea.descent}`,
    })
    metrics.push({ key: 'line_gap', value: String(info.hhea.lineGap) })
  }
  if (info.os2) {
    metrics.push({ key: 'weight', value: String(info.os2.weightClass) })
    metrics.push({ key: 'width', value: String(info.os2.widthClass) })
  }
  if (typeof info.glyphCount === 'number') {
    metrics.push({ key: 'glyphs', value: String(info.glyphCount) })
  }

  const axes: InspectRow[] = (info.axes ?? []).map(a => ({
    key: `axis ${a.tag}`,
    value: `${a.min} → ${a.default} → ${a.max}`,
  }))

  const tables: InspectRow[] = info.tables.length
    ? [{ key: 'tables', value: info.tables.join(' ') }]
    : []

  const groups: InspectGroup[] = []
  if (names.length) groups.push({ rows: names })
  if (metrics.length) groups.push({ rows: metrics })
  if (axes.length) groups.push({ rows: axes })
  if (tables.length) groups.push({ rows: tables })
  return groups
}

/**
 * Fallback inspector for anything that didn't match a dedicated
 * extractor (text files, binaries, random stuff). Reports the
 * libmagic type + MIME plus line-ending and character-encoding
 * when the file has any text content.
 */
async function inspectGeneric(filePath: string): Promise<InspectGroup[]> {
  const { readFileTypeInfo } = await import('~/code/tool/node/text/base')
  const info = await readFileTypeInfo(filePath)

  const rows: InspectRow[] = []
  if (info.type) rows.push({ key: 'type', value: info.type })
  if (info.mime) rows.push({ key: 'mime', value: info.mime })
  if (info.encoding && info.encoding !== 'binary') {
    rows.push({ key: 'encoding', value: info.encoding })
    rows.push({ key: 'eol', value: info.eol })
  }
  return rows.length ? [{ rows }] : []
}

function nameLabel(id: number): string {
  switch (id) {
    case 0: return 'copyright'
    case 1: return 'family'
    case 2: return 'style'
    case 4: return 'full_name'
    case 5: return 'version'
    case 13: return 'license'
    default: return `name_${id}`
  }
}

type ProbeJson = {
  streams?: Array<{
    codec_type?: string
    codec_name?: string
    width?: number
    height?: number
    sample_rate?: string
    channels?: number
    duration?: string
  }>
  format?: { duration?: string; tags?: Record<string, string> }
}

// ---- helpers ------------------------------------------------------

function detectType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.pdf') return 'pdf'
  if (
    ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.tiff', '.heic', '.avif']
      .includes(ext)
  ) {
    return 'image'
  }
  if (['.mp3', '.wav', '.flac', '.ogg', '.opus', '.m4a', '.aac'].includes(ext)) {
    return 'audio'
  }
  if (['.mp4', '.mov', '.mkv', '.webm', '.avi', '.m4v'].includes(ext)) {
    return 'video'
  }
  if (['.ttf', '.otf', '.woff', '.woff2', '.ttx'].includes(ext)) {
    return 'font'
  }
  return ext.replace(/^\./, '') || 'file'
}

function humanBytes(n: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  let v = n
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  return v < 10 ? `${v.toFixed(2)} ${units[i]}` : `${v.toFixed(1)} ${units[i]}`
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function describePageSize(width: number, height: number): string {
  // Common page sizes (pt at 72 DPI), with ±2pt tolerance.
  const candidates: Array<[string, number, number]> = [
    ['Letter', 612, 792],
    ['Legal', 612, 1008],
    ['Tabloid', 792, 1224],
    ['A3', 842, 1191],
    ['A4', 595, 842],
    ['A5', 420, 595],
    ['B5', 499, 709],
  ]
  const close = (a: number, b: number) => Math.abs(a - b) <= 2
  for (const [name, w, h] of candidates) {
    if (
      (close(width, w) && close(height, h)) ||
      (close(width, h) && close(height, w))
    ) {
      return name
    }
  }
  return 'custom'
}

function formatClock(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const millis = ms % 1000
  return (
    `${minutes}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(millis).padStart(3, '0')}`
  )
}

// ---- pretty / text renderer ---------------------------------------

async function renderTable({
  title,
  groups,
  color,
}: {
  title: string
  groups: InspectGroup[]
  color: boolean
}): Promise<void> {
  const paint = color
    ? (s: string, tone: Tint) => tint(s, tone)
    : (s: string) => s

  const KEY: Tint = { tone: 'white' }
  const VAL: Tint = { tone: 'whiteBright' }
  const HEAD: Tint = { tone: 'whiteBright', bold: true }

  const widest = groups
    .flatMap(g => g.rows.map(r => r.key.length))
    .reduce((m, n) => Math.max(m, n), 0)

  // Terminal width for value wrapping. Fall back to 100 when
  // stdout isn't a TTY (piped output, tests) so the layout stays
  // deterministic.
  const termWidth =
    process.stdout.columns && process.stdout.columns > 40
      ? process.stdout.columns
      : 100
  const gap = '    '
  const valueColumn = widest + gap.length
  const valueWidth = Math.max(20, termWidth - valueColumn)
  const continuation = ' '.repeat(valueColumn)

  const out: string[] = []
  out.push('')
  out.push(paint(title, HEAD))
  out.push('')

  for (let i = 0; i < groups.length; i++) {
    const g = groups[i]!
    if (g.rows.length === 0) continue
    for (const row of g.rows) {
      const key = paint(row.key.padEnd(widest), KEY)
      const chunks = wrapValue(row.value, valueWidth)
      out.push(`${key}${gap}${paint(chunks[0] ?? '', VAL)}`)
      for (let j = 1; j < chunks.length; j++) {
        out.push(`${continuation}${paint(chunks[j]!, VAL)}`)
      }
    }
    if (i < groups.length - 1) out.push('')
  }
  out.push('')

  const text = out.join('\n')
  process.stdout.write(color ? text + '\n' : stripAnsi(text) + '\n')
}

/**
 * Wrap a value into lines of at most `width` visible chars so
 * the caller can emit continuation lines aligned under the value
 * column. Splits on whitespace; hard-breaks tokens that don't
 * fit (long URLs, hashes) so an unsplittable string never blows
 * past the column.
 */
function wrapValue(value: string, width: number): string[] {
  if (!value) return ['']
  if (value.length <= width) return [value]
  const words = value.split(/\s+/)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if (word.length > width) {
      if (current) {
        lines.push(current)
        current = ''
      }
      for (let i = 0; i < word.length; i += width) {
        lines.push(word.slice(i, i + width))
      }
      continue
    }
    if (!current) {
      current = word
    } else if (current.length + 1 + word.length <= width) {
      current += ' ' + word
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}
