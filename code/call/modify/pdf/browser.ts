/**
 * Browser-safe pdf-lib core for `task modify pdf` — reorder or
 * remove pages.
 */

import {
  parsePageList,
  parsePageRanges,
} from '~/code/tool/shared/pdf-pages'

export type ModifyPdfBytesInput = {
  pdf: Uint8Array
  order?: string
  remove?: string
}

export type ModifyPdfBytesOutput = {
  bytes: Uint8Array
  pagesBefore: number
  pagesAfter: number
  operation: 'order' | 'remove'
}

export async function modifyPdfBytes({
  pdf,
  order,
  remove,
}: ModifyPdfBytesInput): Promise<ModifyPdfBytesOutput> {
  if (order && remove) throw new Error('Pass either --order or --remove, not both')
  if (!order && !remove) throw new Error('Pass --order <list> or --remove <list>')

  const { PDFDocument } = await import('pdf-lib')
  const src = await PDFDocument.load(pdf, { ignoreEncryption: true })
  const totalPages = src.getPageCount()

  let nextOrder: number[]
  let operation: 'order' | 'remove'

  if (order) {
    nextOrder = parsePageList(order)
    operation = 'order'
  } else {
    const drop = new Set(parsePageRanges(remove!))
    nextOrder = []
    for (let p = 1; p <= totalPages; p++) {
      if (!drop.has(p)) nextOrder.push(p)
    }
    operation = 'remove'
  }

  for (const p of nextOrder) {
    if (p < 1 || p > totalPages) {
      throw new Error(`Page ${p} out of range — source has ${totalPages} pages`)
    }
  }

  const out = await PDFDocument.create()
  const copied = await out.copyPages(src, nextOrder.map(p => p - 1))
  for (const page of copied) out.addPage(page)

  return {
    bytes: await out.save(),
    pagesBefore: totalPages,
    pagesAfter: nextOrder.length,
    operation,
  }
}
