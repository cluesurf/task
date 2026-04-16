import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvString } from '~/code/tool/shared/verb'

registerHelp({
  command: 'task remove subtitles',
  describe: 'Drop subtitle streams from a video (ffmpeg -sn)',
  options: [
    { long: 'output', short: 'o', describe: 'Output path (default: <stem>.nosub<ext>)' },
  ],
  examples: [
    { comment: 'strip embedded subs', command: 'task remove subtitles clip.mkv -o clip.clean.mkv' },
  ],
})

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
}

async function handler(argv: Record<string, unknown>) {
  const { removeSubtitlesNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  await runAction({
    action: 'remove',
    input: { file: filePath } as Record<string, unknown>,
    run: () =>
      removeSubtitlesNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
      }),
  })
}

export const removeSubtitlesConsole: CommandModule = {
  command: 'subtitles <file>',
  describe: 'Drop subtitle streams from a video',
  builder,
  handler,
}
