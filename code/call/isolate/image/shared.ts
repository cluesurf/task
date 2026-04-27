/**
 * Cross-backend types and helpers for `task isolate image`.
 */

export type IsolateImageNodeOutput = {
  files: Array<{ path: string; bytes: number; mime?: string }>
}

export function mimeToExt(mime: string | undefined): string | undefined {
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
