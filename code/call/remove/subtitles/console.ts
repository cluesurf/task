import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

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

export const removeSubtitlesConsole: CommandModule = {
  command: 'subtitles <file>',
  describe: 'Drop subtitle streams from a video',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output', { alias: 'o', type: 'string' }),
  handler: async argv => {
    const { removeSubtitlesNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
    }
    await runAction({
      action: 'remove',
      input: input as unknown as Record<string, unknown>,
      run: () => removeSubtitlesNode(input),
    })
  },
}
