/**
 * `task update font` -- compile `.fea` + inject into a font. The
 * heavy lifting is fontTools' `feaLib.builder`, invoked through
 * an inline python snippet so we don't need a separate script
 * file.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import type { UpdateFontNodeLocalInput } from '~/code/form/action/update/font/node'
import {
  UpdateFontNodeInputParser,
  UpdateFontNodeLocalInputParser,
  UpdateFontNodeOutputParser,
} from '~/code/form/action/update/font/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildUpdateFontCommand } from './command'

async function runLocal(input: UpdateFontNodeLocalInput) {
  const inputPath = input.input.file.path
  const feaPath = input.fea
  const feaAbs = path.resolve(feaPath)

  try {
    await fs.access(feaAbs)
  } catch {
    throw new Error(
      `update font: --fea file not found at "${feaPath}"`,
    )
  }

  const ext = path.extname(inputPath)
  const defaultOut =
    inputPath.replace(new RegExp(`\\${ext}$`, 'i'), '') +
    `.updated${ext}`
  const outputPath = input.output?.file?.path ?? defaultOut
  await ensureParentDir(outputPath)

  const command = buildUpdateFontCommand({
    inputPath,
    outputPath,
    feaPath: feaAbs,
  })
  await spawnAndWait({
    verb: 'update font',
    bin: command.bin,
    args: command.args,
  })

  return { file: { path: outputPath } }
}

const [updateFontNode, testUpdateFontNode] = createNodeHandler({
  parsers: {
    input: UpdateFontNodeInputParser,
    local: UpdateFontNodeLocalInputParser,
    output: UpdateFontNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default updateFontNode
export { updateFontNode, testUpdateFontNode }
