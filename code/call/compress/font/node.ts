/**
 * `task compress font` — run woff2_compress on a TTF/OTF.
 *
 * `woff2_compress` writes `<input>.woff2` next to the input with
 * no way to configure the output path. If the caller wants a
 * custom output path, we let the tool create the sibling file
 * and then rename it.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildCompressFontCommand } from './command'
import { ensureParentDir } from '~/code/tool/node/file'

export type CompressFontNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
}

export type CompressFontNodeOutput = {
  file: { path: string }
  sizeBefore: number
  sizeAfter: number
}

export async function compressFontNode(
  source: CompressFontNodeInput,
): Promise<CompressFontNodeOutput> {
  const inputPath = source.input.file.path
  const { size: sizeBefore } = await fs.stat(inputPath)

  await runCommandSequence(buildCompressFontCommand({ input: inputPath }))

  const defaultOut = inputPath.replace(/\.(ttf|otf)$/i, '') + '.woff2'
  const requestedOut = source.output?.file?.path
  // When the positional `<file>` shorthand fills BOTH input and
  // output, requestedOut equals inputPath — treat that as "no
  // explicit output" and let the sibling `.woff2` win.
  const effectiveOut =
    requestedOut && path.resolve(requestedOut) !== path.resolve(inputPath)
      ? requestedOut
      : undefined
  let finalOut = defaultOut

  if (effectiveOut && path.resolve(effectiveOut) !== path.resolve(defaultOut)) {
    await ensureParentDir(effectiveOut)
    await fs.rename(defaultOut, effectiveOut)
    finalOut = effectiveOut
  }

  const { size: sizeAfter } = await fs.stat(finalOut)
  return { file: { path: finalOut }, sizeBefore, sizeAfter }
}
