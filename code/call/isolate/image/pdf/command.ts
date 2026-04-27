/**
 * `pdfimages` (poppler-utils) argv builder. Extracts every
 * embedded image from a PDF in its native encoding (jpg / png /
 * jbig2 / ccitt). Far more robust than re-rasterizing through
 * pdfjs operator-list walking, and avoids hand-rolled PNG
 * encoding.
 */

export type IsolateImagePdfCommandInput = {
  source: string
  outputPrefix: string
  /**
   * Output mode. `all` keeps native encoding (jpg stays jpg);
   * `png` re-encodes everything as PNG; `jpeg` to JPEG.
   */
  mode?: 'all' | 'png' | 'jpeg'
  /** Restrict to a page range (1-indexed, inclusive). */
  firstPage?: number
  lastPage?: number
}

export function buildCommandToIsolateImagePdf(
  input: IsolateImagePdfCommandInput,
): { bin: 'pdfimages'; args: string[] } {
  const args: string[] = []
  switch (input.mode ?? 'all') {
    case 'all':  args.push('-all'); break
    case 'png':  args.push('-png'); break
    case 'jpeg': args.push('-j'); break
  }
  if (input.firstPage !== undefined) args.push('-f', String(input.firstPage))
  if (input.lastPage !== undefined) args.push('-l', String(input.lastPage))
  args.push(input.source, input.outputPrefix)
  return { bin: 'pdfimages', args }
}
