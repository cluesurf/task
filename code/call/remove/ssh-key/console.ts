import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task remove ssh-key',
  describe: 'Remove a named SSH key pair from ~/.ssh',
  options: [],
  examples: [
    { comment: 'drop an old key', command: 'task remove ssh-key prod' },
  ],
})

export const removeSshKeyConsole: CommandModule = {
  command: 'ssh-key <name>',
  describe: 'Remove a named SSH key pair',
  builder: y => y.positional('name', { type: 'string' }),
  handler: async argv => {
    const { removeSshKeyNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { name: argv.name as string }
    await runAction({
      action: 'remove',
      input: input as unknown as Record<string, unknown>,
      run: () => removeSshKeyNode(input),
    })
  },
}
