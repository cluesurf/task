import type { CommandModule } from 'yargs'
import { resolveFlag } from '~/code/tool/node/context'

export const inspectMachineConsole: CommandModule = {
  command: 'machine <name>',
  describe: 'Inspect a cloud machine / VM',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .option('platform', { alias: 'p', type: 'string' }),
  handler: async argv => {
    const { inspectMachineNode } = await import('./node')
    const platform = (await resolveFlag('platform', argv.platform as string | undefined)) ?? 'do'
    process.stdout.write(
      await inspectMachineNode({ name: argv.name as string, platform }),
    )
  },
}
