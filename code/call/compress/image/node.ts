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
import { spawnAndWait } from '~/code/tool/node/spawn'
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
  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'compress', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }
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

export default compressImageNode
export { compressImageNode, testCompressImageNode }
