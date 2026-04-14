import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const normalizeAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Loudness-normalize an audio file (EBU R128)',
  path: ['normalize', 'audio'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'normalize_audio',
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'bring a track to standard broadcast loudness', command: 'task normalize audio -i raw.mp3 -o normalized.mp3' },
    { comment: 'podcast target (−18 LUFS)', command: 'task normalize audio -i raw.mp3 -o ep.mp3 --target -18' },
  ],
})
