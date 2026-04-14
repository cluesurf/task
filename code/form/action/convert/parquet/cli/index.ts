/**
 * CLI input for the parquet ↔ jsonl folder-tree converter.
 *
 * Given an input directory containing files of `input.format`,
 * walk the tree and emit a mirror output directory of files
 * in `output.format`. Current supported pairs:
 *
 *   parquet -> jsonl
 *   jsonl   -> parquet
 *
 * Optionally merge sharded files matching a glob
 * (e.g. `string.*.parquet`) into a single output when going
 * parquet -> jsonl.
 */

export type ConvertParquetJsonlFormat = 'parquet' | 'jsonl'

export type ConvertParquetJsonlCommandInput = {
  input: {
    format: ConvertParquetJsonlFormat
    directory: {
      path: string
    }
  }
  output: {
    format: ConvertParquetJsonlFormat
    directory: {
      path: string
    }
  }
  /** Merge sharded files (e.g. `name.0001.parquet` + `name.0002.parquet`
   *  into a single `name.jsonl`). Only applies parquet -> jsonl. */
  merge?: boolean
  /** Glob patterns to include. Default: all files of input.format. */
  include?: string[]
  help?: boolean
}
