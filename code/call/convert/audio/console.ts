import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/convert/audio/console/options'

export const convertAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Convert between audio formats (mp3, wav, flac, ogg, opus, ...)',
  options,
  path: ['convert', 'audio'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'wav → mp3', command: 'task convert audio.wav -o audio.mp3' },
    { comment: 'mp3 → flac, higher bitrate', command: 'task convert audio.mp3 -o audio.flac --bitrate 320k' },
  ],
})
