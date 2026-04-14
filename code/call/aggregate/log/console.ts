import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task aggregate log',
  describe: 'Tally log entries grouped by a field (status, level, method, ...)',
  options: [
    { long: 'key', short: 'k', describe: 'Field to group by (e.g. status, level, method, path)' },
    { long: 'limit', describe: 'Top N groups (default 20)' },
  ],
  examples: [
    { comment: 'nginx status codes', command: 'task aggregate log access.log --key status' },
    { comment: 'by log level', command: 'task aggregate log app.log --key level' },
    { comment: 'top 10 endpoints', command: 'task aggregate log access.log --key path --limit 10' },
  ],
})

export const aggregateLogConsole: CommandModule = {
  command: 'log <file>',
  describe: 'Tally log entries grouped by a field',
  builder: y =>
    y
      .positional('file', { type: 'string', describe: 'Log file path' })
      .option('key', { alias: 'k', type: 'string', demandOption: true })
      .option('limit', { type: 'number', default: 20 }),
  handler: async argv => {
    const { aggregateLogNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      file: argv.file as string,
      key: argv.key as string,
      limit: argv.limit as number,
    }
    await runAction({
      action: 'aggregate',
      input: input as unknown as Record<string, unknown>,
      run: () => aggregateLogNode(input),
    })
  },
}
