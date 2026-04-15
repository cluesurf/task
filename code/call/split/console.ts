import { buildActionCommand } from '~/code/tool/shared/console'

export const splitConsole = buildActionCommand({
  command: 'split',
  describe: 'Extract a subset of a PDF\'s pages into a new file',
  // TODO: form split missing from MESH — re-link schema
  options: [],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'extract pages 1–3 to a new file',
      command: 'task split -i file.pdf --pages 1-3',
    },
    {
      comment: 'cherry-pick pages with a custom output',
      command: 'task split -i file.pdf --pages 1,3,5-7 -o cover.pdf',
    },
  ],
})
