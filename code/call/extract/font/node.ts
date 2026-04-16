/**
 * `task extract font` -- pull the editable feature source out of a
 * font. `--format ttx` does a full fontTools XML dump; `--format
 * fea` restricts that dump to GSUB + GPOS so reviewers can diff
 * just the features without page after page of glyph outlines.
 *
 * Real `.fea` decompilation is not part of stock fontTools. When
 * that's needed, users can take the resulting feature XML and
 * translate it by hand or pipe it through `spot` separately.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToExtractFont } from './command'

export type ExtractFontNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  as?: string
}

export type ExtractFontNodeOutput = {
  file: { path: string }
  format: 'ttx' | 'fea'
}

export async function extractFontNode(
  source: ExtractFontNodeInput,
): Promise<ExtractFontNodeOutput> {
  const inputPath = source.input.file.path
  const format = (source.as ?? 'ttx').toLowerCase() as 'ttx' | 'fea'
  if (format !== 'ttx' && format !== 'fea') {
    throw new Error(
      `unpack font: unknown --as "${source.as}". Use ttx or fea.`,
    )
  }

  const suffix = format === 'fea' ? '.features.ttx' : '.ttx'
  const defaultOut =
    inputPath.replace(/\.(ttf|otf|woff2?|ttx)$/i, '') + suffix
  const outputPath = source.output?.file?.path ?? defaultOut
  await ensureParentDir(outputPath)

  const tables = format === 'fea' ? ['GSUB', 'GPOS'] : undefined
  const command = buildCommandToExtractFont({
    input: inputPath,
    output: outputPath,
    tables,
  })
  await spawnAndWait({
    verb: 'extract font',
    bin: command.bin,
    args: command.args,
  })

  return { file: { path: outputPath }, format }
}

export default extractFontNode
