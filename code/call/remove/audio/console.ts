import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/remove/audio/console/options'

export const removeAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Strip the audio track from a video',
  options,
  path: ['remove', 'audio'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'mute a clip', command: 'task remove audio -i clip.mp4 -o clip.silent.mp4' },
  ],
})
