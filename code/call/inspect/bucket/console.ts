import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson } from '~/code/tool/node/cloudflare-cli'

export const inspectBucketConsole: CommandModule = {
  command: 'bucket <name>',
  describe: 'Cloudflare R2 bucket details',
  builder: y =>
    cfCommonFlags(y)
      .positional('name', { type: 'string', demandOption: true })
      .option('show', { choices: ['size', 'objects'] as const }),
  handler: async argv => {
    const { inspectBucket } = await import('~/code/tool/node/cloudflare')
    printJson(
      await inspectBucket(argv.name as string, {
        show: argv.show as 'size' | 'objects' | undefined,
      }),
    )
  },
}
