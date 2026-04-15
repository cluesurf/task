// Standard table + number formatters. Every verb that prints
// tabular results should route through here so the header /
// cell tints and the number formatting stay consistent with
// `task list process`, `task inspect pod`, etc.
//
// JSON-mode callers bypass this — they emit raw rows themselves.

import tint, { type Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'

const HEAD: Tint = { tone: 'white' }
const CELL: Tint = { tone: 'whiteBright' }
const DIM: Tint = { tone: 'blackBright' }

export type Align = 'left' | 'right'

export type Column = {
  /** Header label (rendered bold-white). */
  header: string
  /** Left-align by default. Numbers usually want 'right'. */
  align?: Align
}

export type RenderTableOptions = {
  columns: Column[]
  rows: (string | number | null | undefined)[][]
  color?: boolean
  /** Empty-cell filler. Default: dim em-dash. */
  empty?: string
}

export function renderTable({
  columns,
  rows,
  color,
  empty,
}: RenderTableOptions): string {
  const paint = (s: string, tone: Tint) =>
    color === false ? stripAnsi(tint(s, tone)) : tint(s, tone)
  const emptyText = empty ?? (color === false ? '—' : tint('—', DIM))

  const normalized = rows.map(r =>
    columns.map((_, i) => cellText(r[i], emptyText)),
  )

  const widths = columns.map((col, i) =>
    Math.max(
      col.header.length,
      ...normalized.map(r => stripAnsi(r[i] ?? '').length),
    ),
  )

  const pad = (s: string, w: number, align: Align) => {
    const visibleLen = stripAnsi(s).length
    if (visibleLen >= w) return s
    const gap = ' '.repeat(w - visibleLen)
    return align === 'right' ? gap + s : s + gap
  }

  const lines: string[] = []
  lines.push('')
  lines.push(
    columns
      .map((col, i) =>
        paint(pad(col.header, widths[i]!, col.align ?? 'left'), HEAD),
      )
      .join('  '),
  )
  for (const r of normalized) {
    lines.push(
      r
        .map((cell, i) => {
          const padded = pad(cell ?? '', widths[i]!, columns[i]!.align ?? 'left')
          // Cells that already contain ANSI (badges, custom-tinted
          // values, dim placeholders) keep their coloring. Plain
          // cells get the default CELL tint.
          if ((cell ?? '').includes('\x1b[')) return padded
          return paint(padded, CELL)
        })
        .join('  '),
    )
  }
  lines.push('')
  return lines.join('\n')
}

function cellText(
  v: string | number | null | undefined,
  emptyText: string,
): string {
  if (v === null || v === undefined || v === '') return emptyText
  return typeof v === 'number' ? compactNumber(v) : v
}

// ─── number formatters ──────────────────────────────────────────

/** Trim decimal noise: 1628619.6400000001 → 1.63M, 0.0123 → 0.012. */
export function compactNumber(n: number): string {
  if (!Number.isFinite(n)) return '—'
  const abs = Math.abs(n)
  if (abs === 0) return '0'
  if (abs < 0.001) return n.toExponential(2)
  if (abs < 1) return trimZeros(n.toFixed(3))
  if (abs < 1000) return trimZeros(n.toFixed(2))
  if (abs < 1_000_000) return `${trimZeros((n / 1_000).toFixed(1))}K`
  if (abs < 1_000_000_000) return `${trimZeros((n / 1_000_000).toFixed(2))}M`
  if (abs < 1_000_000_000_000) return `${trimZeros((n / 1_000_000_000).toFixed(2))}B`
  return `${trimZeros((n / 1_000_000_000_000).toFixed(2))}T`
}

export function humanBytes(bytes: number): string {
  if (!Number.isFinite(bytes)) return '—'
  const abs = Math.abs(bytes)
  if (abs < 1024) return `${bytes.toFixed(0)} B`
  if (abs < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  if (abs < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`
  if (abs < 1024 ** 4) return `${(bytes / 1024 ** 3).toFixed(2)} GB`
  return `${(bytes / 1024 ** 4).toFixed(2)} TB`
}

export function percent(ratio: number, digits = 1): string {
  if (!Number.isFinite(ratio)) return '—'
  return `${(ratio * 100).toFixed(digits)}%`
}

function trimZeros(s: string): string {
  if (!s.includes('.')) return s
  return s.replace(/\.?0+$/, '')
}

/** Unicode sparkline — `▁▂▃▄▅▆▇█` mapped across the range of the
 * series. Empty / all-equal series render as flat `▁`. */
export function sparkline(values: number[]): string {
  if (values.length === 0) return ''
  const glyphs = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']
  const finite = values.filter(v => Number.isFinite(v))
  if (finite.length === 0) return '▁'.repeat(values.length)
  const min = Math.min(...finite)
  const max = Math.max(...finite)
  const span = max - min || 1
  return values
    .map(v => {
      if (!Number.isFinite(v)) return ' '
      const idx = Math.min(
        glyphs.length - 1,
        Math.floor(((v - min) / span) * (glyphs.length - 1)),
      )
      return glyphs[idx]
    })
    .join('')
}
