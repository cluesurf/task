import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/update/video/console/options'

export const updateVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Mux a subtitle track into a video',
  options,
  path: ['update', 'video'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'add subtitles (in-place, new container)', command: 'task update video clip.mp4 --subtitles subs.srt -o clip.subbed.mp4' },
  ],
})
