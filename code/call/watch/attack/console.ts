import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const watchAttackConsole: CommandModule = {
  command: 'attack',
  describe: 'Stream Cloudflare firewall events (poll every N seconds)',
  builder: y =>
    cfCommonFlags(y).option('interval', { type: 'number', default: 15 }),
  handler: async argv => {
    const { firewallEvents } = await import('~/code/tool/node/cloudflare')
    const zone = await resolveCfZone(argv.zone as string | undefined)
    const interval = (argv.interval as number) * 1000
    const seen = new Set<string>()
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const data = (await firewallEvents(zone, { range: '1h', limit: 100 })) as {
        viewer?: { zones?: { firewallEventsAdaptive: Array<Record<string, unknown>> }[] }
      }
      const events = data?.viewer?.zones?.[0]?.firewallEventsAdaptive ?? []
      for (const e of events) {
        const key = `${e['datetime']}|${e['ruleId']}|${e['clientIP']}`
        if (seen.has(key)) continue
        seen.add(key)
        printJson(e)
      }
      await new Promise(r => setTimeout(r, interval))
    }
  },
}
