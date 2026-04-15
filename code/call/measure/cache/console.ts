import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const measureCacheConsole: CommandModule = {
  command: 'cache',
  describe: 'Cloudflare cache hit rate',
  builder: y =>
    cfCommonFlags(y).option('show', {
      choices: ['hit-rate', 'status'] as const,
      default: 'hit-rate',
    }),
  handler: async argv => {
    const { cacheAnalytics } = await import('~/code/tool/node/cloudflare')
    const data = (await cacheAnalytics(
      await resolveCfZone(argv.zone as string | undefined),
      { range: await resolveCfRange(argv.range as string | undefined) },
    )) as {
      viewer?: {
        zones?: {
          httpRequestsAdaptiveGroups: {
            sum: { requests: number; cachedRequests: number }
          }[]
        }[]
      }
    }
    const rows = data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups ?? []
    const total = rows.reduce((a, b) => a + (b.sum?.requests ?? 0), 0)
    const cached = rows.reduce((a, b) => a + (b.sum?.cachedRequests ?? 0), 0)
    printJson({
      hitRate: total ? cached / total : 0,
      total,
      cached,
    })
  },
}
