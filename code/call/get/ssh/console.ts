import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task get ssh',
  describe: 'Read one SSH Host entry',
  options: [],
  examples: [
    { comment: 'pretty table', command: 'task get ssh prod' },
    { comment: 'json for piping', command: 'task get ssh prod -f json | jq' },
  ],
})

export const getSshConsole: CommandModule = {
  command: 'ssh <name>',
  describe: 'Read one SSH Host entry',
  builder: y => y.positional('name', { type: 'string' }),
  handler: async argv => {
    const { getSshNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { name: argv.name as string }
    await runAction({
      action: 'get',
      input: input as unknown as Record<string, unknown>,
      run: () => getSshNode(input),
    })
  },
}
