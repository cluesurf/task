// Raster -> vector. potrace reads bitmaps (pbm/pgm/bmp) and emits
// SVG / EPS / PostScript. Use convert/image/autotrace if the input
// is a general raster (png/jpg/tiff).

import type {
  ConvertImageWithPotraceNodeInput,
  ConvertImageWithPotraceNodeLocalInput,
} from '~/code/form/action/convert/image/potrace/node'
import {
  ConvertImageWithPotraceNodeInputParser,
  ConvertImageWithPotraceNodeLocalInputParser,
  ConvertImageWithPotraceNodeOutputParser,
} from '~/code/form/action/convert/image/potrace/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithPotrace } from './command'

async function runLocal(
  input: ConvertImageWithPotraceNodeLocalInput,
) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithPotrace({
    inputPath,
    outputPath,
    outputFormat: input.outputFormat,
    threshold: input.threshold,
    turdsize: input.turdsize,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [convertImageWithPotraceNode, testConvertImageWithPotraceNode] =
  createNodeHandler({
    parsers: {
      input: ConvertImageWithPotraceNodeInputParser,
      local: ConvertImageWithPotraceNodeLocalInputParser,
      output: ConvertImageWithPotraceNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export default convertImageWithPotraceNode
export { convertImageWithPotraceNode, testConvertImageWithPotraceNode }
export type { ConvertImageWithPotraceNodeInput }
