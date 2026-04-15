import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const measureBandwidthConsole: CommandModule = {
  command: 'bandwidth',
  describe: 'Cloudflare total bytes over the range',
  builder: y => cfCommonFlags(y),
  handler: async argv => {
    const { traffic } = await import('~/code/tool/node/cloudflare')
    const data = (await traffic(
      await resolveCfZone(argv.zone as string | undefined),
      { range: await resolveCfRange(argv.range as string | undefined) },
    )) as { viewer?: { zones?: { httpRequestsAdaptiveGroups: { sum: { bytes: number } }[] }[] } }
    const bytes = data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups
      ?.reduce((a, b) => a + (b.sum?.bytes ?? 0), 0) ?? 0
    printJson({ bytes })
  },
}
