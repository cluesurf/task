import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task inspect port',
  describe: 'Show who owns a port (PID, command, user)',
  options: [
    { long: 'show', short: 's', describe: 'Add `process` to include full process details' },
  ],
  examples: [
    { comment: 'who owns port 3000', command: 'task inspect port 3000' },
    { comment: 'with owning process info', command: 'task inspect port 3000 --show process' },
  ],
})

export const inspectPortConsole: CommandModule = {
  command: 'port <port>',
  describe: 'Show who owns a port',
  builder: y =>
    y
      .positional('port', { type: 'number' })
      .option('show', { alias: 's', type: 'string' }),
  handler: async argv => {
    const { inspectPortNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      port: argv.port as number,
      show: argv.show as string | undefined,
    }
    await runAction({
      action: 'inspect',
      input: input as unknown as Record<string, unknown>,
      run: () => inspectPortNode(input),
    })
  },
}
