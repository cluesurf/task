import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task edit ssh',
  describe: 'Open ~/.ssh/config in $EDITOR (falls back to vi / nano)',
  options: [],
  examples: [
    { comment: 'edit config', command: 'task edit ssh' },
  ],
})

export const editSshConsole: CommandModule = {
  command: 'ssh',
  describe: 'Open ~/.ssh/config in $EDITOR',
  builder: y => y,
  handler: async () => {
    const { editSshNode } = await import('./node')
    await editSshNode()
  },
}
