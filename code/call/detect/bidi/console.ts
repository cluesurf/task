import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task detect bidi',
  describe: 'Scan a file for Unicode bidi-override characters (Trojan Source)',
  options: [],
  examples: [
    { comment: 'check a source file', command: 'task detect bidi src/auth.ts' },
  ],
})

export const detectBidiConsole: CommandModule = {
  command: 'bidi <file>',
  describe: 'Scan a file for Unicode bidi-override characters',
  builder: y => y.positional('file', { type: 'string' }),
  handler: async argv => {
    const { detectBidiNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { file: argv.file as string }
    await runAction({
      action: 'detect',
      input: input as unknown as Record<string, unknown>,
      run: () => detectBidiNode(input),
    })
  },
}
