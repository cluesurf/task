/**
 * HTML table extraction + normalization.
 *
 * Real-world tables are messy:
 *   - missing `<thead>` (header is the first `<tr>`)
 *   - merged cells (`colspan`, `rowspan`) that span multiple
 *     logical rows / columns
 *   - inconsistent row widths
 *   - `<th>` mixed into the body
 *   - nested tables (skip; caller decides whether to recurse)
 *
 * The algorithm:
 *   1. Build a 2D grid by walking <tr><td|th>, expanding
 *      colspan/rowspan into placeholder cells so every row has
 *      the same width.
 *   2. Detect the header row: explicit `<thead>` if present,
 *      otherwise the first row whose cells are all `<th>`,
 *      otherwise just use the first row.
 *   3. Normalize: trim whitespace, collapse internal whitespace,
 *      de-duplicate identical column headers (`name`, `name 2`),
 *      drop empty rows.
 *   4. Emit rows as `Record<header, cell>`.
 */

import * as cheerio from 'cheerio'
import type { CheerioAPI, Cheerio } from 'cheerio'

export type TableExtractOptions = {
  /** Table to pick. Default: every table. */
  selector?: string | number
  /** Trim + de-dupe headers + drop empty rows. Default true. */
  clean?: boolean
  /** Filter tables whose serialized text matches this substring. */
  match?: string
}

export type ExtractedTable = {
  /** Optional caption / nearest preceding heading for context. */
  caption?: string
  headers: string[]
  rows: Record<string, string>[]
}

export function extractTables(html: string, opts: TableExtractOptions = {}): ExtractedTable[] {
  const $ = cheerio.load(html)
  const tables = pickTables($, opts.selector)
  const out: ExtractedTable[] = []
  for (const t of tables) {
    const ext = extractOne($, t, opts.clean !== false)
    if (opts.match) {
      const blob = JSON.stringify(ext).toLowerCase()
      if (!blob.includes(opts.match.toLowerCase())) continue
    }
    out.push(ext)
  }
  return out
}

function pickTables($: CheerioAPI, selector?: string | number): Cheerio<any>[] {
  if (selector === undefined) {
    return $('table').toArray().map(el => $(el))
  }
  if (typeof selector === 'number') {
    const all = $('table').toArray()
    const picked = all[selector]
    return picked ? [$(picked)] : []
  }
  // CSS selector — could match the table directly, or an ancestor
  // (`#pricing` containing one table). Try both.
  const direct = $(selector).filter('table').toArray()
  if (direct.length) return direct.map(el => $(el))
  return $(selector).find('table').toArray().map(el => $(el))
}

function extractOne($: CheerioAPI, $table: Cheerio<any>, clean: boolean): ExtractedTable {
  const grid = buildGrid($, $table)
  const { headers, body } = splitHeader($table, grid)

  const cleanedHeaders = clean ? dedupe(headers.map(normalize)) : headers
  const rows: Record<string, string>[] = []
  for (const row of body) {
    if (clean && row.every(c => !c.trim())) continue
    const obj: Record<string, string> = {}
    for (let i = 0; i < cleanedHeaders.length; i++) {
      const key = cleanedHeaders[i]!
      const val = clean ? normalize(row[i] ?? '') : (row[i] ?? '')
      obj[key] = val
    }
    rows.push(obj)
  }

  return {
    caption: detectCaption($, $table),
    headers: cleanedHeaders,
    rows,
  }
}

/**
 * Build a 2D grid where colspan / rowspan are expanded into
 * placeholder cells. This makes downstream column alignment
 * trivial.
 */
function buildGrid($: CheerioAPI, $table: Cheerio<any>): string[][] {
  const grid: string[][] = []
  // Track active rowspan continuations: column index → remaining rows + value.
  let pending: Array<{ rowsLeft: number; value: string }> = []

  $table.find('tr').each((_rowIdx, tr) => {
    const row: string[] = []
    let col = 0

    const advancePending = () => {
      while (pending[col]) {
        row[col] = pending[col]!.value
        pending[col]!.rowsLeft--
        if (pending[col]!.rowsLeft <= 0) delete pending[col]
        col++
      }
    }

    advancePending()

    $(tr).children('th, td').each((_cellIdx, cell) => {
      const $cell = $(cell)
      const colspan = Math.max(1, parseInt($cell.attr('colspan') ?? '1', 10) || 1)
      const rowspan = Math.max(1, parseInt($cell.attr('rowspan') ?? '1', 10) || 1)
      const text = $cell.text()

      for (let c = 0; c < colspan; c++) {
        advancePending()
        row[col] = text
        if (rowspan > 1) {
          pending[col] = { rowsLeft: rowspan - 1, value: text }
        }
        col++
      }
    })

    advancePending()
    grid.push(row)
  })
  return grid
}

function splitHeader(
  $table: Cheerio<any>,
  grid: string[][],
): { headers: string[]; body: string[][] } {
  // Explicit <thead>?
  const thead = ($table as unknown as { find: (sel: string) => Cheerio<any> })
    .find('thead tr')
  const theadRowCount = (thead as unknown as { length: number }).length
  if (theadRowCount > 0) {
    const headers = grid[0] ?? []
    return { headers, body: grid.slice(theadRowCount) }
  }

  // First row all <th>?
  const firstRowAllHeader = isAllThRow($table, 0)
  if (firstRowAllHeader) {
    return { headers: grid[0] ?? [], body: grid.slice(1) }
  }

  // No header info — synthesize column names + use every row.
  const width = Math.max(0, ...grid.map(r => r.length))
  const headers = Array.from({ length: width }, (_, i) => `col_${i + 1}`)
  return { headers, body: grid }
}

function isAllThRow($table: Cheerio<any>, rowIdx: number): boolean {
  const trs = ($table as unknown as { find: (sel: string) => { eq: (i: number) => unknown } })
    .find('tr')
  const tr = trs.eq(rowIdx) as unknown as { children: (sel: string) => { length: number } }
  if (!tr) return false
  const allCells = tr.children('th, td')
  const ths = tr.children('th')
  return allCells.length > 0 && allCells.length === ths.length
}

function detectCaption($: CheerioAPI, $table: Cheerio<any>): string | undefined {
  const cap = ($table as unknown as { find: (sel: string) => { text: () => string } })
    .find('caption').text().trim()
  if (cap) return cap
  // Fallback: nearest preceding heading.
  const prev = ($table as unknown as { prevAll: (sel: string) => { first: () => { text: () => string } } })
    .prevAll('h1, h2, h3, h4, h5, h6').first().text().trim()
  return prev || undefined
}

function normalize(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

function dedupe(headers: string[]): string[] {
  const seen = new Map<string, number>()
  return headers.map(h => {
    const base = h || 'col'
    const n = (seen.get(base) ?? 0) + 1
    seen.set(base, n)
    return n === 1 ? base : `${base} ${n}`
  })
}

// ---- export helpers --------------------------------------------

export function tablesToCsv(tables: ExtractedTable[]): string {
  const parts: string[] = []
  for (const [i, t] of tables.entries()) {
    if (tables.length > 1) parts.push(`# table ${i + 1}${t.caption ? ` — ${t.caption}` : ''}`)
    parts.push(t.headers.map(csvCell).join(','))
    for (const row of t.rows) {
      parts.push(t.headers.map(h => csvCell(row[h] ?? '')).join(','))
    }
    if (i < tables.length - 1) parts.push('')
  }
  return parts.join('\n') + '\n'
}

function csvCell(s: string): string {
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}
