/**
 * Pull embedded images out of a DOCX via mammoth's image
 * handler. Each image is read as a buffer during the HTML
 * conversion pass; we discard the HTML and keep the buffers.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import type { IsolateImageNodeOutput } from '../shared'
import { mimeToExt } from '../shared'

export type IsolateImageDocxNodeInput = {
  source: string
  outputDir: string
  prefix: string
}

async function isolateImageDocxNode(
  input: IsolateImageDocxNodeInput,
): Promise<IsolateImageNodeOutput> {
  await fs.mkdir(input.outputDir, { recursive: true })
  const mammoth = await import('mammoth')
  const files: IsolateImageNodeOutput['files'] = []
  let counter = 0

  await mammoth.convertToHtml(
    { path: input.source },
    {
      convertImage: mammoth.images.imgElement(async image => {
        const buffer = await image.read()
        const ext = mimeToExt(image.contentType) ?? 'bin'
        const out = path.join(
          input.outputDir,
          `${input.prefix}-${String(counter++).padStart(3, '0')}.${ext}`,
        )
        await fs.writeFile(out, buffer)
        files.push({
          path: out,
          bytes: buffer.byteLength,
          mime: image.contentType,
        })
        return { src: out }
      }),
    },
  )

  return { files }
}

export default isolateImageDocxNode
export { isolateImageDocxNode }
