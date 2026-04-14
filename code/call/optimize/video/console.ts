import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const optimizeVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Re-encode a video for web delivery (h264 + faststart by default)',
  path: ['optimize', 'video'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'optimize_video',
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
