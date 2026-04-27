import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task parse entity',
  describe:
    'Pull semi-structured tokens (emails / urls / ips / phone / cc / ssn / mac / bitcoin / uuid) out of text',
  options: [
    { long: 'kinds', short: 'k', describe: 'Comma-separated entity kinds (default: all)' },
    { long: 'output', short: 'o', describe: 'Write JSON result to this path' },
    { long: 'unique', describe: 'Deduplicate by (kind, value) (default true)' },
    { long: 'text', describe: 'Pass text directly instead of a file path' },
  ],
  examples: [
    { comment: 'extract from a file', command: 'task parse entity logs/page.html' },
    { comment: 'just emails + urls', command: 'task parse entity README.md -k email,url' },
    { comment: 'inline text', command: "task parse entity --text 'reach me at me@example.com'" },
  ],
})

export const parseEntityConsole: CommandModule = {
  command: 'entity [path]',
  describe: 'Pull semi-structured tokens out of text',
  builder: y =>
    y
      .positional('path', { type: 'string' })
      .option('kinds', { alias: 'k', type: 'string' })
      .option('output', { alias: 'o', type: 'string' })
      .option('unique', { type: 'boolean', default: true })
      .option('text', { type: 'string' }),
  handler: async argv => {
    const { parseEntityNode } = await import('./node')
    const path = argv.path as string | undefined
    const text = argv.text as string | undefined
    if (!path && text === undefined) {
      throw new Error('parse entity: provide a path or --text')
    }
    const result = await parseEntityNode({
      input: text !== undefined ? { text } : { file: { path: path! } },
      output: argv.output
        ? { file: { path: argv.output as string } }
        : undefined,
      kinds: argv.kinds
        ? (argv.kinds as string).split(',').map(s => s.trim()) as never
        : undefined,
      unique: argv.unique as boolean,
    })
    if (!argv.output) {
      process.stdout.write(JSON.stringify(result, null, 2) + '\n')
    }
  },
}
