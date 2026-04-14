import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task inspect process',
  describe: 'Show details about a process: stats, open files, ports, children',
  options: [
    { long: 'show', short: 's', describe: 'Comma list: file | port | children (default: stats only)' },
  ],
  examples: [
    { comment: 'basic stats', command: 'task inspect process 1234' },
    { comment: 'open files', command: 'task inspect process 1234 --show file' },
    { comment: 'ports + children', command: 'task inspect process 1234 --show port,children' },
  ],
})

export const inspectProcessConsole: CommandModule = {
  command: 'process <pid>',
  describe: 'Show details about a process: stats, open files, ports, children',
  builder: y =>
    y
      .positional('pid', { type: 'number', describe: 'Process ID' })
      .option('show', { alias: 's', type: 'string' }),
  handler: async argv => {
    const pid = argv.pid as number
    const show = (argv.show as string | undefined)?.split(',').map(s => s.trim()) ?? []
    const { inspectProcessNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    await runAction({
      action: 'inspect',
      input: { pid, show } as unknown as Record<string, unknown>,
      run: () => inspectProcessNode({ pid, show }),
    })
  },
}
