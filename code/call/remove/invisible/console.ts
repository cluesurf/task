import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task remove invisible',
  describe: 'Strip zero-width / BOM / invisible characters from a text file',
  options: [
    { long: 'output', short: 'o', describe: 'Write to this path (default: in place)' },
  ],
  examples: [
    { comment: 'in-place strip', command: 'task remove invisible text.txt' },
    { comment: 'to a copy', command: 'task remove invisible text.txt -o clean.txt' },
  ],
})

export const removeInvisibleConsole: CommandModule = {
  command: 'invisible <file>',
  describe: 'Strip zero-width / BOM / invisible characters from a text file',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output', { alias: 'o', type: 'string' }),
  handler: async argv => {
    const { removeInvisibleNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      file: argv.file as string,
      output: argv.output as string | undefined,
    }
    await runAction({
      action: 'remove',
      input: input as unknown as Record<string, unknown>,
      run: () => removeInvisibleNode(input),
    })
  },
}
