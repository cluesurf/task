import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const inspectBotConsole: CommandModule = {
  command: 'bot',
  describe: 'Cloudflare Bot Management activity (firewall events, source=bot-mgmt)',
  builder: y => cfCommonFlags(y),
  handler: async argv => {
    const { firewallEvents } = await import('~/code/tool/node/cloudflare')
    const all = (await firewallEvents(
      await resolveCfZone(argv.zone as string | undefined),
      { range: await resolveCfRange(argv.range as string | undefined), limit: 500 },
    )) as { viewer?: { zones?: { firewallEventsAdaptive: { source: string }[] }[] } }
    const events = all?.viewer?.zones?.[0]?.firewallEventsAdaptive ?? []
    printJson(events.filter(e => /bot/i.test(e.source)))
  },
}
