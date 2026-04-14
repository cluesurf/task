/**
 * Browser-safe pdf-lib core for `task split` / `task extract pages`.
 * Bytes in, bytes out — no fs.
 */

import { parsePageRanges } from '~/code/tool/shared/pdf-pages'

export type SplitPdfBytesInput = {
  pdf: Uint8Array
  /** Same `--pages` spec as the CLI: `1-3,5,7-9`. */
  pages: string
}

export type SplitPdfBytesOutput = {
  bytes: Uint8Array
  pages: number[]
}

export async function splitPdfBytes({
  pdf,
  pages,
}: SplitPdfBytesInput): Promise<SplitPdfBytesOutput> {
  const { PDFDocument } = await import('pdf-lib')
  const src = await PDFDocument.load(pdf, { ignoreEncryption: true })

  const requested = parsePageRanges(pages)
  const totalPages = src.getPageCount()
  for (const p of requested) {
    if (p < 1 || p > totalPages) {
      throw new Error(
        `Page ${p} out of range — source has ${totalPages} pages`,
      )
    }
  }

  const out = await PDFDocument.create()
  const copied = await out.copyPages(src, requested.map(p => p - 1))
  for (const page of copied) out.addPage(page)

  return { bytes: await out.save(), pages: requested }
}
