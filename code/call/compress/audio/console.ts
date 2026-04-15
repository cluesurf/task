import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compress/audio/console/options'

export const compressAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Re-encode an audio file at a lower bitrate',
  options,
  path: ['compress', 'audio'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'compress to 128 kbps mp3', command: 'task compress audio -i in.wav -o out.mp3 --bitrate 128k' },
  ],
})
