import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task inspect system',
  describe: 'System summary: CPU / memory / disk / uptime',
  options: [
    {
      long: 'show',
      short: 's',
      describe: 'Comma list: `cpu`, `memory`, `disk` (default: all)',
    },
  ],
  examples: [
    { comment: 'everything', command: 'task inspect system' },
    { comment: 'just memory + disk', command: 'task inspect system --show memory,disk' },
  ],
})

export const inspectSystemConsole: CommandModule = {
  command: 'system',
  describe: 'System summary',
  builder: y => y.option('show', { alias: 's', type: 'string' }),
  handler: async argv => {
    const { inspectSystemNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { show: argv.show as string | undefined }
    await runAction({
      action: 'inspect',
      input: input as unknown as Record<string, unknown>,
      run: () => inspectSystemNode(input),
    })
  },
}
