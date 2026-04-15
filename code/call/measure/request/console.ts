import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const measureRequestConsole: CommandModule = {
  command: 'request',
  describe: 'Cloudflare total requests over the range (single metric)',
  builder: y => cfCommonFlags(y),
  handler: async argv => {
    const { traffic } = await import('~/code/tool/node/cloudflare')
    const data = (await traffic(
      await resolveCfZone(argv.zone as string | undefined),
      { range: await resolveCfRange(argv.range as string | undefined) },
    )) as { viewer?: { zones?: { httpRequestsAdaptiveGroups: { sum: { requests: number } }[] }[] } }
    const n = data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups
      ?.reduce((a, b) => a + (b.sum?.requests ?? 0), 0) ?? 0
    printJson({ requests: n })
  },
}
