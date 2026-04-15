import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const inspectAnalyticsConsole: CommandModule = {
  command: 'analytics',
  describe: 'Combined Cloudflare analytics (traffic + cache + security)',
  builder: y => cfCommonFlags(y),
  handler: async argv => {
    const cf = await import('~/code/tool/node/cloudflare')
    const zone = await resolveCfZone(argv.zone as string | undefined)
    const range = await resolveCfRange(argv.range as string | undefined)
    const [traffic, cache, security] = await Promise.all([
      cf.traffic(zone, { range }),
      cf.cacheAnalytics(zone, { range }),
      cf.securitySummary(zone, { range }),
    ])
    printJson({ traffic, cache, security })
  },
}
