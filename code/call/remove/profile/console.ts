import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvString } from '~/code/tool/shared/verb'

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

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
}

async function handler(argv: Record<string, unknown>) {
  const { removeProfileNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  await runAction({
    action: 'remove',
    input: { file: filePath } as Record<string, unknown>,
    run: () =>
      removeProfileNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
      }),
  })
}

export const removeProfileConsole: CommandModule = {
  command: 'profile <file>',
  describe: 'Strip embedded color / metadata profiles from an image',
  builder,
  handler,
}
