/**
 * `task compress font` -- run woff2_compress on a TTF/OTF.
 *
 * `woff2_compress` writes `<input>.woff2` next to the input with
 * no way to configure the output path. If the caller wants a
 * custom output path, we let the tool create the sibling file
 * and then rename it.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import type { CompressFontNodeLocalInput } from '~/code/form/action/compress/font/node'
import {
  CompressFontNodeInputParser,
  CompressFontNodeLocalInputParser,
  CompressFontNodeOutputParser,
} from '~/code/form/action/compress/font/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCompressFontCommand } from './command'

async function runLocal(input: CompressFontNodeLocalInput) {
  const inputPath = input.input.file.path
  const { size: sizeBefore } = await fs.stat(inputPath)

  const { bin, args } = buildCompressFontCommand({ input: inputPath })
  await spawnAndWait({ verb: 'compress', bin, args })

  const defaultOut =
    inputPath.replace(/\.(ttf|otf)$/i, '') + '.woff2'
  const requestedOut = input.output?.file?.path
  // When the positional `<file>` shorthand fills BOTH input and
  // output, requestedOut equals inputPath. Treat that as "no
  // explicit output" and let the sibling `.woff2` win.
  const effectiveOut =
    requestedOut &&
    path.resolve(requestedOut) !== path.resolve(inputPath)
      ? requestedOut
      : undefined
  let finalOut = defaultOut

  if (
    effectiveOut &&
    path.resolve(effectiveOut) !== path.resolve(defaultOut)
  ) {
    await ensureParentDir(effectiveOut)
    await fs.rename(defaultOut, effectiveOut)
    finalOut = effectiveOut
  }

  const { size: sizeAfter } = await fs.stat(finalOut)
  return { file: { path: finalOut }, sizeBefore, sizeAfter }
}

const [compressFontNode, testCompressFontNode] = createNodeHandler({
  parsers: {
    input: CompressFontNodeInputParser,
    local: CompressFontNodeLocalInputParser,
    output: CompressFontNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default compressFontNode
export { compressFontNode, testCompressFontNode }
