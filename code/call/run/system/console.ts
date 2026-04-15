import type { CommandModule } from 'yargs'

export const runSystemConsole: CommandModule = {
  command: 'system <action>',
  describe: 'Power / session control (sleep | lock | shutdown | restart)',
  builder: y =>
    y
      .positional('action', {
        choices: ['sleep', 'lock', 'shutdown', 'restart'] as const,
        demandOption: true,
      })
      .option('delay', {
        type: 'number',
        default: 0,
        describe: 'Delay in seconds before shutdown/restart',
      }),
  handler: async argv => {
    const { runSystemNode } = await import('./node')
    await runSystemNode({
      action: argv.action as 'sleep' | 'lock' | 'shutdown' | 'restart',
      delay: argv.delay as number,
    })
  },
}
