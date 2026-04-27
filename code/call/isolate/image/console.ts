import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task isolate image',
  describe: 'Pull every embedded image out of a pdf / docx / html into a directory',
  options: [
    { long: 'output', short: 'o', describe: 'Output directory (created if missing)' },
    { long: 'type', short: 't', describe: 'Override the parser type (pdf / docx / html)' },
    { long: 'prefix', describe: 'Filename prefix (default `image`)' },
  ],
  examples: [
    { comment: 'pdf images', command: 'task isolate image report.pdf -o ./images' },
    { comment: 'docx images', command: 'task isolate image notes.docx -o ./images' },
    { comment: 'html data: URIs', command: 'task isolate image page.html -o ./images' },
  ],
})

export const isolateImageConsole: CommandModule = {
  command: 'image <path>',
  describe: 'Pull every embedded image out of a document',
  builder: y =>
    y
      .positional('path', { type: 'string', demandOption: true })
      .option('output', { alias: 'o', type: 'string', demandOption: true })
      .option('type', {
        alias: 't',
        type: 'string',
        choices: ['pdf', 'docx', 'html'] as const,
        describe: 'File type override (default: by extension)',
      })
      .option('prefix', { type: 'string', default: 'image' }),
  handler: async argv => {
    const { isolateImageNode } = await import('./node')
    const result = await isolateImageNode({
      input: {
        file: { path: argv.path as string },
        format: argv.type as 'pdf' | 'docx' | 'html' | undefined,
      },
      output: { directory: { path: argv.output as string } },
      prefix: argv.prefix as string,
    })
    process.stdout.write(
      `Wrote ${result.files.length} image${result.files.length === 1 ? '' : 's'} to ${argv.output}\n`,
    )
    if (result.files.length > 0) {
      process.stdout.write(JSON.stringify(result, null, 2) + '\n')
    }
  },
}
