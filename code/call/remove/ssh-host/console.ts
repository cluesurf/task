import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvString } from '~/code/tool/shared/verb'

registerHelp({
  command: 'task remove ssh-host',
  describe: 'Remove a Host entry from ~/.ssh/config',
  options: [],
  examples: [
    {
      comment: 'drop an old host',
      command: 'task remove ssh-host old-box',
    },
  ],
})

function builder(y: Argv) {
  return y.positional('name', { type: 'string' })
}

async function handler(argv: Record<string, unknown>) {
  const { removeSshHostNode } = await import('./node')
  const name = argvString(argv.name) ?? ''
  await runAction({
    action: 'remove',
    input: { name } as Record<string, unknown>,
    run: () => removeSshHostNode({ name }),
  })
}

export const removeSshHostConsole: CommandModule = {
  command: 'ssh-host <name>',
  describe: 'Remove a Host entry from ~/.ssh/config',
  builder,
  handler,
}
