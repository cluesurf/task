import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task open ssh',
  describe: 'Connect to a named SSH Host interactively',
  options: [],
  examples: [
    { comment: 'open a shell on prod', command: 'task open ssh prod' },
  ],
})

export const openSshConsole: CommandModule = {
  command: 'ssh <name>',
  describe: 'Connect to a named SSH Host interactively',
  builder: y => y.positional('name', { type: 'string' }),
  handler: async argv => {
    const { openSshNode } = await import('./node')
    await openSshNode({ name: argv.name as string })
  },
}
