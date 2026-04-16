import type { CompressImageNodeLocalInput } from '~/code/form/action/compress/image/node'
import {
  CompressImageNodeInputParser,
  CompressImageNodeLocalInputParser,
  CompressImageNodeOutputParser,
} from '~/code/form/action/compress/image/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildCommandToCompressImage } from './command'

async function runLocal(input: CompressImageNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const sequence = buildCommandToCompressImage({
    inputPath,
    outputPath,
    quality: input.quality,
  })
  await runCommandSequence(sequence)
  return { file: { path: outputPath } }
}

const [compressImageNode, testCompressImageNode] = createNodeHandler({
  parsers: {
    input: CompressImageNodeInputParser,
    local: CompressImageNodeLocalInputParser,
    output: CompressImageNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { compressImageNode, testCompressImageNode }
