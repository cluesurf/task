import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const getDurationConsole = buildActionCommand({
  command: 'duration',
  describe: 'Read the duration of an audio or video file via ffprobe',
  path: ['get', 'duration'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'get_duration',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'duration of an mp3 in milliseconds',
      command: 'task get duration -i song.mp3',
    },
    {
      comment: 'as floating-point seconds',
      command: 'task get duration -i song.mp3 --unit s',
    },
    {
      comment: 'as MM:SS.mmm clock format',
      command: 'task get duration -i clip.mp4 --unit clock',
    },
    {
      comment: 'duration of the video stream instead of audio',
      command: 'task get duration -i clip.mp4 --video',
    },
  ],
})
