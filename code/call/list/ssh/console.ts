import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task list ssh',
  describe: 'List every Host entry in ~/.ssh/config',
  options: [],
  examples: [
    { comment: 'pretty table', command: 'task list ssh' },
    { comment: 'json', command: 'task list ssh -f json' },
  ],
})

export const listSshConsole: CommandModule = {
  command: 'ssh',
  describe: 'List every Host entry in ~/.ssh/config',
  builder: y => y,
  handler: async () => {
    const { listSshNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    await runAction({
      action: 'list',
      input: {},
      run: () => listSshNode(),
    })
  },
}
