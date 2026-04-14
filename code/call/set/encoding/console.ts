import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task set encoding',
  describe: 'Re-encode a text file to a target character encoding',
  options: [
    { long: 'output', short: 'o', describe: 'Write to this path instead of editing in place' },
  ],
  examples: [
    { comment: 'convert to utf-8 in place', command: 'task set encoding utf8 notes.txt' },
    { comment: 'windows-1252 → utf8, new file', command: 'task set encoding utf8 legacy.txt -o clean.txt' },
  ],
})

export const setEncodingConsole: CommandModule = {
  command: 'encoding <target> <file>',
  describe: 'Re-encode a text file to a target character encoding',
  builder: y =>
    y
      .positional('target', { type: 'string', describe: 'utf8, latin1, utf16, ...' })
      .positional('file', { type: 'string' })
      .option('output', { alias: 'o', type: 'string' }),
  handler: async argv => {
    const { setEncodingNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      target: argv.target as string,
      file: argv.file as string,
      output: argv.output as string | undefined,
    }
    await runAction({
      action: 'set',
      input: input as unknown as Record<string, unknown>,
      run: () => setEncodingNode(input),
    })
  },
}
