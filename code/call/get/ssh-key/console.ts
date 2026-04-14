import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task get ssh-key',
  describe: 'Print the public key for a named SSH key',
  options: [],
  examples: [
    { comment: 'print to stdout', command: 'task get ssh-key prod' },
    { comment: 'pipe to clipboard on macOS', command: 'task get ssh-key prod | pbcopy' },
  ],
})

export const getSshKeyConsole: CommandModule = {
  command: 'ssh-key <name>',
  describe: 'Print the public key for a named SSH key',
  builder: y => y.positional('name', { type: 'string' }),
  handler: async argv => {
    const { getSshKeyNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { name: argv.name as string }
    await runAction({
      action: 'get',
      input: input as unknown as Record<string, unknown>,
      run: () => getSshKeyNode(input),
    })
  },
}
