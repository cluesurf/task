import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const watchRequestConsole: CommandModule = {
  command: 'request',
  describe: 'Poll Cloudflare request + bandwidth every N seconds',
  builder: y =>
    cfCommonFlags(y).option('interval', { type: 'number', default: 30 }),
  handler: async argv => {
    const { traffic } = await import('~/code/tool/node/cloudflare')
    const zone = await resolveCfZone(argv.zone as string | undefined)
    const interval = (argv.interval as number) * 1000
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const data = (await traffic(zone, { range: '1h' })) as {
        viewer?: { zones?: { httpRequestsAdaptiveGroups: { sum: { requests: number; bytes: number } }[] }[] }
      }
      const rows = data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups ?? []
      const requests = rows.reduce((a, b) => a + (b.sum?.requests ?? 0), 0)
      const bytes = rows.reduce((a, b) => a + (b.sum?.bytes ?? 0), 0)
      printJson({ at: new Date().toISOString(), requests, bytes })
      await new Promise(r => setTimeout(r, interval))
    }
  },
}
