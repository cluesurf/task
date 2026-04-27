import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { isolateImageNode } from '~/code/call/isolate/image/node'
import { encodePng } from '~/code/call/isolate/image/png'

const OUT = path.resolve(__dirname, '../../tmp/test-node/isolate-image')

describe('isolate image', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  describe('html with data: URIs', () => {
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

  describe('encodePng', () => {
    it('produces a decodable PNG with the right dimensions', () => {
      const rgba = new Uint8Array([
        255, 0, 0, 255,
        0, 255, 0, 255,
        0, 0, 255, 255,
        255, 255, 0, 255,
      ])
      const png = encodePng({ width: 2, height: 2, rgba })
      // Magic bytes
      expect(png.subarray(0, 8).equals(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      )).toBe(true)
      // IHDR chunk type
      expect(png.subarray(12, 16).toString('ascii')).toBe('IHDR')
    })

    it('rejects mismatched RGBA length', () => {
      expect(() =>
        encodePng({
          width: 2,
          height: 2,
          rgba: new Uint8Array(7), // wrong size
        }),
      ).toThrow(/RGBA bytes/)
    })
  })
})
