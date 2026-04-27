import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task parse table',
  describe: 'Pull tables out of HTML / DOCX / PDF as JSON records',
  options: [
    { long: 'type', short: 't', describe: 'File type override: html / docx / pdf (default: by extension)' },
    { long: 'index', short: 'i', describe: 'Emit only the Nth table (0-based)' },
    { long: 'output', short: 'o', describe: 'Write JSON result to this path' },
  ],
  examples: [
    { comment: 'every table in a saved page', command: 'task parse table page.html' },
    { comment: 'only the first', command: 'task parse table page.html -i 0' },
    { comment: 'tables out of a docx', command: 'task parse table report.docx -o tables.json' },
    { comment: 'pdf text-layout heuristic', command: 'task parse table invoice.pdf -o invoice.json' },
  ],
})

export const parseTableConsole: CommandModule = {
  command: 'table <path>',
  describe: 'Pull tables out of HTML / DOCX / PDF',
  builder: y =>
    y
      .positional('path', { type: 'string', demandOption: true })
      .option('type', {
        alias: 't',
        type: 'string',
        choices: ['html', 'docx', 'pdf'] as const,
        describe: 'File type override (default: by extension)',
      })
      .option('index', { alias: 'i', type: 'number' })
      .option('output', { alias: 'o', type: 'string' }),
  handler: async argv => {
    const { parseTableNode } = await import('./node')
    const result = await parseTableNode({
      input: { file: { path: argv.path as string } },
      output: argv.output
        ? { file: { path: argv.output as string } }
        : undefined,
      format: argv.type as 'html' | 'docx' | 'pdf' | undefined,
      index: argv.index as number | undefined,
    })
    if (!argv.output) {
      process.stdout.write(JSON.stringify(result, null, 2) + '\n')
    }
  },
}
