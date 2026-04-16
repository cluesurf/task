/**
 * Execute data-conversion actions by shelling out to the
 * `duckdb` CLI via `spawnAndWait`. The command builders are in
 * `./command.ts`.
 */

import { spawnAndWait } from '~/code/tool/node/spawn'
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
  const command = buildCommandToConvertParquetToJsonl(input)
  await spawnAndWait({
    verb: 'convert parquet to jsonl',
    bin: command.bin,
    args: command.args,
  })
}

/** Convert a JSONL file to parquet with optional explicit columns. */
export async function convertJsonlFileToParquet(
  input: BuildJsonlToParquetInput,
): Promise<void> {
  const command = buildCommandToConvertJsonlToParquet(input)
  await spawnAndWait({
    verb: 'convert jsonl to parquet',
    bin: command.bin,
    args: command.args,
  })
}

export default convertParquetFileToJsonl
