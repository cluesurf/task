import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const inspectCacheConsole: CommandModule = {
  command: 'cache',
  describe: 'Cloudflare cache breakdown (hit rate, status)',
  builder: y =>
    cfCommonFlags(y).option('show', {
      choices: ['hit-rate', 'status'] as const,
      default: 'status',
    }),
  handler: async argv => {
    const { cacheAnalytics } = await import('~/code/tool/node/cloudflare')
    printJson(
      await cacheAnalytics(await resolveCfZone(argv.zone as string | undefined), {
        show: argv.show as 'hit-rate' | 'status',
        range: await resolveCfRange(argv.range as string | undefined),
      }),
    )
  },
}
