import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/remove/subtitles/console/options'

export const removeSubtitlesConsole = buildActionCommand({
  command: 'subtitles',
  describe: 'Drop subtitle streams from a video',
  options,
  loadHandler: () => import('./node'),
  path: ['remove', 'subtitles'],
  examples: [
    {
      comment: 'strip embedded subs',
      command:
        'task remove subtitles clip.mkv -o clip.clean.mkv',
    },
  ],
})
