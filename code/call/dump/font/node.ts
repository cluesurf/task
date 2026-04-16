/**
 * `task dump font` — shell out to `ttx` (fontTools). Direction is
 * inferred from the input extension:
 *
 *   .ttf / .otf → .ttx   (dump)
 *   .ttx        → .ttf   (compile)
 *
 * When no output path is passed, we pick the canonical sibling:
 * `foo.ttf` → `foo.ttx`, `foo.ttx` → `foo.ttf`.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildDumpFontCommand } from './command'
import { ensureParentDir } from '~/code/tool/node/file'

export type DumpFontNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  tables?: string
}

export type DumpFontNodeOutput = {
  file: { path: string }
  direction: 'dump' | 'compile'
}

export async function dumpFontNode(
  source: DumpFontNodeInput,
): Promise<DumpFontNodeOutput> {
  const inputPath = source.input.file.path
  const inputExt = path.extname(inputPath).toLowerCase()

  let direction: 'dump' | 'compile'
  let defaultOut: string
  if (inputExt === '.ttf' || inputExt === '.otf') {
    direction = 'dump'
    defaultOut = inputPath.replace(/\.(ttf|otf)$/i, '') + '.ttx'
  } else if (inputExt === '.ttx') {
    direction = 'compile'
    defaultOut = inputPath.replace(/\.ttx$/i, '') + '.ttf'
  } else {
    throw new Error(
      `dump font: unsupported input extension "${inputExt}". ` +
        `Expected .ttf, .otf, or .ttx.`,
    )
  }

  const outputPath = source.output?.file?.path ?? defaultOut
  await ensureParentDir(outputPath)

  await runCommandSequence(
    buildDumpFontCommand({
      input: inputPath,
      output: outputPath,
      tables: source.tables
        ? source.tables.split(',').map(s => s.trim()).filter(Boolean)
        : undefined,
    }),
  )

  return { file: { path: outputPath }, direction }
}
