// Raster -> vector for general-purpose inputs (png/jpg/tiff/bmp).
// Slower and less precise than potrace for pure line art, but
// handles color rasters that potrace can't.

import type {
  ConvertImageWithAutotraceNodeInput,
  ConvertImageWithAutotraceNodeLocalInput,
} from '~/code/form/action/convert/image/autotrace/node'
import {
  ConvertImageWithAutotraceNodeInputParser,
  ConvertImageWithAutotraceNodeLocalInputParser,
  ConvertImageWithAutotraceNodeOutputParser,
} from '~/code/form/action/convert/image/autotrace/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithAutotrace } from './command'

async function runLocal(
  input: ConvertImageWithAutotraceNodeLocalInput,
) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithAutotrace({
    inputPath,
    outputPath,
    outputFormat: input.outputFormat,
    colors: input.colors,
    despeckleLevel: input.despeckleLevel,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [
  convertImageWithAutotraceNode,
  testConvertImageWithAutotraceNode,
] = createNodeHandler({
  parsers: {
    input: ConvertImageWithAutotraceNodeInputParser,
    local: ConvertImageWithAutotraceNodeLocalInputParser,
    output: ConvertImageWithAutotraceNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default convertImageWithAutotraceNode
export {
  convertImageWithAutotraceNode,
  testConvertImageWithAutotraceNode,
}
export type { ConvertImageWithAutotraceNodeInput }
