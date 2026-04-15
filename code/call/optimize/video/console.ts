import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/optimize/video/console/options'

export const optimizeVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Re-encode a video for web delivery (h264 + faststart by default)',
  options,
  path: ['optimize', 'video'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'compress a mov for the web',
      command:
        'task optimize video -i clip.mov -o clip.mp4',
    },
    {
      comment: 'higher quality (CRF 18) at 4K',
      command:
        'task optimize video -i clip.mov -o clip.mp4 --crf 18 --width 3840 --preset slower',
    },
    {
      comment: 'silent + tiny',
      command:
        'task optimize video -i clip.mov -o clip.mp4 --silent --width 720 --crf 28',
    },
  ],
})
