import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson } from '~/code/tool/node/cloudflare-cli'

export const measureR2Console: CommandModule = {
  command: 'r2',
  describe: 'Cloudflare R2 metrics (egress, ops)',
  builder: y =>
    cfCommonFlags(y).option('show', {
      choices: ['egress', 'ops'] as const,
      default: 'egress',
    }),
  handler: async argv => {
    const { r2Metrics } = await import('~/code/tool/node/cloudflare')
    printJson(await r2Metrics({ show: argv.show as 'egress' | 'ops' }))
  },
}
