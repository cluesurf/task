import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task list network interface',
  describe: 'List network interfaces with their IPv4 / IPv6 addresses',
  options: [],
  examples: [
    { comment: 'quick overview', command: 'task list network interface' },
  ],
})

export const listNetworkInterfaceConsole: CommandModule = {
  command: 'interface',
  describe: 'List network interfaces',
  builder: y => y,
  handler: async () => {
    const { listNetworkInterfaceNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    await runAction({
      action: 'list',
      input: {},
      run: () => listNetworkInterfaceNode(),
    })
  },
}
