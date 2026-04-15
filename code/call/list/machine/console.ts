import type { CommandModule } from 'yargs'
import { resolveFlag } from '~/code/tool/node/context'

export const listMachineConsole: CommandModule = {
  command: 'machine',
  describe: 'List cloud machines / VMs',
  builder: y =>
    y
      .option('platform', {
        alias: 'p',
        type: 'string',
        describe: 'do | digital-ocean (more providers to come)',
      })
      .option('show', { choices: ['ip'] as const })
      .option('json', { type: 'boolean' }),
  handler: async argv => {
    const { listMachineNode } = await import('./node')
    const platform = (await resolveFlag('platform', argv.platform as string | undefined)) ?? 'do'
    process.stdout.write(
      await listMachineNode({
        platform,
        show: argv.show as 'ip' | undefined,
        json: argv.json as boolean | undefined,
      }),
    )
  },
}
