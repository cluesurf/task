import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson } from '~/code/tool/node/cloudflare-cli'

export const listWorkerConsole: CommandModule = {
  command: 'worker',
  describe: 'List Cloudflare Workers scripts',
  builder: y => cfCommonFlags(y),
  handler: async () => {
    const { listWorkers } = await import('~/code/tool/node/cloudflare')
    printJson(await listWorkers())
  },
}
