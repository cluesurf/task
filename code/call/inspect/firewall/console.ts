import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const inspectFirewallConsole: CommandModule = {
  command: 'firewall',
  describe: 'Cloudflare firewall events (last N)',
  builder: y => cfCommonFlags(y).option('limit', { type: 'number', default: 100 }),
  handler: async argv => {
    const { firewallEvents } = await import('~/code/tool/node/cloudflare')
    printJson(
      await firewallEvents(await resolveCfZone(argv.zone as string | undefined), {
        range: await resolveCfRange(argv.range as string | undefined),
        limit: argv.limit as number,
      }),
    )
  },
}
