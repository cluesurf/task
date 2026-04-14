/**
 * `task inspect metadata` — shell out to exiftool in JSON mode,
 * then render the tag/value pairs as a tinted key / value table
 * that matches the rest of the inspect family. Filters out
 * noisy system tags (SourceFile, FileType duplicates, and the
 * big binary-ish ones) by default.
 */

import path from 'node:path'
import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { exec } from '~/code/tool/node/process'
import { getLoggingStyle } from '~/code/tool/node/log'

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }

/** Tags that duplicate stuff already in `inspect file` or are
 * noise for humans — kept out of the default render. They stay
 * in the JSON output for machine consumers. */
const HIDDEN_TAGS = new Set([
  'SourceFile',
  'ExifToolVersion',
  'FileName',
  'Directory',
  'FileSize',
  'FileModifyDate',
  'FileAccessDate',
  'FileInodeChangeDate',
  'FilePermissions',
])

export type InspectMetadataNodeInput = {
  input: { file: { path: string } }
}

export async function inspectMetadataNode(source: InspectMetadataNodeInput) {
  const filePath = source.input.file.path
  const { stdout } = await exec(['exiftool', '-j', '-G', filePath])
  const parsed = JSON.parse(stdout) as Array<Record<string, unknown>>
  const raw = parsed[0] ?? {}

  const rows: Array<[string, string]> = []
  for (const [key, value] of Object.entries(raw)) {
    // `-G` prefixes each tag with its group, e.g. `EXIF:Make`.
    // Keep the prefix for context, but check the leaf against the
    // hidden list so we can drop `File:FileName` and friends.
    const leaf = key.includes(':') ? key.split(':')[1]! : key
    if (HIDDEN_TAGS.has(leaf)) continue
    if (value === null || value === undefined || value === '') continue
    rows.push([key, formatValue(value)])
  }

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const widest = rows.reduce((m, [k]) => Math.max(m, k.length), 0)
    const out: string[] = ['', paint(path.basename(filePath), HEAD), '']
    if (rows.length === 0) {
      out.push(paint('(no metadata)', KEY))
    } else {
      for (const [k, v] of rows) {
        out.push(paint(k.padEnd(widest), KEY) + '    ' + paint(v, VAL))
      }
    }
    out.push('')
    process.stdout.write(out.join('\n') + '\n')
  }

  return { file: { path: filePath }, tags: raw }
}

function formatValue(v: unknown): string {
  if (typeof v === 'string') return v
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (Array.isArray(v)) return v.map(formatValue).join(', ')
  return JSON.stringify(v)
}
