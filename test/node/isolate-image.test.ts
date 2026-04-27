import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { isolateImageNode } from '~/code/call/isolate/image/node'
import { buildCommandToIsolateImagePdf } from '~/code/call/isolate/image/pdf/command'

const OUT = path.resolve(__dirname, '../../tmp/test-node/isolate-image')

describe('isolate image — html with data: URIs', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('writes every embedded image to disk', async () => {
    const html = `
      <html><body>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" alt="dot">
        <img src="data:image/svg+xml;utf8,%3Csvg/%3E" alt="svg">
        <img src="https://example.com/external.png" alt="external">
      </body></html>
    `
    const file = path.join(OUT, 'page.html')
    const out = path.join(OUT, 'html-out')
    await fs.writeFile(file, html)
    await fs.rm(out, { recursive: true, force: true })

    const result = await isolateImageNode({
      input: { file: { path: file } },
      output: { directory: { path: out } },
    })

    // The two data: URIs land on disk; the external URL is skipped.
    expect(result.files).toHaveLength(2)
    const mimes = new Set(result.files.map(f => f.mime))
    expect(mimes.has('image/png')).toBe(true)
    expect(mimes.has('image/svg+xml')).toBe(true)

    for (const f of result.files) {
      const stat = await fs.stat(f.path)
      expect(stat.size).toBe(f.bytes)
    }
  })

  it('rejects unknown extensions', async () => {
    const file = path.join(OUT, 'mystery.xyz')
    await fs.writeFile(file, 'irrelevant')
    await expect(async () =>
      isolateImageNode({
        input: { file: { path: file } },
        output: { directory: { path: OUT } },
      }),
    ).rejects.toThrow(/unsupported/)
  })
})

describe('isolate image — pdf argv builder', () => {
  it('passes -all by default', () => {
    const c = buildCommandToIsolateImagePdf({
      source: 'in.pdf',
      outputPrefix: '/tmp/img',
    })
    expect(c.bin).toBe('pdfimages')
    expect(c.args).toContain('-all')
    expect(c.args).toContain('in.pdf')
    expect(c.args[c.args.length - 1]).toBe('/tmp/img')
  })

  it('honors mode + page range', () => {
    const c = buildCommandToIsolateImagePdf({
      source: 'in.pdf',
      outputPrefix: '/tmp/img',
      mode: 'png',
      firstPage: 2,
      lastPage: 5,
    })
    expect(c.args).toContain('-png')
    expect(c.args).toContain('-f')
    expect(c.args).toContain('2')
    expect(c.args).toContain('-l')
    expect(c.args).toContain('5')
  })
})
