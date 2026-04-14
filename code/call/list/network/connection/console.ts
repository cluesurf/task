import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task list network connection',
  describe: 'List open network connections (alias for `list port`)',
  options: [
    { long: 'status', describe: 'Filter by status, e.g. `open` / `LISTEN`' },
    { long: 'protocol', describe: 'tcp | udp' },
    { long: 'user', describe: 'Filter by user' },
    { long: 'sort', describe: 'Sort by: port, protocol, status, pid, user, command' },
    { long: 'direction', describe: 'increasing (default) | decreasing' },
  ],
  examples: [
    { comment: 'listening ports only', command: 'task list network connection --status open' },
    { comment: 'sort by status',        command: 'task list network connection --sort status' },
  ],
})

export const listNetworkConnectionConsole: CommandModule = {
  command: 'connection',
  describe: 'List open network connections',
  builder: y =>
    y
      .option('status', { type: 'string' })
      .option('protocol', { type: 'string', choices: ['tcp', 'udp'] })
      .option('user', { type: 'string' })
      .option('sort', {
        type: 'string',
        choices: ['port', 'protocol', 'status', 'pid', 'user', 'command'],
      })
      .option('direction', {
        type: 'string',
        choices: ['increasing', 'decreasing'],
      }),
  handler: async argv => {
    const { listPortNode } = await import('../../port/node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      status: argv.status as string | undefined,
      protocol: argv.protocol as 'tcp' | 'udp' | undefined,
      user: argv.user as string | undefined,
      sort: argv.sort as
        | 'port' | 'protocol' | 'status' | 'pid' | 'user' | 'command'
        | undefined,
      direction: argv.direction as 'increasing' | 'decreasing' | undefined,
    }
    await runAction({
      action: 'list',
      input: input as unknown as Record<string, unknown>,
      run: () => listPortNode(input),
    })
  },
}
