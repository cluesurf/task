/**
 * `task extract font` — pull the editable feature source out of a
 * font. `--format ttx` does a full fontTools XML dump; `--format
 * fea` restricts that dump to GSUB + GPOS so reviewers can diff
 * just the features without page after page of glyph outlines.
 *
 * Real `.fea` decompilation is not part of stock fontTools. When
 * that's needed, users can take the resulting feature XML and
 * translate it by hand or pipe it through `spot` separately.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildExtractFontCommand } from './command'

export type ExtractFontNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  format?: string
}

export type ExtractFontNodeOutput = {
  file: { path: string }
  format: 'ttx' | 'fea'
}

export async function extractFontNode(
  source: ExtractFontNodeInput,
): Promise<ExtractFontNodeOutput> {
  const inputPath = source.input.file.path
  const format = (source.format ?? 'ttx').toLowerCase() as 'ttx' | 'fea'
  if (format !== 'ttx' && format !== 'fea') {
    throw new Error(
      `extract font: unknown --format "${source.format}". Use ttx or fea.`,
    )
  }

  const suffix = format === 'fea' ? '.features.ttx' : '.ttx'
  const defaultOut =
    inputPath.replace(/\.(ttf|otf|woff2?|ttx)$/i, '') + suffix
  const outputPath = source.output?.file?.path ?? defaultOut
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const tables = format === 'fea' ? ['GSUB', 'GPOS'] : undefined
  await runCommandSequence(
    buildExtractFontCommand({
      input: inputPath,
      output: outputPath,
      tables,
    }),
  )

  return { file: { path: outputPath }, format }
}
