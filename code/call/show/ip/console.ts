import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task show ip',
  describe: 'Print the machine\'s IPv4 / IPv6 addresses',
  options: [
    { long: 'all', short: 'a', describe: 'List every address (default: primary only)' },
  ],
  examples: [
    { comment: 'primary IPv4', command: 'task show ip' },
    { comment: 'every interface', command: 'task show ip --all' },
  ],
})

export const showIpConsole: CommandModule = {
  command: 'ip',
  describe: 'Print the machine\'s IPv4 / IPv6 addresses',
  builder: y => y.option('all', { alias: 'a', type: 'boolean', default: false }),
  handler: async argv => {
    const { showIpNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { all: argv.all as boolean }
    await runAction({
      action: 'show',
      input: input as unknown as Record<string, unknown>,
      run: () => showIpNode(input),
    })
  },
}
