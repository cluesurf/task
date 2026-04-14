import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const combineConsole = buildActionCommand({
  command: 'combine',
  describe: 'Combine a still image and audio track into a video',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'combine',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'fuse cover art and an mp3 into an mp4',
      command:
        'task combine -i cover.png -a song.mp3 -o song.mp4',
    },
    {
      comment: 'control encoder + bitrate',
      command:
        'task combine -i cover.jpg -a podcast.wav -o ep.mp4 --audio-bitrate 192k --sample-rate 44100',
    },
  ],
})
