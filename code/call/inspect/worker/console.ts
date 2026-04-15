import type { CommandModule } from 'yargs'
import { cfCommonFlags } from '~/code/tool/node/cloudflare-cli'

export const inspectWorkerConsole: CommandModule = {
  command: 'worker <name>',
  describe: 'Cloudflare Worker: deployments or request/latency metrics',
  builder: y =>
    cfCommonFlags(y)
      .positional('name', { type: 'string', demandOption: true })
      .option('show', { choices: ['requests', 'latency', 'errors'] as const }),
  handler: async argv => {
    const { inspectWorker, workerMetrics } = await import('~/code/tool/node/cloudflare')
    if (argv.show) {
      const { printJson } = await import('~/code/tool/node/cloudflare-cli')
      printJson(
        await workerMetrics(argv.name as string, {
          show: argv.show as 'requests' | 'latency' | 'errors',
        }),
      )
    } else {
      process.stdout.write(await inspectWorker(argv.name as string))
    }
  },
}
