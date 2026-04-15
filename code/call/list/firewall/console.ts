import type { CommandModule } from 'yargs'
import { resolveFlag } from '~/code/tool/node/context'

export const listFirewallConsole: CommandModule = {
  command: 'firewall',
  describe: 'List cloud firewalls',
  builder: y => y.option('platform', { alias: 'p', type: 'string' }),
  handler: async argv => {
    const { listFirewalls } = await import('~/code/tool/node/doctl')
    await resolveFlag('platform', argv.platform as string | undefined)
    process.stdout.write(await listFirewalls())
  },
}
