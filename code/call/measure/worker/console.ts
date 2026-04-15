import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson } from '~/code/tool/node/cloudflare-cli'

export const measureWorkerConsole: CommandModule = {
  command: 'worker <name>',
  describe: 'Cloudflare Worker metrics (requests, latency, errors)',
  builder: y =>
    cfCommonFlags(y)
      .positional('name', { type: 'string', demandOption: true })
      .option('show', {
        choices: ['requests', 'latency', 'errors'] as const,
        default: 'requests',
      }),
  handler: async argv => {
    const { workerMetrics } = await import('~/code/tool/node/cloudflare')
    printJson(
      await workerMetrics(argv.name as string, {
        show: argv.show as 'requests' | 'latency' | 'errors',
      }),
    )
  },
}
