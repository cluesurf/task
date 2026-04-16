/**
 * `task remove metadata` -- strip every metadata tag. Routes by
 * extension to the tool that actually handles that container:
 *
 *   audio / video  ->  ffmpeg -map_metadata -1 -c copy
 *   everything     ->  exiftool -all= -overwrite_original
 *
 * ffmpeg won't read-and-write the same path, so in-place mode
 * goes through a sibling tmp file and renames on success.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import type { RemoveMetadataNodeLocalInput } from '~/code/form/action/remove/metadata/node'
import {
  RemoveMetadataNodeInputParser,
  RemoveMetadataNodeLocalInputParser,
  RemoveMetadataNodeOutputParser,
} from '~/code/form/action/remove/metadata/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  FFMPEG_EXTS,
  buildCommandToRemoveMetadataFfmpeg,
  buildCommandToRemoveMetadataExiftool,
} from './command'

async function runLocal(input: RemoveMetadataNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output?.file?.path ?? inputPath
  const inPlace = path.resolve(inputPath) === path.resolve(outputPath)
  const ext = path.extname(outputPath).toLowerCase()

  if (FFMPEG_EXTS.has(ext)) {
    return runLocalFfmpeg({ inputPath, outputPath, inPlace, ext })
  }

  return runLocalExiftool({ inputPath, outputPath, inPlace })
}

async function runLocalFfmpeg(input: {
  inputPath: string
  outputPath: string
  inPlace: boolean
  ext: string
}) {
  const target = input.inPlace
    ? path.join(
        os.tmpdir(),
        `remove-metadata.${process.pid}.${Date.now()}${input.ext}`,
      )
    : input.outputPath

  if (!input.inPlace) {
    await ensureParentDir(input.outputPath)
  }

  const command = buildCommandToRemoveMetadataFfmpeg({
    inputPath: input.inputPath,
    outputPath: target,
  })
  await spawnAndWait({
    verb: 'remove metadata',
    bin: command.bin,
    args: command.args,
  })

  if (input.inPlace) {
    await fs.rename(target, input.inputPath)
  }

  return { file: { path: input.outputPath } }
}

async function runLocalExiftool(input: {
  inputPath: string
  outputPath: string
  inPlace: boolean
}) {
  if (!input.inPlace) {
    await ensureParentDir(input.outputPath)
    await fs.copyFile(input.inputPath, input.outputPath)
  }

  const command = buildCommandToRemoveMetadataExiftool({
    filePath: input.outputPath,
  })
  await spawnAndWait({
    verb: 'remove metadata',
    bin: command.bin,
    args: command.args,
  })

  return { file: { path: input.outputPath } }
}

const [removeMetadataNode, testRemoveMetadataNode] = createNodeHandler({
  parsers: {
    input: RemoveMetadataNodeInputParser,
    local: RemoveMetadataNodeLocalInputParser,
    output: RemoveMetadataNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default removeMetadataNode
export { removeMetadataNode, testRemoveMetadataNode }
