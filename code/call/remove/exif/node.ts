/**
 * `task remove exif` — surgical per-tag EXIF removal via exiftool.
 * Use `task remove metadata` to strip everything. This variant
 * keeps the rest intact and only clears the tags you name.
 */

import fs from 'node:fs/promises'
import type { RemoveExifNodeLocalInput } from '~/code/form/action/remove/exif/node'
import {
  RemoveExifNodeInputParser,
  RemoveExifNodeLocalInputParser,
  RemoveExifNodeOutputParser,
} from '~/code/form/action/remove/exif/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemoveExif, collectExifTags } from './command'

async function runLocal(input: RemoveExifNodeLocalInput) {
  const inputPath = input.input.file.path
  const extra = input as {
    tag?: string[]
    preset?: string[]
    overwrite?: boolean
  }
  const tags = collectExifTags(extra)
  if (tags.length === 0) {
    throw new Error(
      'remove exif: at least one --tag or --preset required. Use `task remove metadata` to strip all tags.',
    )
  }

  const overwrite = extra.overwrite === true
  const out = overwrite
    ? inputPath
    : (input.output?.file?.path ??
      siblingWithSuffix({ path: inputPath, suffix: '.noexif' }))

  if (!overwrite) {
    await ensureParentDir(out)
    await fs.copyFile(inputPath, out)
  }

  const command = buildCommandToRemoveExif({ tags, outputPath: out })
  await spawnAndWait({
    verb: 'remove exif',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: out } }
}

const [removeExifNode, testRemoveExifNode] = createNodeHandler({
  parsers: {
    input: RemoveExifNodeInputParser,
    local: RemoveExifNodeLocalInputParser,
    output: RemoveExifNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { removeExifNode, testRemoveExifNode }
