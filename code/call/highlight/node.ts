/**
 * Top-level `task highlight` — thin adapter that forwards to the
 * existing `task mark pdf` implementation under `code/call/mark/
 * pdf/node.ts`. Shaped inputs are mapped so the user-facing
 * `--text` becomes the underlying `highlight` field the stamping
 * code already expects.
 */

import { markPdfNode } from '~/code/call/mark/pdf/node'

export type HighlightNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  text: string
}

export async function highlightNode(source: HighlightNodeInput) {
  return await markPdfNode({
    input: source.input,
    output: source.output,
    highlight: source.text,
  } as Parameters<typeof markPdfNode>[0])
}
