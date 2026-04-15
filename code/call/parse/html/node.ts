/**
 * `task parse html <url|file>` — extract structured data from
 * static or JS-rendered HTML. Defaults to "every table as JSON";
 * `--links`, `--images`, `--text` switch what's pulled.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { resolveHtml } from '~/code/tool/node/html/fetch'
import { extractTables, tablesToCsv, type ExtractedTable } from '~/code/tool/node/html/tables'
import { extractLinks, extractImages, extractText } from '~/code/tool/node/html/extract'

export type ParseHtmlNodeInput = {
  input: string
  output?: string

  // selectors
  tables?: boolean
  links?: boolean
  images?: boolean
  text?: boolean

  // table options
  table?: string | number    // index or CSS selector
  clean?: boolean
  match?: string

  // output
  format?: 'json' | 'csv'

  // render
  render?: boolean
  engine?: 'puppeteer' | 'playwright'
  waitMs?: number
  waitFor?: string
  userAgent?: string
}

export async function parseHtmlNode(input: ParseHtmlNodeInput) {
  const html = await resolveHtml({
    input: input.input,
    render: input.render,
    engine: input.engine,
    waitMs: input.waitMs,
    waitFor: input.waitFor,
    userAgent: input.userAgent,
  })

  // Default behavior when no selector flag is set: extract tables.
  const wantTables = input.tables ?? !(input.links || input.images || input.text)
  const result: Record<string, unknown> = {}
  if (wantTables) {
    result.tables = extractTables(html, {
      selector: input.table,
      clean: input.clean,
      match: input.match,
    })
  }
  if (input.links)  result.links  = extractLinks(html, isUrl(input.input) ? input.input : undefined)
  if (input.images) result.images = extractImages(html, isUrl(input.input) ? input.input : undefined)
  if (input.text)   result.text   = extractText(html)

  const fmt = input.format ?? 'json'
  const serialized = serialize(result, fmt)

  if (input.output) {
    await fs.mkdir(path.dirname(input.output), { recursive: true })
    await fs.writeFile(input.output, serialized, 'utf8')
    return { file: { path: input.output }, ...summarize(result) }
  }
  process.stdout.write(serialized)
  if (!serialized.endsWith('\n')) process.stdout.write('\n')
  return summarize(result)
}

function summarize(r: Record<string, unknown>) {
  const out: Record<string, number> = {}
  if (Array.isArray(r.tables)) out.tables = (r.tables as ExtractedTable[]).length
  if (Array.isArray(r.links))  out.links  = (r.links as unknown[]).length
  if (Array.isArray(r.images)) out.images = (r.images as unknown[]).length
  if (typeof r.text === 'string') out.textChars = r.text.length
  return out
}

function serialize(r: Record<string, unknown>, fmt: 'json' | 'csv'): string {
  if (fmt === 'csv') {
    // CSV only makes sense for tables. Fall back to JSON for the
    // other extractors so users always get something useful.
    if (r.tables && Array.isArray(r.tables)) return tablesToCsv(r.tables as ExtractedTable[])
    return JSON.stringify(r, null, 2)
  }
  // Tables-only request → unwrap so the JSON is just the array,
  // not `{ tables: [...] }`. Saves a level of nesting in the
  // common case.
  const keys = Object.keys(r)
  if (keys.length === 1 && keys[0] === 'tables') {
    return JSON.stringify(r.tables, null, 2)
  }
  return JSON.stringify(r, null, 2)
}

function isUrl(s: string): boolean {
  return /^https?:\/\//i.test(s)
}
