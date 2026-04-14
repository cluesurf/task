import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const inspectFileConsole = buildActionCommand({
  command: 'file',
  describe: 'Inspect a file and print a key/value table of its metadata',
  path: ['inspect', 'file'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'inspect_file',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'inspect a pdf',
      command: 'task inspect file -i report.pdf',
    },
    {
      comment: 'inspect a video — JSON for piping',
      command: 'task inspect file -i clip.mp4 -f json | jq .groups',
    },
  ],
})
