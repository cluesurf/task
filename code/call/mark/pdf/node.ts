/**
 * `task mark pdf file.pdf --highlight "important"` — basic
 * highlight stamp on the first page. pdf-lib doesn't expose
 * text positions, so we draw a yellow rectangle + label at the
 * top-right corner of page 1 with the highlighted text.
 *
 * Useful as a "flag this PDF for the next reviewer" action; for
 * true text-coordinate highlighting use a heavier toolkit
 * (mupdf, pdfjs).
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { ensureParentDir } from '~/code/tool/node/file'

export type MarkPdfNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  highlight: string
}

export type MarkPdfNodeOutput = {
  file: { path: string }
  label: string
}

async function markPdfNode(
  source: MarkPdfNodeInput,
): Promise<MarkPdfNodeOutput> {
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib')
  const inputPath = source.input.file.path
  const bytes = await fs.readFile(inputPath)
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
  const font = await doc.embedFont(StandardFonts.HelveticaBold)

  const page = doc.getPage(0)
  const { width, height } = page.getSize()
  const label = source.highlight
  const fontSize = 12
  const labelWidth = font.widthOfTextAtSize(label, fontSize)
  const padding = 8
  const boxWidth = labelWidth + padding * 2
  const boxHeight = fontSize + padding * 2
  const margin = 18

  page.drawRectangle({
    x: width - boxWidth - margin,
    y: height - boxHeight - margin,
    width: boxWidth,
    height: boxHeight,
    color: rgb(1, 0.95, 0.4),
    borderColor: rgb(0.6, 0.5, 0),
    borderWidth: 1,
    opacity: 0.9,
  })

  page.drawText(label, {
    x: width - boxWidth - margin + padding,
    y: height - boxHeight - margin + padding,
    size: fontSize,
    font,
    color: rgb(0.2, 0.2, 0.2),
  })

  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)
  await fs.writeFile(outputPath, await doc.save())

  return { file: { path: outputPath }, label }
}

export default markPdfNode
export { markPdfNode }
