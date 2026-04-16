// Slides: markdown -> reveal.js HTML via pandoc.
// Standalone file so callers don't have to remember the pandoc flag
// dance, and so dispatch in convert/document can route `md -> html`
// with `--tool revealjs` cleanly.

import { spawnAndWait } from '~/code/tool/node/spawn'
import { ensureParentDir } from '~/code/tool/node/file'
import { buildCommandToConvertDocumentWithRevealjs } from './command'

export type ConvertDocumentWithRevealjsNodeInput = {
  input: { path: string }
  output: { path: string }
  /** Slide theme (black, white, league, beige, sky, night, serif,
   * simple, solarized, moon, dracula). */
  theme?: string
  /** Embed assets into a single self-contained file. */
  selfContained?: boolean
}

async function convertDocumentWithRevealjsNode(
  source: ConvertDocumentWithRevealjsNodeInput,
): Promise<void> {
  await ensureParentDir(source.output.path)
  const command = buildCommandToConvertDocumentWithRevealjs({
    inputPath: source.input.path,
    outputPath: source.output.path,
    theme: source.theme,
    selfContained: source.selfContained,
  })
  await spawnAndWait({
    verb: 'convert document',
    bin: command.bin,
    args: command.args,
  })
}

export default convertDocumentWithRevealjsNode
export { convertDocumentWithRevealjsNode }
