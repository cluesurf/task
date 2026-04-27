/**
 * `task transform data <input>` — reshape a structured-data file
 * by one of three drivers:
 *
 *  --map <config.yml>   declarative renames / projection / coercion
 *  --jq <expr>          jq query language (jq-wasm, no native dep)
 *  --sql <query>        DuckDB SQL with the input bound as `in`
 *                       (reuses `task query sql` infrastructure)
 *
 * Input formats: csv, tsv, json, jsonl, yaml. Output format is
 * inferred from the destination extension (or `output.format`).
 *
 * The map config shape:
 *
 *   rename:
 *     full_name: name
 *   pick: [id, email, name]
 *   drop: [internal_notes]
 *   coerce:
 *     id: integer
 *     created_at: date
 *   default:
 *     active: true
 *
 * Each step is applied per-record in declaration order.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { parse as parseCsv } from 'csv-parse/sync'
import YAML from 'yaml'
import { spawnAndCapture } from '~/code/tool/node/spawn'

export type TransformDataDriver = 'map' | 'jq' | 'sql'

export type TransformDataMapConfig = {
  rename?: Record<string, string>
  pick?: string[]
  drop?: string[]
  coerce?: Record<string, 'integer' | 'number' | 'boolean' | 'string' | 'date'>
  default?: Record<string, unknown>
}

export type TransformDataNodeInput = {
  input: { file: { path: string }; format?: string }
  output?: { file: { path: string }; format?: string }
  driver: TransformDataDriver
  /** Path to a YAML/JSON map config (used when driver=map). */
  mapConfig?: string
  /** Inline jq expression. */
  jq?: string
  /** Inline SQL with `in` referring to the input. */
  sql?: string
}

export type TransformDataNodeOutput = {
  rows: number
  driver: TransformDataDriver
}

async function transformDataNode(
  source: TransformDataNodeInput,
): Promise<TransformDataNodeOutput> {
  const records = await readRecords(source)
  let out: unknown
  switch (source.driver) {
    case 'map':
      out = await applyMap(records, source.mapConfig)
      break
    case 'jq':
      out = await applyJq(records, source.jq)
      break
    case 'sql':
      out = await applySql(source.input.file.path, source.sql)
      break
  }

  await writeOutput(out, source)
  return {
    rows: Array.isArray(out) ? out.length : 1,
    driver: source.driver,
  }
}

/* ----- read ----- */

async function readRecords(
  input: TransformDataNodeInput,
): Promise<Record<string, unknown>[]> {
  const fmt = input.input.format ?? extOf(input.input.file.path)
  const text = await fs.readFile(input.input.file.path, 'utf8')
  switch (fmt) {
    case 'json': {
      const parsed = JSON.parse(text)
      if (!Array.isArray(parsed)) {
        throw new Error('transform data: json input must be an array')
      }
      return parsed
    }
    case 'jsonl':
    case 'ndjson':
      return text
        .split(/\r?\n/)
        .filter(line => line.trim() !== '')
        .map(line => JSON.parse(line))
    case 'csv':
    case 'tsv':
      return parseCsv(text, {
        columns: true,
        bom: true,
        trim: true,
        delimiter: fmt === 'tsv' ? '\t' : ',',
        skip_empty_lines: true,
      }) as Record<string, unknown>[]
    case 'yaml':
    case 'yml': {
      const parsed = YAML.parse(text)
      if (!Array.isArray(parsed)) {
        throw new Error('transform data: yaml input must be an array')
      }
      return parsed
    }
    default:
      throw new Error(`transform data: unsupported input format "${fmt}"`)
  }
}

/* ----- map driver ----- */

async function applyMap(
  records: Record<string, unknown>[],
  configPath?: string,
): Promise<unknown[]> {
  if (!configPath) {
    throw new Error('transform data --map: --map-config <path> is required')
  }
  const config = parseMapConfig(
    await fs.readFile(configPath, 'utf8'),
    configPath,
  )
  return records.map(rec => transformRecord(rec, config))
}

function parseMapConfig(
  text: string,
  source: string,
): TransformDataMapConfig {
  if (source.endsWith('.json')) return JSON.parse(text)
  return YAML.parse(text)
}

function transformRecord(
  record: Record<string, unknown>,
  config: TransformDataMapConfig,
): Record<string, unknown> {
  let out: Record<string, unknown> = { ...record }

  if (config.rename) {
    for (const [from, to] of Object.entries(config.rename)) {
      if (from in out) {
        out[to] = out[from]
        delete out[from]
      }
    }
  }

  if (config.drop) {
    for (const k of config.drop) delete out[k]
  }

  if (config.pick) {
    const picked: Record<string, unknown> = {}
    for (const k of config.pick) {
      if (k in out) picked[k] = out[k]
    }
    out = picked
  }

  if (config.coerce) {
    for (const [k, kind] of Object.entries(config.coerce)) {
      if (k in out) out[k] = coerce(out[k], kind)
    }
  }

  if (config.default) {
    for (const [k, v] of Object.entries(config.default)) {
      if (out[k] === undefined || out[k] === null || out[k] === '') {
        out[k] = v
      }
    }
  }

  return out
}

function coerce(
  value: unknown,
  kind: 'integer' | 'number' | 'boolean' | 'string' | 'date',
): unknown {
  if (value === null || value === undefined) return value
  switch (kind) {
    case 'integer': {
      const n = Number(value)
      return Number.isInteger(n) ? n : Math.trunc(n)
    }
    case 'number':
      return Number(value)
    case 'boolean': {
      const s = String(value).toLowerCase()
      return s === 'true' || s === '1' || s === 'yes' || s === 'y'
    }
    case 'string':
      return String(value)
    case 'date':
      return new Date(value as string | number).toISOString()
  }
}

/* ----- jq driver ----- */

async function applyJq(
  records: unknown[],
  expr?: string,
): Promise<unknown> {
  if (!expr) {
    throw new Error('transform data --jq: --jq <expression> is required')
  }
  const jq = await import('jq-wasm')
  const json = JSON.stringify(records)
  const result = await jq.json(json, expr)
  // jq-wasm returns either a single value or an array depending
  // on the expression; normalize to an array of records when the
  // result is iterable, else wrap.
  if (Array.isArray(result)) return result
  return [result]
}

/* ----- sql driver ----- */

async function applySql(
  inputPath: string,
  sql?: string,
): Promise<unknown[]> {
  if (!sql) {
    throw new Error('transform data --sql: --sql <query> is required')
  }
  // Bind the input file as `in` so the user's query can reference
  // it by that name. DuckDB resolves the file format from the
  // path's extension.
  const wrapped = `WITH "in" AS (SELECT * FROM '${inputPath.replace(/'/g, "''")}') ${sql}`
  const out = await spawnAndCapture({
    verb: 'transform data',
    bin: 'duckdb',
    args: ['-json', '-c', wrapped],
  })
  return JSON.parse(out || '[]')
}

/* ----- write ----- */

async function writeOutput(
  result: unknown,
  source: TransformDataNodeInput,
): Promise<void> {
  if (!source.output) {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n')
    return
  }
  const fmt = source.output.format ?? extOf(source.output.file.path)
  switch (fmt) {
    case 'json':
      await fs.writeFile(
        source.output.file.path,
        JSON.stringify(result, null, 2) + '\n',
      )
      return
    case 'jsonl':
    case 'ndjson': {
      if (!Array.isArray(result)) {
        throw new Error('transform data: jsonl output requires an array result')
      }
      const lines = result.map(r => JSON.stringify(r)).join('\n')
      await fs.writeFile(source.output.file.path, lines + '\n')
      return
    }
    case 'yaml':
    case 'yml':
      await fs.writeFile(source.output.file.path, YAML.stringify(result))
      return
    default:
      throw new Error(`transform data: unsupported output format "${fmt}"`)
  }
}

function extOf(p: string): string {
  return path.extname(p).toLowerCase().replace(/^\./, '')
}

export default transformDataNode
export { transformDataNode }
