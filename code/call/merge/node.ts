/**
 * `task merge` (Node) -- qpdf shell-out. The browser-safe
 * pdf-lib core (`./browser.ts`) is the alternative for the
 * browser bundle.
 *
 *   qpdf --empty --pages a.pdf b.pdf -- out.pdf
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToMerge } from './command'

export type MergeNodeInput = {
  inputs: string[]
  output: { file: { path: string } }
}

export type MergeNodeOutput = {
  file: { path: string }
  inputs: string[]
}

async function mergeNode(
  source: MergeNodeInput,
): Promise<MergeNodeOutput> {
  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)
  const command = buildCommandToMerge({
    inputs: source.inputs,
    outputPath,
  })
  await spawnAndWait({
    verb: 'merge',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath }, inputs: source.inputs }
}

export default mergeNode
export { mergeNode }
