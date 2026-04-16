import type { CompressVideoNodeLocalInput } from '~/code/form/action/compress/video/node'
import {
  CompressVideoNodeInputParser,
  CompressVideoNodeLocalInputParser,
  CompressVideoNodeOutputParser,
} from '~/code/form/action/compress/video/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildCommandToCompressVideo } from './command'

async function runLocal(input: CompressVideoNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const sequence = buildCommandToCompressVideo({
    inputPath,
    outputPath,
    crf: input.crf,
    preset: input.preset,
  })
  await runCommandSequence(sequence)
  return { file: { path: outputPath } }
}

const [compressVideoNode, testCompressVideoNode] = createNodeHandler({
  parsers: {
    input: CompressVideoNodeInputParser,
    local: CompressVideoNodeLocalInputParser,
    output: CompressVideoNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default compressVideoNode
export { compressVideoNode, testCompressVideoNode }
