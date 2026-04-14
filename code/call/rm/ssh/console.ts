import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task rm ssh',
  describe: 'Remove a Host entry from ~/.ssh/config',
  options: [],
  examples: [
    { comment: 'drop an old host', command: 'task rm ssh old-box' },
  ],
})

export const rmSshConsole: CommandModule = {
  command: 'ssh <name>',
  describe: 'Remove a Host entry from ~/.ssh/config',
  builder: y => y.positional('name', { type: 'string' }),
  handler: async argv => {
    const { rmSshNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { name: argv.name as string }
    await runAction({
      action: 'rm',
      input: input as unknown as Record<string, unknown>,
      run: () => rmSshNode(input),
    })
  },
}
