/**
 * `task remove transparency` — flatten alpha into a solid
 * background via ImageMagick `-background <color> -alpha remove`.
 */

import type { RemoveTransparencyNodeLocalInput } from '~/code/form/action/remove/transparency/node'
import {
  RemoveTransparencyNodeInputParser,
  RemoveTransparencyNodeLocalInputParser,
  RemoveTransparencyNodeOutputParser,
} from '~/code/form/action/remove/transparency/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemoveTransparency } from './command'

async function runLocal(input: RemoveTransparencyNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath =
    input.output?.file?.path ??
    siblingWithSuffix({ path: inputPath, suffix: '.flat' })
  const command = buildCommandToRemoveTransparency({
    inputPath,
    outputPath,
    background: (input as { background?: string }).background,
  })
  await spawnAndWait({
    verb: 'remove transparency',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [removeTransparencyNode, testRemoveTransparencyNode] =
  createNodeHandler({
    parsers: {
      input: RemoveTransparencyNodeInputParser,
      local: RemoveTransparencyNodeLocalInputParser,
      output: RemoveTransparencyNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export default removeTransparencyNode
export { removeTransparencyNode, testRemoveTransparencyNode }
