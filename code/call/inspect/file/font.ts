/**
 * Minimal SFNT reader for `task inspect file` — extracts the
 * subset of font tables the inspector renders (`name`, `head`,
 * `hhea`, `OS/2`, `fvar`, `maxp`). Pure Node, no native tools, no
 * python.
 *
 * Supported wrappers:
 *
 *   - TTF / OTF: direct sfnt, read tables from the offset table.
 *   - WOFF: sfnt inside a thin wrapper; tables are zlib-compressed.
 *   - WOFF2: Brotli + table-shape transforms. Not parsed here —
 *     callers get `{ wrapper: 'woff2' }` and fall back to
 *     `task dump font` for a structured view.
 *
 * All multi-byte integers in SFNT are big-endian.
 */

import fs from 'node:fs/promises'
import zlib from 'node:zlib'

export type FontInfo = {
  wrapper: 'ttf' | 'otf' | 'woff' | 'woff2' | 'unknown'
  tables: string[]
  name: Record<string, string>
  head?: { unitsPerEm: number; fontRevision: number }
  hhea?: { ascent: number; descent: number; lineGap: number }
  os2?: { weightClass: number; widthClass: number }
  axes?: Array<{ tag: string; min: number; default: number; max: number }>
  glyphCount?: number
}

export async function readFontInfo(filePath: string): Promise<FontInfo> {
  const buf = await fs.readFile(filePath)
  const sig = buf.toString('ascii', 0, 4)

  if (sig === 'wOF2') {
    return { wrapper: 'woff2', tables: [], name: {} }
  }
  if (sig === 'wOFF') {
    const { sfnt, wrapper } = inflateWoff(buf)
    return parseSfnt(sfnt, wrapper)
  }
  return parseSfnt(buf, detectSfntWrapper(sig))
}

// ---- wrapper detection --------------------------------------------

function detectSfntWrapper(sig: string): FontInfo['wrapper'] {
  // 0x00010000 (TrueType), `true`, `typ1` → TTF.
  // `OTTO` → OpenType (CFF).
  if (sig === 'OTTO') return 'otf'
  if (sig === 'true' || sig === 'typ1') return 'ttf'
  // 0x00010000 prints as non-ASCII; fall through to ttf assumption.
  return 'ttf'
}

// ---- WOFF inflation -----------------------------------------------

/**
 * Rebuild an sfnt Buffer from a WOFF. Keeps only the table
 * payloads we'll read; table directory entries are rewritten with
 * uncompressed offsets so the downstream sfnt parser doesn't need
 * to know WOFF existed.
 */
function inflateWoff(
  buf: Buffer,
): { sfnt: Buffer; wrapper: FontInfo['wrapper'] } {
  const numTables = buf.readUInt16BE(12)
  const sfntHeaderSize = 12 + numTables * 16

  type WoffEntry = {
    tag: string
    origLength: number
    compLength: number
    offset: number
    data: Buffer
  }
  const entries: WoffEntry[] = []
  let cursor = 44
  for (let i = 0; i < numTables; i++) {
    const tag = buf.toString('ascii', cursor, cursor + 4)
    const offset = buf.readUInt32BE(cursor + 4)
    const compLength = buf.readUInt32BE(cursor + 8)
    const origLength = buf.readUInt32BE(cursor + 12)
    const raw = buf.subarray(offset, offset + compLength)
    const data =
      compLength === origLength
        ? raw
        : zlib.inflateSync(raw)
    entries.push({ tag, origLength, compLength, offset, data })
    cursor += 20
  }

  const sfnt = Buffer.alloc(
    sfntHeaderSize +
      entries.reduce((s, e) => s + align4(e.origLength), 0),
  )
  // Offset table — the actual scaler is in the WOFF flavor field.
  sfnt.writeUInt32BE(buf.readUInt32BE(4), 0)
  sfnt.writeUInt16BE(numTables, 4)
  // searchRange / entrySelector / rangeShift aren't used by the
  // downstream parser, leave as zero.

  let tableCursor = sfntHeaderSize
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i]!
    const dirOff = 12 + i * 16
    sfnt.write(e.tag, dirOff, 4, 'ascii')
    // checksum not recomputed — parser ignores it.
    sfnt.writeUInt32BE(0, dirOff + 4)
    sfnt.writeUInt32BE(tableCursor, dirOff + 8)
    sfnt.writeUInt32BE(e.origLength, dirOff + 12)
    e.data.copy(sfnt, tableCursor)
    tableCursor += align4(e.origLength)
  }

  const flavorSig = buf.toString('ascii', 4, 8)
  return { sfnt, wrapper: flavorSig === 'OTTO' ? 'otf' : 'ttf' }
}

function align4(n: number): number {
  return (n + 3) & ~3
}

// ---- SFNT parser ---------------------------------------------------

function parseSfnt(buf: Buffer, wrapper: FontInfo['wrapper']): FontInfo {
  const numTables = buf.readUInt16BE(4)
  const dir = new Map<string, { offset: number; length: number }>()
  for (let i = 0; i < numTables; i++) {
    const off = 12 + i * 16
    const tag = buf.toString('ascii', off, off + 4)
    dir.set(tag, {
      offset: buf.readUInt32BE(off + 8),
      length: buf.readUInt32BE(off + 12),
    })
  }

  const info: FontInfo = {
    wrapper,
    tables: [...dir.keys()],
    name: {},
  }

  const nameTable = dir.get('name')
  if (nameTable) info.name = readName(buf, nameTable.offset)

  const headTable = dir.get('head')
  if (headTable) {
    const o = headTable.offset
    info.head = {
      fontRevision: buf.readInt32BE(o + 4) / 65536,
      unitsPerEm: buf.readUInt16BE(o + 18),
    }
  }

  const hheaTable = dir.get('hhea')
  if (hheaTable) {
    const o = hheaTable.offset
    info.hhea = {
      ascent: buf.readInt16BE(o + 4),
      descent: buf.readInt16BE(o + 6),
      lineGap: buf.readInt16BE(o + 8),
    }
  }

  const os2Table = dir.get('OS/2')
  if (os2Table) {
    const o = os2Table.offset
    info.os2 = {
      weightClass: buf.readUInt16BE(o + 4),
      widthClass: buf.readUInt16BE(o + 6),
    }
  }

  const maxpTable = dir.get('maxp')
  if (maxpTable) {
    info.glyphCount = buf.readUInt16BE(maxpTable.offset + 4)
  }

  const fvarTable = dir.get('fvar')
  if (fvarTable) info.axes = readFvar(buf, fvarTable.offset)

  return info
}

/**
 * Read name records, keyed by nameID. Prefers Windows/Unicode
 * (platform 3) strings, falling back to Mac (platform 1).
 */
function readName(buf: Buffer, tableOffset: number): Record<string, string> {
  const count = buf.readUInt16BE(tableOffset + 2)
  const stringOffset = buf.readUInt16BE(tableOffset + 4)
  const stringsStart = tableOffset + stringOffset

  type Rec = {
    platform: number
    encoding: number
    language: number
    nameId: number
    length: number
    offset: number
  }
  const records: Rec[] = []
  for (let i = 0; i < count; i++) {
    const r = tableOffset + 6 + i * 12
    records.push({
      platform: buf.readUInt16BE(r),
      encoding: buf.readUInt16BE(r + 2),
      language: buf.readUInt16BE(r + 4),
      nameId: buf.readUInt16BE(r + 6),
      length: buf.readUInt16BE(r + 8),
      offset: buf.readUInt16BE(r + 10),
    })
  }

  // Pick the best record for each nameId: prefer platform 3
  // (Windows/Unicode), then platform 0 (Unicode), then platform 1
  // (Mac). Skip anything else.
  const best = new Map<number, Rec>()
  for (const r of records) {
    const existing = best.get(r.nameId)
    if (!existing) {
      best.set(r.nameId, r)
    } else if (
      scorePlatform(r.platform) > scorePlatform(existing.platform)
    ) {
      best.set(r.nameId, r)
    }
  }

  const out: Record<string, string> = {}
  for (const [nameId, r] of best) {
    const start = stringsStart + r.offset
    const bytes = buf.subarray(start, start + r.length)
    const encoding = r.platform === 3 || r.platform === 0 ? 'utf-16be' : 'ascii'
    let value: string
    if (encoding === 'utf-16be') {
      // Swap BE→LE so Buffer can decode as utf16le.
      const swapped = Buffer.alloc(bytes.length)
      for (let i = 0; i < bytes.length - 1; i += 2) {
        swapped[i] = bytes[i + 1]!
        swapped[i + 1] = bytes[i]!
      }
      value = swapped.toString('utf16le')
    } else {
      value = bytes.toString('ascii')
    }
    if (value.trim().length > 0) out[String(nameId)] = value
  }
  return out
}

function scorePlatform(p: number): number {
  if (p === 3) return 3
  if (p === 0) return 2
  if (p === 1) return 1
  return 0
}

function readFvar(
  buf: Buffer,
  tableOffset: number,
): FontInfo['axes'] {
  const axesOffset = buf.readUInt16BE(tableOffset + 4)
  const axisCount = buf.readUInt16BE(tableOffset + 8)
  const axisSize = buf.readUInt16BE(tableOffset + 10)
  const axes: NonNullable<FontInfo['axes']> = []
  for (let i = 0; i < axisCount; i++) {
    const a = tableOffset + axesOffset + i * axisSize
    axes.push({
      tag: buf.toString('ascii', a, a + 4),
      min: buf.readInt32BE(a + 4) / 65536,
      default: buf.readInt32BE(a + 8) / 65536,
      max: buf.readInt32BE(a + 12) / 65536,
    })
  }
  return axes
}
