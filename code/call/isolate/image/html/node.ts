/**
 * Pull embedded images out of an HTML file. Cheerio walks every
 * `<img src="data:...">` and writes the decoded payload to disk.
 * Non-`data:` URIs are skipped — use `task fetch` deliberately
 * if remote download is the goal.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import * as cheerio from 'cheerio'
import { mimeToExt, type IsolateImageNodeOutput } from '../shared'

export type IsolateImageHtmlNodeInput = {
  source: string
  outputDir: string
  prefix: string
}

async function isolateImageHtmlNode(
  input: IsolateImageHtmlNodeInput,
): Promise<IsolateImageNodeOutput> {
  await fs.mkdir(input.outputDir, { recursive: true })
  const html = await fs.readFile(input.source, 'utf8')
  const $ = cheerio.load(html)

  const candidates: string[] = []
  $('img[src]').each((_i, el) => {
    const src = $(el).attr('src')
    if (src) candidates.push(src)
  })

  const files: IsolateImageNodeOutput['files'] = []
  let counter = 0

  for (const src of candidates) {
    if (!src.startsWith('data:')) continue
    // data:[<mime>][;<param>=<value>]*[;base64],<payload>
    const m = /^data:([^;,]+)?((?:;[^,;]+)*),(.*)$/s.exec(src)
    if (!m) continue
    const [, mime, params, payload] = m
    const isBase64 = (params ?? '').includes(';base64')
    const buffer = isBase64
      ? Buffer.from(payload!, 'base64')
      : Buffer.from(decodeURIComponent(payload!), 'binary')
    const ext = mimeToExt(mime) ?? 'bin'
    const out = path.join(
      input.outputDir,
      `${input.prefix}-${String(counter++).padStart(3, '0')}.${ext}`,
    )
    await fs.writeFile(out, buffer)
    files.push({
      path: out,
      bytes: buffer.byteLength,
      mime: mime || undefined,
    })
  }

  return { files }
}

export default isolateImageHtmlNode
export { isolateImageHtmlNode }
