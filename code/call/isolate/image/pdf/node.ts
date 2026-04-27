/**
 * Pull embedded images out of a PDF via `pdfimages` (poppler).
 * The binary writes one file per embedded image, named
 * `<prefix>-<NNN>.<ext>`. We re-stat them after the run so the
 * caller gets `{path, bytes, mime}` per file.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToIsolateImagePdf } from './command'
import type { IsolateImageNodeOutput } from '../shared'

export type IsolateImagePdfNodeInput = {
  source: string
  outputDir: string
  prefix: string
  mode?: 'all' | 'png' | 'jpeg'
  firstPage?: number
  lastPage?: number
}

async function isolateImagePdfNode(
  input: IsolateImagePdfNodeInput,
): Promise<IsolateImageNodeOutput> {
  await fs.mkdir(input.outputDir, { recursive: true })
  const outputPrefix = path.join(input.outputDir, input.prefix)
  const before = new Set(await fs.readdir(input.outputDir))

  const command = buildCommandToIsolateImagePdf({
    source: input.source,
    outputPrefix,
    mode: input.mode,
    firstPage: input.firstPage,
    lastPage: input.lastPage,
  })
  await spawnAndWait({
    verb: 'isolate image',
    bin: command.bin,
    args: command.args,
  })

  const after = await fs.readdir(input.outputDir)
  const fresh = after.filter(name => !before.has(name))

  const files: IsolateImageNodeOutput['files'] = []
  for (const name of fresh.sort()) {
    const full = path.join(input.outputDir, name)
    const stat = await fs.stat(full)
    files.push({
      path: full,
      bytes: stat.size,
      mime: extToMime(path.extname(name).slice(1).toLowerCase()),
    })
  }
  return { files }
}

function extToMime(ext: string): string | undefined {
  switch (ext) {
    case 'png':  return 'image/png'
    case 'jpg':
    case 'jpeg': return 'image/jpeg'
    case 'jp2':  return 'image/jp2'
    case 'tif':
    case 'tiff': return 'image/tiff'
    case 'pbm':  return 'image/x-portable-bitmap'
    case 'ppm':  return 'image/x-portable-pixmap'
    default: return undefined
  }
}

export default isolateImagePdfNode
export { isolateImagePdfNode }
