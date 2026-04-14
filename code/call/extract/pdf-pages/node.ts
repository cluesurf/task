/**
 * `task extract pages file.pdf --pages 1-3` — alias for split
 * under the extract verb. Delegates to the same core so both
 * commands stay in sync.
 */

import { splitNode } from '~/code/call/split/node'

export type ExtractPdfPagesInput = Parameters<typeof splitNode>[0]
export const extractPdfPagesNode = splitNode
