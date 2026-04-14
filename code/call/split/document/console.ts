/**
 * `task split document` — PDF page extraction. Thin alias over
 * the original flat `split` schema / node so `task split file.pdf
 * --pages 1-3` keeps working via the implicit extension router.
 */

import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const splitDocumentConsole = buildActionCommand({
  command: 'document',
  describe: 'Extract a subset of a PDF\'s pages into a new file',
  path: ['split', 'document'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'split',
  loadHandler: () => import('../node'),
  examples: [
    { comment: 'extract pages 1–3', command: 'task split file.pdf --pages 1-3' },
    { comment: 'cherry-pick', command: 'task split file.pdf --pages 1,3,5-7 -o cover.pdf' },
  ],
})
