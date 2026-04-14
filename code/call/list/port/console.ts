import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task list port',
  describe: 'List open TCP / UDP ports',
  options: [
    { long: 'status', describe: 'Filter by status, e.g. `open` / `LISTEN`' },
    { long: 'protocol', describe: 'tcp | udp' },
    { long: 'user', describe: 'Filter by user' },
  ],
  examples: [
    { comment: 'all listening ports', command: 'task list port --status open' },
    { comment: 'only tcp', command: 'task list port --protocol tcp' },
  ],
})

export const listPortConsole: CommandModule = {
  command: 'port',
  describe: 'List open TCP / UDP ports',
  builder: y =>
    y
      .option('status', { type: 'string' })
      .option('protocol', { type: 'string', choices: ['tcp', 'udp'] })
      .option('user', { type: 'string' }),
  handler: async argv => {
    const { listPortNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      status: argv.status as string | undefined,
      protocol: argv.protocol as 'tcp' | 'udp' | undefined,
      user: argv.user as string | undefined,
    }
    await runAction({
      action: 'list',
      input: input as unknown as Record<string, unknown>,
      run: () => listPortNode(input),
    })
  },
}
