import type { CommandModule } from 'yargs'
import { resolveFlag } from '~/code/tool/node/context'

// Notes on option naming:
// - `-f` alias was removed from `--field` because the top-level
//   `--format` (pretty | json | ...) already owns `-f`. Users who
//   want json redirection pass `--format json` at the task level.
// - `--format` isn't redeclared locally either — it's a task-wide
//   flag. We read it off argv and translate to node.ts's
//   `format: 'json' | undefined` below.

export const inspectUsageConsole: CommandModule = {
  command: 'usage',
  describe:
    'Cloud machine usage over time (multiple fields, chart / table / json views)',
  builder: y =>
    y
      .option('platform', { alias: 'p', type: 'string' })
      .option('id', { type: 'string', describe: 'Optional specific machine id' })
      .option('field', {
        type: 'string',
        default: 'cpu',
        describe: 'Comma-separated: cpu,memory,bandwidth,load,filesystem-free',
      })
      .option('time', {
        alias: 't',
        type: 'string',
        default: '1h',
        describe: '1h, 24h, 2d',
      })
      .option('view', {
        choices: ['chart', 'table', 'series', 'json'] as const,
        default: 'table',
        describe:
          'chart: blessed-contrib line chart • table: last-value + sparkline (default) • series: one row per sample • json: raw',
      }),
  handler: async argv => {
    const { inspectUsageNode } = await import('./node')
    const platform = (await resolveFlag('platform', argv.platform as string | undefined)) ?? 'do'
    const fields = (argv.field as string)
      .split(',')
      .map(s => s.trim())
      .filter(Boolean) as Array<'cpu' | 'memory' | 'load' | 'filesystem-free' | 'bandwidth'>
    const globalFormat = argv.format as string | undefined
    await inspectUsageNode({
      platform,
      fields,
      id: argv.id as string | undefined,
      time: argv.time as string,
      view: argv.view as 'chart' | 'table' | 'series' | 'json',
      format: globalFormat && globalFormat.startsWith('json') ? 'json' : undefined,
    })
  },
}
