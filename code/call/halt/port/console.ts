import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task halt port',
  describe: 'Kill whatever is listening on a port',
  options: [
    { long: 'signal', describe: 'Signal name (default SIGTERM)' },
  ],
  examples: [
    { comment: 'free port 3000', command: 'task halt port 3000' },
  ],
})

export const haltPortConsole: CommandModule = {
  command: 'port <port>',
  describe: 'Kill whatever is listening on a port',
  builder: y =>
    y
      .positional('port', { type: 'number', describe: 'Port number' })
      .option('signal', { type: 'string', default: 'SIGTERM' }),
  handler: async argv => {
    const port = argv.port as number
    const signal = argv.signal as NodeJS.Signals
    const { haltPortNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    await runAction({
      action: 'halt',
      input: { port, signal } as unknown as Record<string, unknown>,
      run: () => haltPortNode({ port, signal }),
    })
  },
}
