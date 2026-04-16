// RAW (ARW/CR2/CR3/NEF/DNG/...) -> TIFF or PPM.
// dcraw is the classic decoder. Output lands next to the input as
// <basename>.tiff. The local worker moves it to the requested path.

import path from 'node:path'
import { promises as fs } from 'node:fs'
import type {
  ConvertImageWithDcrawNodeInput,
  ConvertImageWithDcrawNodeLocalInput,
} from '~/code/form/action/convert/image/dcraw/node'
import {
  ConvertImageWithDcrawNodeInputParser,
  ConvertImageWithDcrawNodeLocalInputParser,
  ConvertImageWithDcrawNodeOutputParser,
} from '~/code/form/action/convert/image/dcraw/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithDcraw } from './command'

async function runLocal(input: ConvertImageWithDcrawNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const fmt = input.outputFormat ?? 'tiff'
  const command = buildCommandToConvertImageWithDcraw({
    inputPath,
    outputFormat: fmt,
    cameraWhiteBalance: input.cameraWhiteBalance,
    srgb: input.srgb,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })

  // dcraw writes <basename>.(tiff|ppm) next to the input. Move it
  // to the caller's requested output path.
  const dir = path.dirname(inputPath)
  const base = path.basename(inputPath, path.extname(inputPath))
  const written = path.join(dir, `${base}.${fmt}`)
  if (written !== outputPath) {
    await fs.rename(written, outputPath)
  }
  return { file: { path: outputPath } }
}

const [convertImageWithDcrawNode, testConvertImageWithDcrawNode] =
  createNodeHandler({
    parsers: {
      input: ConvertImageWithDcrawNodeInputParser,
      local: ConvertImageWithDcrawNodeLocalInputParser,
      output: ConvertImageWithDcrawNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export default convertImageWithDcrawNode
export { convertImageWithDcrawNode, testConvertImageWithDcrawNode }
export type { ConvertImageWithDcrawNodeInput }
