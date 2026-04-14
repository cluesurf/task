/**
 * Browser-safe pdf-lib core for `task merge`. Pure bytes-in /
 * bytes-out — no `fs`, no Node primitives — so the same logic
 * runs in a browser bundle and from the Node CLI.
 *
 * The Node side (`./node.ts`) is a thin fs wrapper that reads
 * each input file, calls `mergePdfBytes`, and writes the result.
 */

export type MergePdfBytesInput = {
  /** PDF inputs in concatenation order. */
  pdfs: Uint8Array[]
}

export type MergePdfBytesOutput = {
  bytes: Uint8Array
  pages: number
}

export async function mergePdfBytes({
  pdfs,
}: MergePdfBytesInput): Promise<MergePdfBytesOutput> {
  const { PDFDocument } = await import('pdf-lib')
  const out = await PDFDocument.create()

  let totalPages = 0
  for (const bytes of pdfs) {
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })
    const indices = doc.getPageIndices()
    const copied = await out.copyPages(doc, indices)
    for (const page of copied) out.addPage(page)
    totalPages += indices.length
  }

  return { bytes: await out.save(), pages: totalPages }
}
