/**
 * `task parse table <input>` — pull tables out of HTML / DOCX /
 * PDF and emit them as a list of records (rows of objects keyed
 * by column header).
 *
 * Backends:
 *   .html / .htm     — cheerio walks `<table>` elements
 *   .docx            — mammoth converts to HTML, then cheerio
 *   .pdf             — pdfjs-dist text + glyph positions, with a
 *                      whitespace-clustering heuristic to recover
 *                      column boundaries
 *
 * Each table is returned as `{ headers: string[], rows:
 * Record<string, string>[] }`. Output JSON is the array of
 * tables. The first table-only CSV variant lives in
 * `convertJsonFileToCsv`; pipe through that for a single CSV.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import * as cheerio from 'cheerio'
import type { CheerioAPI } from 'cheerio'

export type ParseTableNodeInput = {
  input?: { file?: { path: string }; text?: string; format?: 'html' | 'docx' | 'pdf' }
  output?: { file?: { path: string } }
  /** Index of a single table to emit (0-based). Otherwise all. */
  index?: number
  /** Force a backend. Otherwise picked from extension / `input.format`. */
  format?: 'html' | 'docx' | 'pdf'
}

export type ParseTable = {
  headers: string[]
  rows: Record<string, string>[]
}

export type ParseTableNodeOutput = {
  tables: ParseTable[]
}

async function parseTableNode(
  source: ParseTableNodeInput,
): Promise<ParseTableNodeOutput> {
  const format = pickFormat(source)
  let tables: ParseTable[]

  switch (format) {
    case 'html': {
      const html = await readSource(source)
      tables = tablesFromCheerio(cheerio.load(html))
      break
    }
    case 'docx': {
      const filePath = requireFilePath(source, 'docx')
      const mammoth = await import('mammoth')
      const result = await mammoth.convertToHtml({ path: filePath })
      tables = tablesFromCheerio(cheerio.load(result.value))
      break
    }
    case 'pdf': {
      const filePath = requireFilePath(source, 'pdf')
      tables = await tablesFromPdf(filePath)
      break
    }
  }

  if (typeof source.index === 'number') {
    tables = tables[source.index] ? [tables[source.index]!] : []
  }

  const out: ParseTableNodeOutput = { tables }
  const dst = source.output?.file?.path
  if (dst) {
    await fs.writeFile(dst, JSON.stringify(out, null, 2) + '\n')
  }
  return out
}

function pickFormat(input: ParseTableNodeInput): 'html' | 'docx' | 'pdf' {
  if (input.format) return input.format
  if (input.input?.format) return input.input.format
  const p = input.input?.file?.path
  if (p) {
    const ext = path.extname(p).toLowerCase()
    if (ext === '.html' || ext === '.htm') return 'html'
    if (ext === '.docx') return 'docx'
    if (ext === '.pdf') return 'pdf'
    throw new Error(`parse table: unsupported extension "${ext}"`)
  }
  // Plain text fallback — assume HTML.
  return 'html'
}

async function readSource(input: ParseTableNodeInput): Promise<string> {
  if (input.input?.text !== undefined) return input.input.text
  const p = input.input?.file?.path
  if (!p) {
    throw new Error('parse table: provide input.file.path or input.text')
  }
  return fs.readFile(p, 'utf8')
}

function requireFilePath(
  input: ParseTableNodeInput,
  format: string,
): string {
  const p = input.input?.file?.path
  if (!p) {
    throw new Error(`parse table: ${format} requires input.file.path`)
  }
  return p
}

function tablesFromCheerio($: CheerioAPI): ParseTable[] {
  const tables: ParseTable[] = []
  $('table').each((_t, table) => {
    const headers = collectHeaders($, table)
    const rows: Record<string, string>[] = []
    $(table)
      .find('tr')
      .each((_r, tr) => {
        const cells = $(tr).find('td')
        if (cells.length === 0) return // header-only row
        const obj: Record<string, string> = {}
        cells.each((i, td) => {
          const key = headers[i] ?? `col_${i}`
          obj[key] = $(td).text().trim()
        })
        rows.push(obj)
      })
    tables.push({ headers, rows })
  })
  return tables
}

function collectHeaders(
  $: CheerioAPI,
  table: Parameters<typeof $>[0],
): string[] {
  const ths: string[] = []
  $(table).find('thead th, tr:first-child th').each((_i, el) => {
    ths.push($(el).text().trim())
  })
  if (ths.length > 0) return ths
  // No <th>: synthesize from the first <tr>'s cell count.
  const firstRow = $(table).find('tr').first()
  const cellCount = firstRow.find('td, th').length
  return Array.from({ length: cellCount }, (_, i) => `col_${i}`)
}

/* ----- PDF: text + glyph positions, cluster into columns ----- */

async function tablesFromPdf(filePath: string): Promise<ParseTable[]> {
  // pdfjs-dist's CommonJS path. Legacy build avoids the worker
  // requirement on Node and keeps imports synchronous-ish.
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const data = await fs.readFile(filePath)
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(data),
    disableFontFace: true,
    isEvalSupported: false,
  }).promise

  const tables: ParseTable[] = []
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p)
    const content = await page.getTextContent()
    const items = content.items as Array<{
      str: string
      transform: number[]
      width?: number
    }>
    if (items.length === 0) continue

    // Bucket items into rows by approximate y position (transform[5]).
    const rowsByY = new Map<number, Array<{ x: number; str: string }>>()
    for (const it of items) {
      if (!it.str.trim()) continue
      const y = Math.round((it.transform[5] ?? 0) * 2) / 2
      const bucket = rowsByY.get(y) ?? []
      bucket.push({ x: it.transform[4] ?? 0, str: it.str })
      rowsByY.set(y, bucket)
    }
    if (rowsByY.size < 2) continue

    const orderedRows = Array.from(rowsByY.entries())
      .sort((a, b) => b[0] - a[0]) // pdf y grows up; top first
      .map(([, cells]) => cells.sort((a, b) => a.x - b.x))

    // Heuristic: columns are the unique x positions across rows,
    // bucketed within a small tolerance.
    const xs = clusterXs(
      orderedRows.flatMap(r => r.map(c => c.x)),
      8,
    )
    if (xs.length < 2) continue

    const headers = orderedRows[0]!.map(c => c.str.trim())
    const rows: Record<string, string>[] = []
    for (let i = 1; i < orderedRows.length; i++) {
      const row = orderedRows[i]!
      const obj: Record<string, string> = {}
      for (const cell of row) {
        const colIdx = nearestColumn(cell.x, xs)
        const key = headers[colIdx] ?? `col_${colIdx}`
        obj[key] = (obj[key] ? obj[key] + ' ' : '') + cell.str.trim()
      }
      rows.push(obj)
    }
    tables.push({ headers, rows })
  }

  await doc.destroy()
  return tables
}

function clusterXs(values: number[], tolerance: number): number[] {
  const sorted = [...values].sort((a, b) => a - b)
  const clusters: number[] = []
  for (const v of sorted) {
    const last = clusters[clusters.length - 1]
    if (last === undefined || Math.abs(v - last) > tolerance) {
      clusters.push(v)
    }
  }
  return clusters
}

function nearestColumn(x: number, columns: number[]): number {
  let best = 0
  let bestDelta = Infinity
  for (let i = 0; i < columns.length; i++) {
    const d = Math.abs(x - columns[i]!)
    if (d < bestDelta) {
      bestDelta = d
      best = i
    }
  }
  return best
}

export default parseTableNode
export { parseTableNode }
