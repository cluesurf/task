/**
 * `task update image` -- quick color / tonal tweaks via
 * ImageMagick: grayscale, brightness / contrast / saturation.
 */

import type { UpdateImageNodeLocalInput } from '~/code/form/action/update/image/node'
import {
  UpdateImageNodeInputParser,
  UpdateImageNodeLocalInputParser,
  UpdateImageNodeOutputParser,
} from '~/code/form/action/update/image/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildUpdateImageCommand } from './command'

async function runLocal(input: UpdateImageNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output?.file?.path ?? inputPath

  if (
    !input.grayscale &&
    !input.brightness &&
    !input.contrast &&
    !input.saturation
  ) {
    throw new Error(
      'update image: pass at least one of --grayscale / --brightness / --contrast / --saturation',
    )
  }

  await ensureParentDir(outputPath)
  await runCommandSequence(
    buildUpdateImageCommand({
      inputPath,
      outputPath,
      grayscale: input.grayscale,
      brightness: input.brightness,
      contrast: input.contrast,
      saturation: input.saturation,
    }),
  )
  return { file: { path: outputPath } }
}

const [updateImageNode, testUpdateImageNode] = createNodeHandler({
  parsers: {
    input: UpdateImageNodeInputParser,
    local: UpdateImageNodeLocalInputParser,
    output: UpdateImageNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default updateImageNode
export { updateImageNode, testUpdateImageNode }
