import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task remove profile',
  describe: 'Strip embedded ICC / IPTC / XMP profiles from an image',
  options: [
    { long: 'output', short: 'o', describe: 'Output path (default: <stem>.noicc.<ext>)' },
  ],
  examples: [
    { comment: 'drop embedded profile', command: 'task remove profile photo.jpg' },
  ],
})

export const removeProfileConsole: CommandModule = {
  command: 'profile <file>',
  describe: 'Strip embedded color / metadata profiles from an image',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output', { alias: 'o', type: 'string' }),
  handler: async argv => {
    const { removeProfileNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
    }
    await runAction({
      action: 'remove',
      input: input as unknown as Record<string, unknown>,
      run: () => removeProfileNode(input),
    })
  },
}
