/**
 * `task isolate image <input>` — extract embedded images out of
 * a pdf / docx / html source into a target directory.
 *
 * Backends:
 *   pdf   — pdfjs-dist walks each page's operator list and pulls
 *           rasterized image XObjects via OPS.paintImageXObject
 *   docx  — mammoth's image-handler captures every embedded
 *           image during HTML conversion
 *   html  — cheerio walks `<img src="data:...">` and writes each
 *           data URI to disk; non-data URIs are reported but
 *           NOT downloaded (use `task fetch` for that on purpose)
 *
 * Each image lands at `<output-dir>/<prefix>-NNN.<ext>`. The
 * extension comes from the embedded mime type when present.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import * as cheerio from 'cheerio'

export type IsolateImageNodeInput = {
  input: {
    file: { path: string }
    format?: 'pdf' | 'docx' | 'html'
  }
  output: { directory: { path: string } }
  prefix?: string
}

export type IsolateImageNodeOutput = {
  files: Array<{ path: string; bytes: number; mime?: string }>
}

async function isolateImageNode(
  source: IsolateImageNodeInput,
): Promise<IsolateImageNodeOutput> {
  const format = pickFormat(source)
  const prefix = source.prefix ?? 'image'
  const outDir = source.output.directory.path
  await fs.mkdir(outDir, { recursive: true })

  switch (format) {
    case 'pdf':  return isolateFromPdf(source.input.file.path, outDir, prefix)
    case 'docx': return isolateFromDocx(source.input.file.path, outDir, prefix)
    case 'html': return isolateFromHtml(source.input.file.path, outDir, prefix)
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

async function isolateFromPdf(
  filePath: string,
  outDir: string,
  prefix: string,
): Promise<IsolateImageNodeOutput> {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const data = await fs.readFile(filePath)
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(data),
    disableFontFace: true,
    isEvalSupported: false,
  }).promise

  const files: IsolateImageNodeOutput['files'] = []
  let counter = 0

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p)
    const ops = await page.getOperatorList()
    const fns = ops.fnArray
    const args = ops.argsArray

    for (let i = 0; i < fns.length; i++) {
      if (
        fns[i] !== pdfjs.OPS.paintImageXObject &&
        fns[i] !== pdfjs.OPS.paintInlineImageXObject
      ) continue
      const name = args[i]?.[0]
      if (typeof name !== 'string') continue

      const img = await page.objs.get(name).catch(() => null)
      if (!img || !img.bitmap && !img.data) continue

      const png = await rasterToPng(img)
      if (!png) continue
      const out = path.join(outDir, `${prefix}-${String(counter++).padStart(3, '0')}.png`)
      await fs.writeFile(out, png)
      files.push({ path: out, bytes: png.byteLength, mime: 'image/png' })
    }

    page.cleanup()
  }
  await doc.destroy()
  return { files }
}

async function rasterToPng(img: {
  width: number
  height: number
  bitmap?: ImageBitmap
  data?: Uint8ClampedArray | Uint8Array
  kind?: number
}): Promise<Buffer | undefined> {
  // pdfjs returns either an ImageBitmap (browser-style) or a raw
  // RGBA buffer. We re-encode through a minimal PNG writer so we
  // don't need a node-canvas dep on the install path.
  if (!img.data || img.data.length === 0) return undefined
  const { width, height } = img
  if (!width || !height) return undefined

  // Many pdfjs paths give RGB instead of RGBA; pad to RGBA.
  const expectedRgba = width * height * 4
  let rgba: Uint8Array
  if (img.data.length === expectedRgba) {
    rgba = new Uint8Array(img.data.buffer, img.data.byteOffset, img.data.byteLength)
  } else if (img.data.length === width * height * 3) {
    rgba = new Uint8Array(expectedRgba)
    for (let i = 0, j = 0; i < img.data.length; i += 3, j += 4) {
      rgba[j]     = img.data[i]!
      rgba[j + 1] = img.data[i + 1]!
      rgba[j + 2] = img.data[i + 2]!
      rgba[j + 3] = 255
    }
  } else {
    return undefined
  }

  const { encodePng } = await import('./png')
  return encodePng({ width, height, rgba })
}

async function isolateFromDocx(
  filePath: string,
  outDir: string,
  prefix: string,
): Promise<IsolateImageNodeOutput> {
  const mammoth = await import('mammoth')
  const files: IsolateImageNodeOutput['files'] = []
  let counter = 0

  await mammoth.convertToHtml(
    { path: filePath },
    {
      convertImage: mammoth.images.imgElement(async (image) => {
        const buffer = await image.read()
        const ext = mimeToExt(image.contentType) ?? 'bin'
        const out = path.join(
          outDir,
          `${prefix}-${String(counter++).padStart(3, '0')}.${ext}`,
        )
        await fs.writeFile(out, buffer)
        files.push({ path: out, bytes: buffer.byteLength, mime: image.contentType })
        return { src: out }
      }),
    },
  )

  return { files }
}

async function isolateFromHtml(
  filePath: string,
  outDir: string,
  prefix: string,
): Promise<IsolateImageNodeOutput> {
  const html = await fs.readFile(filePath, 'utf8')
  const $ = cheerio.load(html)
  const files: IsolateImageNodeOutput['files'] = []
  let counter = 0

  const candidates: string[] = []
  $('img[src]').each((_i, el) => {
    const src = $(el).attr('src')
    if (src) candidates.push(src)
  })

  for (const src of candidates) {
    if (!src.startsWith('data:')) continue
    const m = /^data:([^;,]+)(;base64)?,(.*)$/s.exec(src)
    if (!m) continue
    const [, mime, base64Flag, payload] = m
    const buffer = base64Flag
      ? Buffer.from(payload!, 'base64')
      : Buffer.from(decodeURIComponent(payload!), 'binary')
    const ext = mimeToExt(mime!) ?? 'bin'
    const out = path.join(
      outDir,
      `${prefix}-${String(counter++).padStart(3, '0')}.${ext}`,
    )
    await fs.writeFile(out, buffer)
    files.push({ path: out, bytes: buffer.byteLength, mime: mime ?? undefined })
  }

  return { files }
}

function mimeToExt(mime: string | undefined): string | undefined {
  if (!mime) return undefined
  switch (mime.toLowerCase()) {
    case 'image/png':  return 'png'
    case 'image/jpeg': return 'jpg'
    case 'image/jpg':  return 'jpg'
    case 'image/gif':  return 'gif'
    case 'image/webp': return 'webp'
    case 'image/svg+xml': return 'svg'
    case 'image/bmp':  return 'bmp'
    case 'image/tiff': return 'tif'
    case 'image/avif': return 'avif'
    default: return undefined
  }
}

export default isolateImageNode
export { isolateImageNode }
