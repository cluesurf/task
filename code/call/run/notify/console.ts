import type { CommandModule } from 'yargs'

export const runNotifyConsole: CommandModule = {
  command: 'notify <message>',
  describe: 'Show a desktop notification',
  builder: y =>
    y
      .positional('message', { type: 'string', demandOption: true })
      .option('title', { type: 'string' })
      .option('sound', { type: 'boolean' })
      .option('urgency', { choices: ['low', 'normal', 'critical'] as const }),
  handler: async argv => {
    const { runNotifyNode } = await import('./node')
    await runNotifyNode({
      message: argv.message as string,
      title: argv.title as string | undefined,
      sound: argv.sound as boolean | undefined,
      urgency: argv.urgency as 'low' | 'normal' | 'critical' | undefined,
    })
  },
}
