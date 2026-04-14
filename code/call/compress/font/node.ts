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
  let finalOut = defaultOut

  if (requestedOut && path.resolve(requestedOut) !== path.resolve(defaultOut)) {
    await fs.mkdir(path.dirname(requestedOut), { recursive: true })
    await fs.rename(defaultOut, requestedOut)
    finalOut = requestedOut
  }

  const { size: sizeAfter } = await fs.stat(finalOut)
  return { file: { path: finalOut }, sizeBefore, sizeAfter }
}
