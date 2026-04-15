/**
 * `task split document` — PDF page extraction. Thin alias over
 * the original flat `split` schema / node so `task split file.pdf
 * --pages 1-3` keeps working via the implicit extension router.
 */

import { buildActionCommand } from '~/code/tool/shared/console'

export const splitDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Extract a subset of a PDF\'s pages into a new file',
  // TODO: form split missing from MESH — re-link schema
  options: [],
  path: ['split', 'document'],
  loadHandler: () => import('../node'),
  examples: [
    { comment: 'extract pages 1–3', command: 'task split file.pdf --pages 1-3' },
    { comment: 'cherry-pick', command: 'task split file.pdf --pages 1,3,5-7 -o cover.pdf' },
  ],
})
