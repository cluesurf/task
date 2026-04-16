/**
 * `task remove invisible` -- strip zero-width / BOM / invisible
 * Unicode characters from a text file. Pure Node.js (no binary
 * spawn). Four-branch node handler.
 */

import fs from 'node:fs/promises'
import type { RemoveInvisibleNodeLocalInput } from '~/code/form/action/remove/invisible/node'
import {
  RemoveInvisibleNodeInputParser,
  RemoveInvisibleNodeLocalInputParser,
  RemoveInvisibleNodeOutputParser,
} from '~/code/form/action/remove/invisible/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { ensureParentDir } from '~/code/tool/node/file'
import { stripInvisible } from '~/code/tool/node/unicode/base'

async function runLocal(input: RemoveInvisibleNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output?.file?.path ?? inputPath
  const text = await fs.readFile(inputPath, 'utf8')
  const cleaned = stripInvisible(text)
  await ensureParentDir(outputPath)
  await fs.writeFile(outputPath, cleaned, 'utf8')
  return { file: { path: outputPath } }
}

const [removeInvisibleNode, testRemoveInvisibleNode] =
  createNodeHandler({
    parsers: {
      input: RemoveInvisibleNodeInputParser,
      local: RemoveInvisibleNodeLocalInputParser,
      output: RemoveInvisibleNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export default removeInvisibleNode
export { removeInvisibleNode, testRemoveInvisibleNode }
