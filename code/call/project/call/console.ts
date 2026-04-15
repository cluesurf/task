/**
 * `task project call <cmd>` — escape hatch. Runs any shell
 * command in the cwd via the same spawn helper as the inferred
 * verbs, so behavior (stdio, exit code) is consistent whether
 * you're calling a registry command or one of your own.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task project call',
  describe: 'Run an arbitrary shell command in the project root (escape hatch)',
  options: [],
  examples: [
    { comment: 'raw command',                  command: 'task project call "cargo bench --release"' },
    { comment: 'chain with the inferred verb', command: 'task project build && task project call ./scripts/post-build.sh' },
  ],
})

export const projectCallConsole: CommandModule = {
  command: 'call <command..>',
  describe: 'Run an arbitrary shell command in the project root',
  builder: y => y.positional('command', {
    type: 'string',
    array: true,
    describe: 'The command to run (quoted or a sequence of positional words)',
  }),
  handler: async argv => {
    const { callCommand } = await import('~/code/tool/node/runner/run')
    const { runAction } = await import('~/code/tool/node/log')
    const words = (argv.command as string[]) ?? []
    if (words.length === 0) {
      throw new Error('task project call: command required')
    }
    const cmd = words.length === 1 ? words[0]! : words.join(' ')
    await runAction({
      action: 'call',
      input: { command: cmd } as unknown as Record<string, unknown>,
      run: async () => {
        const code = await callCommand(process.cwd(), cmd)
        if (code !== 0 && code !== null) {
          throw new Error(`task project call: exited with code ${code}`)
        }
        return { command: cmd, exitCode: code }
      },
    })
  },
}
