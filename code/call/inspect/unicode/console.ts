import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task inspect unicode',
  describe: 'Show codepoints and categories of every character in a file',
  options: [
    { long: 'limit', describe: 'Cap the number of rows (default 200)' },
  ],
  examples: [
    { comment: 'codepoint dump', command: 'task inspect unicode text.txt' },
  ],
})

export const inspectUnicodeConsole: CommandModule = {
  command: 'unicode <file>',
  describe: 'Show codepoints and categories of every character in a file',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('limit', { type: 'number', default: 200 }),
  handler: async argv => {
    const { inspectUnicodeNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      file: argv.file as string,
      limit: argv.limit as number,
    }
    await runAction({
      action: 'inspect',
      input: input as unknown as Record<string, unknown>,
      run: () => inspectUnicodeNode(input),
    })
  },
}
