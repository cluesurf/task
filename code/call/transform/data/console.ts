import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task transform data',
  describe:
    'Reshape a structured-data file via a config map / jq expr / SQL query',
  options: [
    { long: 'output', short: 'o', describe: 'Write result to this path (stdout if omitted)' },
    { long: 'map', describe: 'Path to a YAML/JSON map config (rename / pick / drop / coerce / default)' },
    { long: 'jq', describe: 'Inline jq expression' },
    { long: 'sql', describe: 'Inline SQL — input is bound as `in` (DuckDB)' },
    { long: 'input-format', describe: 'Override input format (csv/tsv/json/jsonl/yaml)' },
    { long: 'output-format', describe: 'Override output format (json/jsonl/yaml)' },
  ],
  examples: [
    {
      comment: 'project columns via a map config',
      command: 'task transform data users.csv --map mapping.yml -o users.json',
    },
    {
      comment: 'jq expression',
      command: 'task transform data logs.jsonl --jq \'.[] | select(.level=="error")\'',
    },
    {
      comment: 'DuckDB SQL',
      command: 'task transform data data.csv --sql "SELECT id,email FROM in WHERE active"',
    },
  ],
})

export const transformDataConsole: CommandModule = {
  command: 'data <path>',
  describe: 'Reshape a structured-data file (map / jq / sql)',
  builder: y =>
    y
      .positional('path', { type: 'string', demandOption: true })
      .option('output', { alias: 'o', type: 'string' })
      .option('map', { type: 'string' })
      .option('jq', { type: 'string' })
      .option('sql', { type: 'string' })
      .option('input-format', { type: 'string' })
      .option('output-format', { type: 'string' })
      .check(argv => {
        const set = ['map', 'jq', 'sql'].filter(k => argv[k] !== undefined)
        if (set.length !== 1) {
          throw new Error(
            'transform data: pass exactly one of --map / --jq / --sql',
          )
        }
        return true
      }),
  handler: async argv => {
    const { transformDataNode } = await import('./node')
    const driver: 'map' | 'jq' | 'sql' = argv.map
      ? 'map'
      : argv.jq
        ? 'jq'
        : 'sql'
    await transformDataNode({
      input: {
        file: { path: argv.path as string },
        format: argv['input-format'] as string | undefined,
      },
      output: argv.output
        ? {
            file: { path: argv.output as string },
            format: argv['output-format'] as string | undefined,
          }
        : undefined,
      driver,
      mapConfig: argv.map as string | undefined,
      jq: argv.jq as string | undefined,
      sql: argv.sql as string | undefined,
    })
  },
}
