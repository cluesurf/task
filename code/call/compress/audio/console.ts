import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compressAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Re-encode an audio file at a lower bitrate',
  path: ['compress', 'audio'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compress_audio',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'compress to 128 kbps mp3', command: 'task compress audio -i in.wav -o out.mp3 --bitrate 128k' },
  ],
})
