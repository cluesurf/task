import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/resize/video/console/options'

export const resizeVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Resize a video with ffmpeg (width and/or height)',
  options,
  path: ['resize', 'video'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'target 1080p width, keep aspect', command: 'task resize video.mp4 -o web.mp4 --width 1920' },
    { comment: 'fixed box', command: 'task resize clip.mov -o thumb.mp4 --width 640 --height 360' },
  ],
})
