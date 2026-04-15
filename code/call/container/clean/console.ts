import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task container clean',
  describe: 'Prune unused layers / dangling images / exited containers (with reclaim report)',
  options: [
    { long: 'all',                 describe: 'Drop tagged-but-unused images too (more aggressive)' },
    { long: 'volumes',             describe: 'Also nuke unused volumes (destructive)' },
    { long: 'no-stats',            describe: 'Skip the before/after disk usage probe' },
  ],
  examples: [
    { comment: 'gentle prune',           command: 'task container clean' },
    { comment: 'aggressive (kill tagged)', command: 'task container clean --all' },
    { comment: 'nuclear (volumes too)',  command: 'task container clean --all --volumes' },
  ],
})

export const containerCleanConsole: CommandModule = {
  command: 'clean',
  describe: 'Prune Docker disk usage with before/after report',
  builder: y => y
    .option('all',      { type: 'boolean' })
    .option('volumes',  { type: 'boolean' })
    .option('no-stats', { type: 'boolean' }),
  handler: async argv => {
    const { runClean } = await import('~/code/tool/node/container/base')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      all: argv.all as boolean | undefined,
      volumes: argv.volumes as boolean | undefined,
      noStats: argv['no-stats'] as boolean | undefined,
    }
    await runAction({
      action: 'remove',
      input: input as unknown as Record<string, unknown>,
      run: () => runClean(input),
    })
  },
}
