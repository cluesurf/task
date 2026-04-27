/**
 * Walk an input directory, convert every file of `input.format`
 * to `output.format` in a mirror output directory via DuckDB.
 *
 * The per-pair dispatch is table-driven: every supported pair is
 * one row in `DATA_CONVERT_ROUTES`. Adding a new format pair is a
 * single append; no branches touch the walker.
 *
 * Types are generated from `./base.ts` into
 * `~/code/form/action/convert/data/*` via `pnpm make:type`.
 */

import fs from 'node:fs'
import path from 'node:path'
import {
  convertJsonlFileToParquet,
  convertParquetFileToJsonl,
} from './duckdb/node'
import {
  convertCsvFileToJson,
  convertCsvFileToJsonl,
  convertCsvFileToXlsx,
  convertJsonFileToCsv,
  convertJsonFileToXlsx,
  convertJsonFileToYaml,
  convertJsonlFileToCsv,
  convertXlsxFileToCsv,
  convertXlsxFileToJson,
  convertYamlFileToJson,
} from './transform/node'
import type {
  ConvertDataNodeLocalInternalInput,
  ConvertDataNodeOutput,
} from '~/code/form/action/convert/data/node'

type DataConvertRoute = {
  input: string
  output: string
  run: (input: { source: string; destination: string }) => Promise<void>
  /**
   * When set and `merge` is requested, collapse multiple matching
   * source files (e.g. `file.1.parquet`, `file.2.parquet`) into one
   * destination via a glob pattern.
   */
  supportsMerge?: boolean
}

const DATA_CONVERT_ROUTES: ReadonlyArray<DataConvertRoute> = [
  // Parquet ↔ JSONL via DuckDB.
  {
    input: 'parquet',
    output: 'jsonl',
    supportsMerge: true,
    run: ({ source, destination }) =>
      convertParquetFileToJsonl({ input: source, output: destination }),
  },
  {
    input: 'jsonl',
    output: 'parquet',
    run: ({ source, destination }) =>
      convertJsonlFileToParquet({ input: source, output: destination }),
  },

  // CSV / TSV ↔ JSON / JSONL (pure JS via csv-parse).
  {
    input: 'csv',
    output: 'json',
    run: ({ source, destination }) =>
      convertCsvFileToJson({ source, destination }).then(() => undefined),
  },
  {
    input: 'csv',
    output: 'jsonl',
    run: ({ source, destination }) =>
      convertCsvFileToJsonl({ source, destination }).then(() => undefined),
  },
  {
    input: 'tsv',
    output: 'json',
    run: ({ source, destination }) =>
      convertCsvFileToJson({ source, destination, delimiter: '\t' }).then(() => undefined),
  },
  {
    input: 'tsv',
    output: 'jsonl',
    run: ({ source, destination }) =>
      convertCsvFileToJsonl({ source, destination, delimiter: '\t' }).then(() => undefined),
  },
  {
    input: 'json',
    output: 'csv',
    run: ({ source, destination }) =>
      convertJsonFileToCsv({ source, destination }).then(() => undefined),
  },
  {
    input: 'json',
    output: 'tsv',
    run: ({ source, destination }) =>
      convertJsonFileToCsv({ source, destination, delimiter: '\t' }).then(() => undefined),
  },
  {
    input: 'jsonl',
    output: 'csv',
    run: ({ source, destination }) =>
      convertJsonlFileToCsv({ source, destination }).then(() => undefined),
  },

  // JSON ↔ YAML (pure JS via the `yaml` package).
  {
    input: 'json',
    output: 'yaml',
    run: ({ source, destination }) =>
      convertJsonFileToYaml({ source, destination }).then(() => undefined),
  },
  {
    input: 'yaml',
    output: 'json',
    run: ({ source, destination }) =>
      convertYamlFileToJson({ source, destination }).then(() => undefined),
  },
  {
    input: 'yml',
    output: 'json',
    run: ({ source, destination }) =>
      convertYamlFileToJson({ source, destination }).then(() => undefined),
  },

  // XLSX ↔ CSV / JSON (sheetjs).
  {
    input: 'xlsx',
    output: 'csv',
    run: ({ source, destination }) =>
      convertXlsxFileToCsv({ source, destination }).then(() => undefined),
  },
  {
    input: 'xlsx',
    output: 'json',
    run: ({ source, destination }) =>
      convertXlsxFileToJson({ source, destination }).then(() => undefined),
  },
  {
    input: 'csv',
    output: 'xlsx',
    run: ({ source, destination }) =>
      convertCsvFileToXlsx({ source, destination }).then(() => undefined),
  },
  {
    input: 'json',
    output: 'xlsx',
    run: ({ source, destination }) =>
      convertJsonFileToXlsx({ source, destination }).then(() => undefined),
  },
]

async function convertDataNode(
  input: ConvertDataNodeLocalInternalInput,
): Promise<ConvertDataNodeOutput> {
  const stats: ConvertDataNodeOutput = {
    converted: 0,
    skipped: 0,
    failed: 0,
  }

  const srcExt = `.${input.input.format}`
  const dstExt = `.${input.output.format}`
  const srcRoot = input.input.directory.path
  const dstRoot = input.output.directory.path

  const route = DATA_CONVERT_ROUTES.find(
    r => r.input === input.input.format && r.output === input.output.format,
  )
  if (!route) {
    walk(srcRoot, abs => {
      if (abs.endsWith(srcExt)) stats.skipped++
    })
    return stats
  }

  const mergeMode = input.merge === true && route.supportsMerge === true

  fs.mkdirSync(dstRoot, { recursive: true })

  for (const [groupKey, files] of groupSourceFiles({
    root: srcRoot,
    srcExt,
    merge: mergeMode,
  })) {
    try {
      const first = files[0]!
      const relOut = mergeMode
        ? `${groupKey}${dstExt}`
        : path.relative(srcRoot, first).replace(srcExt, dstExt)
      const destination = path.join(dstRoot, relOut)
      fs.mkdirSync(path.dirname(destination), { recursive: true })

      const source = mergeMode
        ? path.join(
            path.dirname(first),
            `${path.basename(groupKey)}.*${srcExt}`,
          )
        : first

      await route.run({ source, destination })
      stats.converted++
    } catch (err) {
      stats.failed++
      const message = err instanceof Error ? err.message : String(err)
      console.error(`  failed ${groupKey}: ${message}`)
    }
  }

  return stats
}

function groupSourceFiles({
  root,
  srcExt,
  merge,
}: {
  root: string
  srcExt: string
  merge: boolean
}): Map<string, string[]> {
  const groups = new Map<string, string[]>()
  walk(root, abs => {
    if (!abs.endsWith(srcExt)) return
    const rel = path.relative(root, abs)
    const key = merge
      ? rel.slice(0, -srcExt.length).replace(/\.\d+$/, '')
      : rel
    const bucket = groups.get(key) ?? []
    bucket.push(abs)
    groups.set(key, bucket)
  })
  return groups
}

function walk(dir: string, onFile: (abs: string) => void): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(abs, onFile)
    } else if (entry.isFile()) {
      onFile(abs)
    }
  }
}

export default convertDataNode
export { convertDataNode }
