import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/normalize/audio/console/options'

export const normalizeAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Loudness-normalize an audio file (EBU R128)',
  options,
  path: ['normalize', 'audio'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'bring a track to standard broadcast loudness', command: 'task normalize audio -i raw.mp3 -o normalized.mp3' },
    { comment: 'podcast target (−18 LUFS)', command: 'task normalize audio -i raw.mp3 -o ep.mp3 --target -18' },
  ],
})
