// Animated GIF optimizer + converter. gif -> gif (resize, quantize,
// optimize) is the core use case. For gif -> other formats prefer
// convert/image/ffmpeg or convert/image/img2webp.

import type {
  ConvertImageWithGifsicleNodeInput,
  ConvertImageWithGifsicleNodeLocalInput,
} from '~/code/form/action/convert/image/gifsicle/node'
import {
  ConvertImageWithGifsicleNodeInputParser,
  ConvertImageWithGifsicleNodeLocalInputParser,
  ConvertImageWithGifsicleNodeOutputParser,
} from '~/code/form/action/convert/image/gifsicle/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithGifsicle } from './command'

async function runLocal(
  input: ConvertImageWithGifsicleNodeLocalInput,
) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithGifsicle({
    inputPath,
    outputPath,
    optimize: input.optimize,
    lossy: input.lossy,
    resize: input.resize,
    colors: input.colors,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [
  convertImageWithGifsicleNode,
  testConvertImageWithGifsicleNode,
] = createNodeHandler({
  parsers: {
    input: ConvertImageWithGifsicleNodeInputParser,
    local: ConvertImageWithGifsicleNodeLocalInputParser,
    output: ConvertImageWithGifsicleNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default convertImageWithGifsicleNode
export { convertImageWithGifsicleNode, testConvertImageWithGifsicleNode }
export type { ConvertImageWithGifsicleNodeInput }
