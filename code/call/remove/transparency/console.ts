import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvString } from '~/code/tool/shared/verb'

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

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('background', { alias: 'b', type: 'string' })
}

async function handler(argv: Record<string, unknown>) {
  const { removeTransparencyNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  const background = argvString(argv.background) ?? 'white'
  await runAction({
    action: 'remove',
    input: { file: filePath, background } as Record<string, unknown>,
    run: () =>
      removeTransparencyNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
        background,
      }),
  })
}

export const removeTransparencyConsole: CommandModule = {
  command: 'transparency <file>',
  describe: 'Flatten alpha channel onto a solid background',
  builder,
  handler,
}
