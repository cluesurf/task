/**
 * `task split` (Node) -- qpdf shell-out. The browser-safe
 * pdf-lib core (`./browser.ts`) is the alternative for the
 * browser bundle.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToSplit } from './command'

export type SplitNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  pages: string
}

export type SplitNodeOutput = {
  file: { path: string }
  pages: string
}

export async function splitNode(
  source: SplitNodeInput,
): Promise<SplitNodeOutput> {
  const inputPath = source.input.file.path
  const outputPath =
    source.output?.file?.path ??
    inputPath.replace(/\.pdf$/i, '') + `.pages-${source.pages}.pdf`

  await ensureParentDir(outputPath)
  const command = buildCommandToSplit({
    inputPath,
    outputPath,
    pages: source.pages,
  })
  await spawnAndWait({
    verb: 'split',
    bin: command.bin,
    args: command.args,
  })

  return { file: { path: outputPath }, pages: source.pages }
}

export default splitNode
