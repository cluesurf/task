import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task remove transparency',
  describe: 'Flatten alpha channel onto a solid background',
  options: [
    { long: 'output',     short: 'o', describe: 'Output path (default: <stem>.flat.<ext>)' },
    { long: 'background', short: 'b', describe: 'Background color (ImageMagick name or #hex; default: white)' },
  ],
  examples: [
    { comment: 'flatten to white',     command: 'task remove transparency logo.png' },
    { comment: 'flatten to black',     command: 'task remove transparency logo.png -b black' },
    { comment: 'flatten to brand hex', command: 'task remove transparency logo.png -b "#0b1020" -o logo.dark.png' },
  ],
})

export const removeTransparencyConsole: CommandModule = {
  command: 'transparency <file>',
  describe: 'Flatten alpha channel onto a solid background',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output',     { alias: 'o', type: 'string' })
      .option('background', { alias: 'b', type: 'string' }),
  handler: async argv => {
    const { removeTransparencyNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
      background: argv.background as string | undefined,
    }
    await runAction({
      action: 'remove',
      input: input as unknown as Record<string, unknown>,
      run: () => removeTransparencyNode(input),
    })
  },
}
