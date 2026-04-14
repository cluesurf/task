import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task watch process',
  describe: 'Live-refreshing process table (Ctrl-C to exit)',
  options: [
    { long: 'text', describe: 'Filter to processes matching this pattern' },
    { long: 'interval', describe: 'Refresh interval in ms (default 1000)' },
    { long: 'top', describe: 'Show top N by cpu / memory instead of full list' },
    { long: 'limit', describe: 'Row cap (default 20)' },
  ],
  examples: [
    { comment: 'all processes, 1Hz', command: 'task watch process' },
    { comment: 'only node processes', command: 'task watch process --text node' },
    { comment: 'top 20 by memory', command: 'task watch process --top memory' },
  ],
})

export const watchProcessConsole: CommandModule = {
  command: 'process [text]',
  describe: 'Live-refreshing process table (Ctrl-C to exit)',
  builder: y =>
    y
      .positional('text', { type: 'string' })
      .option('text', { type: 'string' })
      .option('interval', { type: 'number', default: 1000 })
      .option('top', { type: 'string', choices: ['cpu', 'memory'] })
      .option('limit', { type: 'number', default: 20 }),
  handler: async argv => {
    // Positional text and --text collapse into one.
    const text =
      (argv.text as string | undefined) ??
      ((argv._ as Array<string | number>)[2] as string | undefined)
    const { watchProcessNode } = await import('./node')
    await watchProcessNode({
      text,
      interval: argv.interval as number,
      top: argv.top as 'cpu' | 'memory' | undefined,
      limit: argv.limit as number,
    })
  },
}
