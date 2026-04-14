import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const trimVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Cut a range out of a video file',
  path: ['trim', 'video'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'trim_video',
  loadHandler: () => import('./node'),
  examples: [
    { comment: '20s cut, stream-copy (fast)', command: 'task trim video -i in.mp4 -o out.mp4 --start 00:00:10 --end 00:00:30' },
    { comment: 'frame-accurate cut (re-encode)', command: 'task trim video -i in.mp4 -o out.mp4 --start 10 --end 30 --reencode' },
  ],
})
