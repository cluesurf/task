import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson } from '~/code/tool/node/cloudflare-cli'

export const listBucketConsole: CommandModule = {
  command: 'bucket',
  describe: 'List Cloudflare R2 buckets (--tool r2)',
  builder: y => cfCommonFlags(y),
  handler: async () => {
    const { listBuckets } = await import('~/code/tool/node/cloudflare')
    printJson(await listBuckets())
  },
}
