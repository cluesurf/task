import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const updateVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Mux a subtitle track into a video',
  path: ['update', 'video'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'update_video',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'add subtitles (in-place, new container)', command: 'task update video clip.mp4 --subtitles subs.srt -o clip.subbed.mp4' },
  ],
})
