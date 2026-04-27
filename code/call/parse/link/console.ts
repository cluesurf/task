import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task parse link',
  describe:
    'Pull every href / src / opengraph URL out of HTML, or every URL out of plain text',
  options: [
    { long: 'mode', short: 'm', describe: 'html / text / auto (default auto)' },
    { long: 'base', short: 'b', describe: 'Resolve relative URLs against this base' },
    { long: 'output', short: 'o', describe: 'Write JSON result to this path' },
    { long: 'unique', describe: 'Deduplicate by href (default true)' },
    { long: 'text', describe: 'Pass content directly instead of a file path' },
  ],
  examples: [
    { comment: 'pull links from a saved page', command: 'task parse link page.html' },
    {
      comment: 'absolute URLs via --base',
      command: 'task parse link page.html --base https://example.com',
    },
    {
      comment: 'plain markdown',
      command: 'task parse link readme.md --mode text',
    },
  ],
})

export const parseLinkConsole: CommandModule = {
  command: 'link [path]',
  describe: 'Pull every URL out of HTML or text',
  builder: y =>
    y
      .positional('path', { type: 'string' })
      .option('mode', {
        alias: 'm',
        type: 'string',
        choices: ['html', 'text', 'auto'] as const,
        default: 'auto',
      })
      .option('base', { alias: 'b', type: 'string' })
      .option('output', { alias: 'o', type: 'string' })
      .option('unique', { type: 'boolean', default: true })
      .option('text', { type: 'string' }),
  handler: async argv => {
    const { parseLinkNode } = await import('./node')
    const path = argv.path as string | undefined
    const text = argv.text as string | undefined
    if (!path && text === undefined) {
      throw new Error('parse link: provide a path or --text')
    }
    const result = await parseLinkNode({
      input: text !== undefined ? { text } : { file: { path: path! } },
      output: argv.output
        ? { file: { path: argv.output as string } }
        : undefined,
      mode: argv.mode as 'html' | 'text' | 'auto',
      base: argv.base as string | undefined,
      unique: argv.unique as boolean,
    })
    if (!argv.output) {
      process.stdout.write(JSON.stringify(result, null, 2) + '\n')
    }
  },
}
