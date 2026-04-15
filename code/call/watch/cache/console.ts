import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const watchCacheConsole: CommandModule = {
  command: 'cache',
  describe: 'Poll Cloudflare cache hit rate every N seconds',
  builder: y =>
    cfCommonFlags(y).option('interval', { type: 'number', default: 30 }),
  handler: async argv => {
    const { cacheAnalytics } = await import('~/code/tool/node/cloudflare')
    const zone = await resolveCfZone(argv.zone as string | undefined)
    const interval = (argv.interval as number) * 1000
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const data = (await cacheAnalytics(zone, { range: '1h' })) as {
        viewer?: { zones?: { httpRequestsAdaptiveGroups: { sum: { requests: number; cachedRequests: number } }[] }[] }
      }
      const rows = data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups ?? []
      const total = rows.reduce((a, b) => a + (b.sum?.requests ?? 0), 0)
      const cached = rows.reduce((a, b) => a + (b.sum?.cachedRequests ?? 0), 0)
      printJson({ at: new Date().toISOString(), hitRate: total ? cached / total : 0, total, cached })
      await new Promise(r => setTimeout(r, interval))
    }
  },
}
