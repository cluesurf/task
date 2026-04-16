// RAW -> JPEG / TIFF / PNG via rawtherapee-cli. Similar goals to
// darktable-cli. Different engine and different default look.

import type {
  ConvertImageWithRawtherapeeNodeInput,
  ConvertImageWithRawtherapeeNodeLocalInput,
} from '~/code/form/action/convert/image/rawtherapee/node'
import {
  ConvertImageWithRawtherapeeNodeInputParser,
  ConvertImageWithRawtherapeeNodeLocalInputParser,
  ConvertImageWithRawtherapeeNodeOutputParser,
} from '~/code/form/action/convert/image/rawtherapee/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithRawtherapee } from './command'

async function runLocal(
  input: ConvertImageWithRawtherapeeNodeLocalInput,
) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithRawtherapee({
    inputPath,
    outputPath,
    profile: input.profile,
    jpegQuality: input.jpegQuality,
    tiffCompression: input.tiffCompression,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [
  convertImageWithRawtherapeeNode,
  testConvertImageWithRawtherapeeNode,
] = createNodeHandler({
  parsers: {
    input: ConvertImageWithRawtherapeeNodeInputParser,
    local: ConvertImageWithRawtherapeeNodeLocalInputParser,
    output: ConvertImageWithRawtherapeeNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default convertImageWithRawtherapeeNode
export {
  convertImageWithRawtherapeeNode,
  testConvertImageWithRawtherapeeNode,
}
export type { ConvertImageWithRawtherapeeNodeInput }
