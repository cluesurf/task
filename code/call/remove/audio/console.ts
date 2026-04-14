import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const removeAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Strip the audio track from a video',
  path: ['remove', 'audio'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'remove_audio',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'mute a clip', command: 'task remove audio -i clip.mp4 -o clip.silent.mp4' },
  ],
})
