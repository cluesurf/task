import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task copy ssh-key',
  describe: 'Copy the public key for a named SSH key to the clipboard',
  options: [],
  examples: [
    { comment: 'copy prod.pub', command: 'task copy ssh-key prod' },
  ],
})

export const copySshKeyConsole: CommandModule = {
  command: 'ssh-key <name>',
  describe: 'Copy the public key for a named SSH key to the clipboard',
  builder: y => y.positional('name', { type: 'string' }),
  handler: async argv => {
    const { copySshKeyNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { name: argv.name as string }
    await runAction({
      action: 'copy',
      input: input as unknown as Record<string, unknown>,
      run: () => copySshKeyNode(input),
    })
  },
}
