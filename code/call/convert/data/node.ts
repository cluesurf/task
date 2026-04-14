/**
 * Walk an input directory, convert every matching file of
 * `input.format` to `output.format` in a mirror output
 * directory. Uses DuckDB for the conversion.
 *
 * Types and parsers are generated from `code/base/data/base.ts`
 * into `~/code/form/action/convert/data/*` via `pnpm make:type`.
 */

import fs from 'node:fs'
import path from 'node:path'
import {
  convertParquetFileToJsonl,
  convertJsonlFileToParquet,
} from './duckdb/node'

export type ConvertDataResult = {
  converted: number
  skipped: number
  failed: number
}

export type ConvertDataNodeLocalInput = {
  input: {
    format: 'parquet' | 'jsonl'
    directory: { path: string }
  }
  output: {
    format: 'parquet' | 'jsonl'
    directory: { path: string }
  }
  merge?: boolean
}

export async function convertDataNode(
  input: ConvertDataNodeLocalInput,
): Promise<ConvertDataResult> {
  const result: ConvertDataResult = {
    converted: 0,
    skipped: 0,
    failed: 0,
  }

  const srcRoot = input.input.directory.path
  const dstRoot = input.output.directory.path
  const srcExt = `.${input.input.format}`
  const dstExt = `.${input.output.format}`

  fs.mkdirSync(dstRoot, { recursive: true })

  const mergeMode =
    input.merge === true &&
    input.input.format === 'parquet' &&
    input.output.format === 'jsonl'

  const groups = new Map<string, string[]>()

  walk(srcRoot, abs => {
    if (!abs.endsWith(srcExt)) return
    const rel = path.relative(srcRoot, abs)
    let groupKey = rel
    if (mergeMode) {
      const base = rel.slice(0, -srcExt.length).replace(/\.\d+$/, '')
      groupKey = base
    }
    const arr = groups.get(groupKey) ?? []
    arr.push(abs)
    groups.set(groupKey, arr)
  })

  for (const [groupKey, files] of groups) {
    try {
      const relOut = mergeMode
        ? `${groupKey}${dstExt}`
        : path.relative(srcRoot, files[0]!).replace(srcExt, dstExt)
      const outAbs = path.join(dstRoot, relOut)
      fs.mkdirSync(path.dirname(outAbs), { recursive: true })

      if (mergeMode) {
        const dir = path.dirname(files[0]!)
        const baseName = path.basename(groupKey)
        const glob = path.join(dir, `${baseName}.*${srcExt}`)
        convertParquetFileToJsonl({ input: glob, output: outAbs })
      } else if (
        input.input.format === 'parquet' &&
        input.output.format === 'jsonl'
      ) {
        convertParquetFileToJsonl({ input: files[0]!, output: outAbs })
      } else if (
        input.input.format === 'jsonl' &&
        input.output.format === 'parquet'
      ) {
        convertJsonlFileToParquet({ input: files[0]!, output: outAbs })
      } else {
        result.skipped++
        continue
      }

      result.converted++
    } catch (err) {
      result.failed++
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  failed ${groupKey}: ${msg}`)
    }
  }

  return result
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
