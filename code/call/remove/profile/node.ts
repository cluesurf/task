/**
 * `task remove profile` — strip ICC color profile(s) from an image
 * via ImageMagick `convert +profile "*"`.
 */

import type { RemoveProfileNodeLocalInput } from '~/code/form/action/remove/profile/node'
import {
  RemoveProfileNodeInputParser,
  RemoveProfileNodeLocalInputParser,
  RemoveProfileNodeOutputParser,
} from '~/code/form/action/remove/profile/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemoveProfile } from './command'

async function runLocal(input: RemoveProfileNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath =
    input.output?.file?.path ??
    siblingWithSuffix({ path: inputPath, suffix: '.noicc' })
  const command = buildCommandToRemoveProfile(inputPath, outputPath)
  await spawnAndWait({
    verb: 'remove profile',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [removeProfileNode, testRemoveProfileNode] = createNodeHandler({
  parsers: {
    input: RemoveProfileNodeInputParser,
    local: RemoveProfileNodeLocalInputParser,
    output: RemoveProfileNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { removeProfileNode, testRemoveProfileNode }
