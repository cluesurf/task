/**
 * Browser-safe pdf-lib core for `task mark pdf`. Stamps a yellow
 * highlight rectangle + label at the top-right of page 1.
 *
 * pdf-lib doesn't surface text positions, so this is a basic
 * "flag this PDF" stamp rather than a real text-coordinate
 * highlight. Use mupdf or pdfjs for the latter.
 */

export type MarkPdfBytesInput = {
  pdf: Uint8Array
  highlight: string
}

export type MarkPdfBytesOutput = {
  bytes: Uint8Array
  label: string
}

export async function markPdfBytes({
  pdf,
  highlight,
}: MarkPdfBytesInput): Promise<MarkPdfBytesOutput> {
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib')
  const doc = await PDFDocument.load(pdf, { ignoreEncryption: true })
  const font = await doc.embedFont(StandardFonts.HelveticaBold)

  const page = doc.getPage(0)
  const { width, height } = page.getSize()
  const fontSize = 12
  const labelWidth = font.widthOfTextAtSize(highlight, fontSize)
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
  page.drawText(highlight, {
    x: width - boxWidth - margin + padding,
    y: height - boxHeight - margin + padding,
    size: fontSize,
    font,
    color: rgb(0.2, 0.2, 0.2),
  })

  return { bytes: await doc.save(), label: highlight }
}
