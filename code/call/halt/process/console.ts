import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task halt process',
  describe: 'Kill a process by PID or fuzzy text match',
  options: [
    { long: 'text', describe: 'Kill all processes whose name or command matches' },
    { long: 'signal', describe: 'Signal name (default SIGTERM). Use SIGKILL for `kill -9` behaviour.' },
  ],
  examples: [
    { comment: 'kill by PID', command: 'task halt process 1234' },
    { comment: 'kill all matching', command: 'task halt process --text node' },
    { comment: 'force-kill', command: 'task halt process 1234 --signal SIGKILL' },
  ],
})

export const haltProcessConsole: CommandModule = {
  command: 'process [pid]',
  describe: 'Kill a process by PID or fuzzy text match',
  builder: y =>
    y
      .positional('pid', { type: 'number' })
      .option('text', { type: 'string' })
      .option('signal', { type: 'string', default: 'SIGTERM' }),
  handler: async argv => {
    const pid = argv.pid as number | undefined
    const text = argv.text as string | undefined
    const signal = argv.signal as NodeJS.Signals
    if (pid === undefined && !text) {
      throw new Error('halt process: pass either a PID or --text <pattern>')
    }
    const { haltProcessNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    await runAction({
      action: 'halt',
      input: { pid, text, signal } as unknown as Record<string, unknown>,
      run: () => haltProcessNode({ pid, text, signal }),
    })
  },
}
