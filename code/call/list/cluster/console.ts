import type { CommandModule } from 'yargs'
import { resolveFlag } from '~/code/tool/node/context'

export const listClusterConsole: CommandModule = {
  command: 'cluster',
  describe: 'List Kubernetes clusters (cloud-provider managed)',
  builder: y => y.option('platform', { alias: 'p', type: 'string' }),
  handler: async argv => {
    const { listClusters } = await import('~/code/tool/node/doctl')
    await resolveFlag('platform', argv.platform as string | undefined)
    process.stdout.write(await listClusters())
  },
}
