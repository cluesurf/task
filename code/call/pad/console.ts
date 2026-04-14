import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const padConsole = buildActionCommand({
  command: 'pad',
  describe: 'Pad an audio file with trailing silence to a target duration',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'pad',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'pad a track to exactly 3 minutes',
      command:
        'task pad -i intro.mp3 -o intro.padded.mp3 --to 3:00.000',
    },
    {
      comment: 'pad a wav using a float-seconds target',
      command:
        'task pad -i tone.wav -o tone.padded.wav --to 12.5',
    },
  ],
})
