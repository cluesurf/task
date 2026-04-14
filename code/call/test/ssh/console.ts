import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task test ssh',
  describe: 'Check that an SSH Host entry is reachable (ssh -T BatchMode=yes)',
  options: [],
  examples: [
    { comment: 'reach a host', command: 'task test ssh prod' },
  ],
})

export const testSshConsole: CommandModule = {
  command: 'ssh <name>',
  describe: 'Check that an SSH Host entry is reachable',
  builder: y => y.positional('name', { type: 'string' }),
  handler: async argv => {
    const { testSshNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { name: argv.name as string }
    await runAction({
      action: 'test',
      input: input as unknown as Record<string, unknown>,
      run: () => testSshNode(input),
    })
  },
}
