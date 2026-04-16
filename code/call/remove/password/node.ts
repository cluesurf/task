/**
 * `task remove password` — strip an owner / user password from a
 * PDF via `qpdf --decrypt`. Needs the current password if the PDF
 * has a user password; owner-only protection decrypts without one.
 *
 * Four-branch node handler: parse → dispatch(remote|external|
 * internal) → local worker → spawnAndWait → parse output.
 */

import type {
  RemovePasswordNodeLocalInput,
  RemovePasswordNodeInput,
} from '~/code/form/action/remove/password/node'
import {
  RemovePasswordNodeInputParser,
  RemovePasswordNodeLocalInputParser,
  RemovePasswordNodeOutputParser,
} from '~/code/form/action/remove/password/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemovePassword } from './command'

async function runLocal(input: RemovePasswordNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath =
    input.output?.file?.path ??
    siblingWithSuffix({ path: inputPath, suffix: '.unlocked' })
  const command = buildCommandToRemovePassword({
    inputPath,
    outputPath,
    password: input.password,
  })
  await spawnAndWait({
    verb: 'remove password',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [removePasswordNode, testRemovePasswordNode] = createNodeHandler({
  parsers: {
    input: RemovePasswordNodeInputParser,
    local: RemovePasswordNodeLocalInputParser,
    output: RemovePasswordNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { removePasswordNode, testRemovePasswordNode }
export type { RemovePasswordNodeInput }
