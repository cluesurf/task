import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const inspectWafConsole: CommandModule = {
  command: 'waf',
  describe: 'Cloudflare WAF events (firewall events, source=waf)',
  builder: y => cfCommonFlags(y),
  handler: async argv => {
    const { firewallEvents } = await import('~/code/tool/node/cloudflare')
    const all = (await firewallEvents(
      await resolveCfZone(argv.zone as string | undefined),
      { range: await resolveCfRange(argv.range as string | undefined), limit: 500 },
    )) as { viewer?: { zones?: { firewallEventsAdaptive: { source: string }[] }[] } }
    const events = all?.viewer?.zones?.[0]?.firewallEventsAdaptive ?? []
    printJson(events.filter(e => /waf/i.test(e.source)))
  },
}
