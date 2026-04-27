/**
 * Minimal PNG encoder used by `isolate image` for PDF rasters.
 * RGBA only — pdfjs gives us non-paletted bitmaps and we don't
 * try to recover paletted form. zlib is built into Node, so this
 * module has no dependencies.
 */

import { deflateSync } from 'node:zlib'

const MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

export function encodePng(input: {
  width: number
  height: number
  rgba: Uint8Array
}): Buffer {
  const { width, height, rgba } = input
  if (rgba.length !== width * height * 4) {
    throw new Error(
      `encodePng: expected ${width * height * 4} RGBA bytes, got ${rgba.length}`,
    )
  }

  // Build raw scanlines with the per-line filter byte (0 = none).
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0 // filter type: None
    raw.set(
      rgba.subarray(y * stride, y * stride + stride),
      y * (stride + 1) + 1,
    )
  }

  const idatPayload = deflateSync(raw)

  // IHDR: width(4) + height(4) + bit-depth(1) + color-type(1) +
  // compression(1) + filter(1) + interlace(1).
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8  // 8-bit per channel
  ihdr[9] = 6  // truecolor + alpha
  ihdr[10] = 0 // deflate
  ihdr[11] = 0 // filter method 0
  ihdr[12] = 0 // no interlace

  return Buffer.concat([
    MAGIC,
    chunk('IHDR', ihdr),
    chunk('IDAT', idatPayload),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crcInput = Buffer.concat([typeBuf, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(crcInput), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

const CRC_TABLE: Uint32Array = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    t[n] = c
  }
  return t
})()

function crc32(buf: Buffer): number {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]!) & 0xff]! ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}
