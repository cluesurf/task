// Animated WebP from a series of images (or a single GIF).
// img2webp ships with libwebp. Tight control over per-frame
// quality + delay + codec.

import type {
  ConvertImageWithImg2webpNodeInput,
  ConvertImageWithImg2webpNodeLocalInput,
} from '~/code/form/action/convert/image/img2webp/node'
import {
  ConvertImageWithImg2webpNodeInputParser,
  ConvertImageWithImg2webpNodeLocalInputParser,
  ConvertImageWithImg2webpNodeOutputParser,
} from '~/code/form/action/convert/image/img2webp/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithImg2webp } from './command'

async function runLocal(
  input: ConvertImageWithImg2webpNodeLocalInput,
) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithImg2webp({
    inputPaths: [inputPath],
    outputPath,
    quality: input.quality,
    lossless: input.lossless,
    delay: input.delay,
    loop: input.loop,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [
  convertImageWithImg2webpNode,
  testConvertImageWithImg2webpNode,
] = createNodeHandler({
  parsers: {
    input: ConvertImageWithImg2webpNodeInputParser,
    local: ConvertImageWithImg2webpNodeLocalInputParser,
    output: ConvertImageWithImg2webpNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default convertImageWithImg2webpNode
export {
  convertImageWithImg2webpNode,
  testConvertImageWithImg2webpNode,
}
export type { ConvertImageWithImg2webpNodeInput }
