import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvString } from '~/code/tool/shared/verb'

registerHelp({
  command: 'task remove ssh-key',
  describe: 'Remove a named SSH key pair from ~/.ssh',
  options: [],
  examples: [
    { comment: 'drop an old key', command: 'task remove ssh-key prod' },
  ],
})

function builder(y: Argv) {
  return y.positional('name', { type: 'string' })
}

async function handler(argv: Record<string, unknown>) {
  const { removeSshKeyNode } = await import('./node')
  const name = argvString(argv.name) ?? ''
  await runAction({
    action: 'remove',
    input: { name } as Record<string, unknown>,
    run: () => removeSshKeyNode({ name }),
  })
}

export const removeSshKeyConsole: CommandModule = {
  command: 'ssh-key <name>',
  describe: 'Remove a named SSH key pair',
  builder,
  handler,
}
