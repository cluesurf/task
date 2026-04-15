import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/trim/audio/console/options'

export const trimAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Cut a range out of an audio file',
  options,
  path: ['trim', 'audio'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: '10s–30s slice', command: 'task trim audio -i in.mp3 -o out.mp3 --start 10 --end 30' },
    { comment: 'clock-style range', command: 'task trim audio -i long.wav -o clip.wav --start 00:01:30 --end 00:02:00' },
  ],
})
