/**
 * Yargs subcommand definition for `task convert data`.
 *
 * Options are derived from the `convert_data_command_input`
 * form schema (generated from `code/base/data/base.ts` and
 * `./base.ts` via `pnpm make:type`). The handler lazy-imports
 * `./node` so DuckDB isn't loaded until the command runs.
 */

import type { CommandModule } from 'yargs'
import {
  applyFormOptions,
  unpackFormArgv,
} from '~/code/tool/shared/console'
import { options } from '~/code/form/action/convert/data/console/options'

export const convertDataConsole: CommandModule = {
  command: 'data',
  describe:
    'Convert a folder tree between structured-data formats (parquet, jsonl, json, csv)',
  builder: y => applyFormOptions(y, options),
  handler: async argv => {
    const input = unpackFormArgv(
      argv as Record<string, unknown>,
      options,
    )
    const { convertDataNode } = await import('./node')
    const result = await convertDataNode(input as never)
    console.log(
      `Converted: ${result.converted}, Skipped: ${result.skipped}, Failed: ${result.failed}`,
    )
  },
}
