/**
 * `task inspect metadata` -- shell out to exiftool in JSON mode,
 * then render the tag/value pairs as a tinted key / value table
 * that matches the rest of the inspect family. Filters out
 * noisy system tags (SourceFile, FileType duplicates, and the
 * big binary-ish ones) by default.
 */

import path from 'node:path'
import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import type { InspectMetadataNodeLocalInput } from '~/code/form/action/inspect/metadata/node'
import {
  InspectMetadataNodeInputParser,
  InspectMetadataNodeLocalInputParser,
  InspectMetadataNodeOutputParser,
} from '~/code/form/action/inspect/metadata/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import { getLoggingStyle } from '~/code/tool/node/log'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndCapture } from '~/code/tool/node/spawn'

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }

/** Tags that duplicate stuff already in `inspect file` or are
 * noise for humans. They stay in the JSON output for machine
 * consumers. */
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

async function runLocal(input: InspectMetadataNodeLocalInput) {
  const filePath = input.input.file.path
  const stdout = await spawnAndCapture({
    verb: 'inspect metadata',
    bin: 'exiftool',
    args: ['-j', '-G', filePath],
  })
  const parsed = JSON.parse(stdout) as Array<Record<string, unknown>>
  const raw = parsed[0] ?? {}

  const rows: Array<[string, string]> = []
  for (const [key, value] of Object.entries(raw)) {
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

  return { file: { path: filePath } }
}

function formatValue(v: unknown): string {
  if (typeof v === 'string') return v
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (Array.isArray(v)) return v.map(formatValue).join(', ')
  return JSON.stringify(v)
}

const [inspectMetadataNode, testInspectMetadataNode] =
  createNodeHandler({
    parsers: {
      input: InspectMetadataNodeInputParser,
      local: InspectMetadataNodeLocalInputParser,
      output: InspectMetadataNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export default inspectMetadataNode
export { inspectMetadataNode, testInspectMetadataNode }
