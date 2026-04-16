import type { FlipImageNodeLocalInput } from '~/code/form/action/flip/image/node'
import {
  FlipImageNodeInputParser,
  FlipImageNodeLocalInputParser,
  FlipImageNodeOutputParser,
} from '~/code/form/action/flip/image/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import { resolveExternalInput, resolveInternalInput } from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToFlipImage } from './command'

async function runLocal(input: FlipImageNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const { bin, args } = buildCommandToFlipImage({
    inputPath,
    outputPath,
    horizontal: input.horizontal,
    vertical: input.vertical,
  })
  await spawnAndWait({ verb: 'flip', bin, args })
  return { file: { path: outputPath } }
}

const [flipImageNode, testFlipImageNode] = createNodeHandler({
  parsers: {
    input: FlipImageNodeInputParser,
    local: FlipImageNodeLocalInputParser,
    output: FlipImageNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default flipImageNode
export { flipImageNode, testFlipImageNode }
