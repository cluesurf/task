import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const inspectRequestConsole: CommandModule = {
  command: 'request',
  describe: 'Cloudflare request analytics (breakdown by ip/country/status)',
  builder: y =>
    cfCommonFlags(y)
      .option('group', { choices: ['country', 'path', 'ip', 'status'] as const })
      .option('top', { choices: ['path', 'country', 'ip'] as const }),
  handler: async argv => {
    const { traffic } = await import('~/code/tool/node/cloudflare')
    const group = (argv.top ?? argv.group) as 'country' | 'path' | 'ip' | 'status' | undefined
    printJson(
      await traffic(await resolveCfZone(argv.zone as string | undefined), {
        group: group ?? null,
        range: await resolveCfRange(argv.range as string | undefined),
      }),
    )
  },
}
