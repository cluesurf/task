import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task set eol',
  describe: 'Normalize line endings in a text file',
  options: [
    { long: 'output', short: 'o', describe: 'Write to this path instead of editing in place' },
  ],
  examples: [
    { comment: 'normalize to unix', command: 'task set eol lf build.sh' },
    { comment: 'convert to windows CRLF', command: 'task set eol crlf script.bat' },
  ],
})

export const setEolConsole: CommandModule = {
  command: 'eol <target> <file>',
  describe: 'Normalize line endings in a text file',
  builder: y =>
    y
      .positional('target', { type: 'string', choices: ['lf', 'crlf', 'cr'] })
      .positional('file', { type: 'string' })
      .option('output', { alias: 'o', type: 'string' }),
  handler: async argv => {
    const { setEolNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      target: argv.target as 'lf' | 'crlf' | 'cr',
      file: argv.file as string,
      output: argv.output as string | undefined,
    }
    await runAction({
      action: 'set',
      input: input as unknown as Record<string, unknown>,
      run: () => setEolNode(input),
    })
  },
}
