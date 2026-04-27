/**
 * `task isolate image <input>` — pull embedded images out of a
 * pdf / docx / html source into a target directory.
 *
 * Per-backend impls live under `./<backend>/`:
 *
 *   pdf/   — `pdfimages` (poppler) — native-encoded extraction,
 *            no re-rasterization
 *   docx/  — `mammoth`'s image handler captures every embedded
 *            image during HTML conversion
 *   html/  — `cheerio` walks `<img src="data:...">` and writes
 *            each data URI to disk
 *
 * The format is auto-picked from the file extension; override
 * with `input.format`.
 */

import path from 'node:path'
import type { IsolateImageNodeOutput } from './shared'

export type IsolateImageNodeInput = {
  input: {
    file: { path: string }
    format?: 'pdf' | 'docx' | 'html'
  }
  output: { directory: { path: string } }
  prefix?: string
  /** PDF-only: `all` (native), `png`, `jpeg`. Default `all`. */
  mode?: 'all' | 'png' | 'jpeg'
}

export type { IsolateImageNodeOutput }

async function isolateImageNode(
  source: IsolateImageNodeInput,
): Promise<IsolateImageNodeOutput> {
  const format = pickFormat(source)
  const prefix = source.prefix ?? 'image'
  const outputDir = source.output.directory.path

  switch (format) {
    case 'pdf': {
      const { isolateImagePdfNode } = await import('./pdf/node')
      return isolateImagePdfNode({
        source: source.input.file.path,
        outputDir,
        prefix,
        mode: source.mode,
      })
    }
    case 'docx': {
      const { isolateImageDocxNode } = await import('./docx/node')
      return isolateImageDocxNode({
        source: source.input.file.path,
        outputDir,
        prefix,
      })
    }
    case 'html': {
      const { isolateImageHtmlNode } = await import('./html/node')
      return isolateImageHtmlNode({
        source: source.input.file.path,
        outputDir,
        prefix,
      })
    }
  }
}

function pickFormat(input: IsolateImageNodeInput): 'pdf' | 'docx' | 'html' {
  if (input.input.format) return input.input.format
  const ext = path.extname(input.input.file.path).toLowerCase()
  if (ext === '.pdf') return 'pdf'
  if (ext === '.docx') return 'docx'
  if (ext === '.html' || ext === '.htm') return 'html'
  throw new Error(`isolate image: unsupported extension "${ext}"`)
}

export default isolateImageNode
export { isolateImageNode }
