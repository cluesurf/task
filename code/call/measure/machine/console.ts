import type { CommandModule } from 'yargs'
import { resolveFlag } from '~/code/tool/node/context'

export const measureMachineConsole: CommandModule = {
  command: 'machine <id>',
  describe: 'Cloud-machine monitoring metrics (cpu / memory / bandwidth / load / filesystem-free)',
  builder: y =>
    y
      .positional('id', { type: 'string', demandOption: true })
      .option('platform', { alias: 'p', type: 'string' })
      .option('field', {
        choices: ['cpu', 'memory', 'load', 'filesystem-free', 'bandwidth'] as const,
        default: 'cpu',
      }),
  handler: async argv => {
    const { measureMachineNode } = await import('./node')
    const platform = (await resolveFlag('platform', argv.platform as string | undefined)) ?? 'do'
    process.stdout.write(
      await measureMachineNode({
        id: argv.id as string,
        platform,
        field: argv.field as 'cpu' | 'memory' | 'load' | 'filesystem-free' | 'bandwidth',
      }),
    )
  },
}
