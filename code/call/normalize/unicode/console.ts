import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task normalize unicode',
  describe: 'Normalize a text file to one of the Unicode normalization forms',
  options: [
    { long: 'form', describe: 'NFC (default), NFD, NFKC, NFKD' },
    { long: 'output', short: 'o', describe: 'Write to this path (default: in place)' },
  ],
  examples: [
    { comment: 'in-place NFC', command: 'task normalize unicode text.txt' },
    { comment: 'NFD copy', command: 'task normalize unicode text.txt --form NFD -o out.txt' },
  ],
})

export const normalizeUnicodeConsole: CommandModule = {
  command: 'unicode <file>',
  describe: 'Normalize a text file to a Unicode normalization form',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('form', {
        type: 'string',
        choices: ['NFC', 'NFD', 'NFKC', 'NFKD'],
        default: 'NFC',
      })
      .option('output', { alias: 'o', type: 'string' }),
  handler: async argv => {
    const { normalizeUnicodeNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      file: argv.file as string,
      form: argv.form as 'NFC' | 'NFD' | 'NFKC' | 'NFKD',
      output: argv.output as string | undefined,
    }
    await runAction({
      action: 'normalize',
      input: input as unknown as Record<string, unknown>,
      run: () => normalizeUnicodeNode(input),
    })
  },
}
