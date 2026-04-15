import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const inspectTrafficConsole: CommandModule = {
  command: 'traffic',
  describe: 'Cloudflare traffic analytics (requests + bytes)',
  builder: y =>
    cfCommonFlags(y).option('group', {
      choices: ['country', 'path', 'status', 'none'] as const,
      default: 'none',
    }).option('top', {
      choices: ['path', 'country', 'ip'] as const,
      describe: 'Shortcut: set --group and sort by requests desc',
    }),
  handler: async argv => {
    const { traffic } = await import('~/code/tool/node/cloudflare')
    const group = (argv.top ?? (argv.group === 'none' ? undefined : argv.group)) as
      | 'country' | 'path' | 'status' | 'ip' | undefined
    printJson(
      await traffic(await resolveCfZone(argv.zone as string | undefined), {
        group: group ?? null,
        range: await resolveCfRange(argv.range as string | undefined),
      }),
    )
  },
}
