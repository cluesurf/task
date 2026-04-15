import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const inspectSecurityConsole: CommandModule = {
  command: 'security',
  describe: 'Cloudflare security summary (firewall actions, sources)',
  builder: y => cfCommonFlags(y),
  handler: async argv => {
    const { securitySummary } = await import('~/code/tool/node/cloudflare')
    printJson(
      await securitySummary(await resolveCfZone(argv.zone as string | undefined), {
        range: await resolveCfRange(argv.range as string | undefined),
      }),
    )
  },
}
