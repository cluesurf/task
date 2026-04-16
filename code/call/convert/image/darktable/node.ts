// RAW -> JPEG / TIFF / PNG via darktable-cli. Slower than dcraw but
// applies the full darktable pipeline (denoise, lens correction,
// color). Use this when output quality matters.

import type {
  ConvertImageWithDarktableNodeInput,
  ConvertImageWithDarktableNodeLocalInput,
} from '~/code/form/action/convert/image/darktable/node'
import {
  ConvertImageWithDarktableNodeInputParser,
  ConvertImageWithDarktableNodeLocalInputParser,
  ConvertImageWithDarktableNodeOutputParser,
} from '~/code/form/action/convert/image/darktable/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithDarktable } from './command'

async function runLocal(
  input: ConvertImageWithDarktableNodeLocalInput,
) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithDarktable({
    inputPath,
    outputPath,
    xmp: input.xmp,
    highQuality: input.highQuality,
    upscale: input.upscale,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [
  convertImageWithDarktableNode,
  testConvertImageWithDarktableNode,
] = createNodeHandler({
  parsers: {
    input: ConvertImageWithDarktableNodeInputParser,
    local: ConvertImageWithDarktableNodeLocalInputParser,
    output: ConvertImageWithDarktableNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default convertImageWithDarktableNode
export {
  convertImageWithDarktableNode,
  testConvertImageWithDarktableNode,
}
export type { ConvertImageWithDarktableNodeInput }
