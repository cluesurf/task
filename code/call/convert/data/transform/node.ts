/**
 * Single-file structural conversions across `csv`, `tsv`, `json`,
 * `jsonl`, `yaml`, `xlsx`. Pure JS, no shell-out.
 *
 * Backends:
 * - csv-parse — CSV / TSV → records.
 * - yaml      — YAML ↔ JSON.
 * - exceljs   — XLSX ↔ {CSV, JSON}. Picked over `sheetjs/xlsx`
 *               for its first-class async API and clean ESM
 *               interop. Streaming I/O lands "for free" when we
 *               grow into multi-GB sheets.
 *
 * Each public function is `convert<Source>To<Destination>(input,
 * output)` and writes to `output` as a side-effect, returning a
 * small `{ rows? }` summary. The directory-walker dispatch in
 * `../node.ts` calls these via the `DATA_CONVERT_ROUTES` table so
 * batch conversion of a folder of files is one verb.
 */

import fs from 'node:fs/promises'
import { parse as parseCsv } from 'csv-parse/sync'
import YAML from 'yaml'
import ExcelJS from 'exceljs'

export type ConvertDataResult = { rows?: number }

/* ----- CSV / TSV ↔ JSON / JSONL ----- */

export async function convertCsvFileToJson({
  source,
  destination,
  delimiter = ',',
}: {
  source: string
  destination: string
  delimiter?: string
}): Promise<ConvertDataResult> {
  const text = await fs.readFile(source, 'utf8')
  const records = parseCsv(text, {
    columns: true,
    bom: true,
    trim: true,
    delimiter,
    skip_empty_lines: true,
  }) as Record<string, string>[]
  await fs.writeFile(destination, JSON.stringify(records, null, 2) + '\n')
  return { rows: records.length }
}

export async function convertCsvFileToJsonl({
  source,
  destination,
  delimiter = ',',
}: {
  source: string
  destination: string
  delimiter?: string
}): Promise<ConvertDataResult> {
  const text = await fs.readFile(source, 'utf8')
  const records = parseCsv(text, {
    columns: true,
    bom: true,
    trim: true,
    delimiter,
    skip_empty_lines: true,
  }) as Record<string, string>[]
  const lines = records.map(r => JSON.stringify(r)).join('\n')
  await fs.writeFile(destination, lines + (lines ? '\n' : ''))
  return { rows: records.length }
}

export async function convertJsonFileToCsv({
  source,
  destination,
  delimiter = ',',
}: {
  source: string
  destination: string
  delimiter?: string
}): Promise<ConvertDataResult> {
  const records = JSON.parse(await fs.readFile(source, 'utf8')) as unknown[]
  if (!Array.isArray(records)) {
    throw new Error('convert json → csv: input must be an array of objects')
  }
  await fs.writeFile(destination, stringifyCsv(records, delimiter))
  return { rows: records.length }
}

export async function convertJsonlFileToCsv({
  source,
  destination,
  delimiter = ',',
}: {
  source: string
  destination: string
  delimiter?: string
}): Promise<ConvertDataResult> {
  const text = await fs.readFile(source, 'utf8')
  const records = text
    .split(/\r?\n/)
    .filter(line => line.trim() !== '')
    .map(line => JSON.parse(line) as unknown)
  await fs.writeFile(destination, stringifyCsv(records, delimiter))
  return { rows: records.length }
}

/* ----- JSON ↔ YAML ----- */

export async function convertJsonFileToYaml({
  source,
  destination,
}: {
  source: string
  destination: string
}): Promise<ConvertDataResult> {
  const obj = JSON.parse(await fs.readFile(source, 'utf8'))
  await fs.writeFile(destination, YAML.stringify(obj))
  return {}
}

export async function convertYamlFileToJson({
  source,
  destination,
}: {
  source: string
  destination: string
}): Promise<ConvertDataResult> {
  const obj = YAML.parse(await fs.readFile(source, 'utf8'))
  await fs.writeFile(destination, JSON.stringify(obj, null, 2) + '\n')
  return {}
}

/* ----- XLSX ↔ CSV / JSON via ExcelJS ----- */

export async function convertXlsxFileToCsv({
  source,
  destination,
  sheet,
}: {
  source: string
  destination: string
  sheet?: string
}): Promise<ConvertDataResult> {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(source)
  const ws = pickWorksheet(wb, sheet)
  // Re-pack the chosen sheet into a fresh workbook so csv.write
  // emits exactly that sheet's rows (csv.write defaults to the
  // first worksheet of the receiver workbook).
  const out = new ExcelJS.Workbook()
  const dst = out.addWorksheet(ws.name)
  ws.eachRow({ includeEmpty: false }, row => {
    dst.addRow((row.values as unknown[]).slice(1))
  })
  await out.csv.writeFile(destination)
  return { rows: dst.rowCount }
}

export async function convertXlsxFileToJson({
  source,
  destination,
  sheet,
}: {
  source: string
  destination: string
  sheet?: string
}): Promise<ConvertDataResult> {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(source)
  const ws = pickWorksheet(wb, sheet)

  const headers: string[] = []
  const records: Record<string, unknown>[] = []
  ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    const values = (row.values as unknown[]).slice(1) // 1-indexed in exceljs
    if (rowNumber === 1) {
      headers.push(...values.map(v => String(v ?? '')))
      return
    }
    const obj: Record<string, unknown> = {}
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]!] = values[i] ?? null
    }
    records.push(obj)
  })

  await fs.writeFile(destination, JSON.stringify(records, null, 2) + '\n')
  return { rows: records.length }
}

export async function convertCsvFileToXlsx({
  source,
  destination,
}: {
  source: string
  destination: string
}): Promise<ConvertDataResult> {
  const wb = new ExcelJS.Workbook()
  await wb.csv.readFile(source)
  await wb.xlsx.writeFile(destination)
  const ws = wb.worksheets[0]
  return { rows: ws ? ws.rowCount : 0 }
}

export async function convertJsonFileToXlsx({
  source,
  destination,
}: {
  source: string
  destination: string
}): Promise<ConvertDataResult> {
  const records = JSON.parse(await fs.readFile(source, 'utf8'))
  if (!Array.isArray(records)) {
    throw new Error('convert json → xlsx: input must be an array of objects')
  }
  const objs = records as Record<string, unknown>[]
  const headers = collectKeys(objs)

  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Sheet1')
  if (headers.length > 0) {
    ws.addRow(headers)
    for (const obj of objs) {
      ws.addRow(headers.map(h => obj[h] ?? null))
    }
  }
  await wb.xlsx.writeFile(destination)
  return { rows: objs.length }
}

/* ----- helpers ----- */

function pickWorksheet(
  wb: ExcelJS.Workbook,
  name?: string,
): ExcelJS.Worksheet {
  if (name) {
    const ws = wb.getWorksheet(name)
    if (!ws) throw new Error(`convert xlsx: sheet "${name}" not found`)
    return ws
  }
  const first = wb.worksheets[0]
  if (!first) throw new Error('convert xlsx: workbook has no sheets')
  return first
}

function stringifyCsv(records: unknown[], delimiter = ','): string {
  if (records.length === 0) return ''
  const objs = records as Record<string, unknown>[]
  const headers = collectKeys(objs)
  const rows = [headers.map(h => csvCell(h, delimiter)).join(delimiter)]
  for (const obj of objs) {
    rows.push(
      headers
        .map(h => csvCell(formatValue(obj[h]), delimiter))
        .join(delimiter),
    )
  }
  return rows.join('\n') + '\n'
}

function collectKeys(records: Record<string, unknown>[]): string[] {
  const seen = new Set<string>()
  const order: string[] = []
  for (const r of records) {
    for (const k of Object.keys(r)) {
      if (!seen.has(k)) {
        seen.add(k)
        order.push(k)
      }
    }
  }
  return order
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return ''
  if (typeof v === 'object') return JSON.stringify(v)
  return String(v)
}

function csvCell(value: string, delimiter: string): string {
  if (
    value.includes('"') ||
    value.includes(delimiter) ||
    value.includes('\n') ||
    value.includes('\r')
  ) {
    return '"' + value.replace(/"/g, '""') + '"'
  }
  return value
}
