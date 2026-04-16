// Assemble an APNG from a series of PNG frames or a single GIF.
// For gif -> apng, caller should extract frames first (ffmpeg or
// imagemagick) and pass the frame directory.

import type {
  ConvertImageWithApngasmNodeInput,
  ConvertImageWithApngasmNodeLocalInput,
} from '~/code/form/action/convert/image/apngasm/node'
import {
  ConvertImageWithApngasmNodeInputParser,
  ConvertImageWithApngasmNodeLocalInputParser,
  ConvertImageWithApngasmNodeOutputParser,
} from '~/code/form/action/convert/image/apngasm/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithApngasm } from './command'

async function runLocal(
  input: ConvertImageWithApngasmNodeLocalInput,
) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithApngasm({
    inputPath,
    outputPath,
    delay: input.delay,
    skipDuplicates: input.skipDuplicates,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [convertImageWithApngasmNode, testConvertImageWithApngasmNode] =
  createNodeHandler({
    parsers: {
      input: ConvertImageWithApngasmNodeInputParser,
      local: ConvertImageWithApngasmNodeLocalInputParser,
      output: ConvertImageWithApngasmNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export default convertImageWithApngasmNode
export { convertImageWithApngasmNode, testConvertImageWithApngasmNode }
export type { ConvertImageWithApngasmNodeInput }
