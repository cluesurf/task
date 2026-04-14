/**
 * Execute data-conversion actions by shelling out to the
 * `duckdb` CLI via the shared `runCommandSequence` runner.
 * The command sequences themselves are assembled in
 * `./command.ts`.
 */

import { runCommandSequence } from '~/code/tool/node/command'
import {
  buildCommandToConvertJsonlToParquet,
  buildCommandToConvertParquetToJsonl,
  type BuildJsonlToParquetInput,
  type BuildParquetToJsonlInput,
} from './command'

/** Convert a parquet file (or glob) to a JSONL file. */
export async function convertParquetFileToJsonl(
  input: BuildParquetToJsonlInput,
): Promise<void> {
  await runCommandSequence(buildCommandToConvertParquetToJsonl(input))
}

/** Convert a JSONL file to parquet with optional explicit columns. */
export async function convertJsonlFileToParquet(
  input: BuildJsonlToParquetInput,
): Promise<void> {
  await runCommandSequence(buildCommandToConvertJsonlToParquet(input))
}
