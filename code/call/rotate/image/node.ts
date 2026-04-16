import type { RotateImageNodeLocalInput } from '~/code/form/action/rotate/image/node'
import {
  RotateImageNodeInputParser,
  RotateImageNodeLocalInputParser,
  RotateImageNodeOutputParser,
} from '~/code/form/action/rotate/image/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import { resolveExternalInput, resolveInternalInput } from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToRotateImage } from './command'

async function runLocal(input: RotateImageNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const sequence = buildCommandToRotateImage({
    inputPath,
    outputPath,
    degree: input.degree,
  })
  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'rotate', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }
  return { file: { path: outputPath } }
}

const [rotateImageNode, testRotateImageNode] = createNodeHandler({
  parsers: {
    input: RotateImageNodeInputParser,
    local: RotateImageNodeLocalInputParser,
    output: RotateImageNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default rotateImageNode
export { rotateImageNode, testRotateImageNode }
