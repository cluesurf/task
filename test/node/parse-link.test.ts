import { describe, it, expect } from 'vitest'
import { parseLinkNode } from '~/code/call/parse/link/node'

describe('parse link', () => {
  it('extracts <a> + <img> + <link> from HTML', async () => {
    const html = `
      <html><head>
        <link rel="canonical" href="/canon">
        <link rel="stylesheet" href="/main.css" type="text/css">
      </head><body>
        <p><a href="https://example.com" title="Ex">Example</a></p>
        <p><a href="/relative">Relative</a></p>
        <img src="/cat.png" alt="Cat">
        <meta property="og:image" content="https://cdn.example.com/og.png">
      </body></html>
    `
    const r = await parseLinkNode({
      input: { text: html },
      mode: 'html',
      base: 'https://example.com',
    })
    const hrefs = r.links.map(l => l.href)
    expect(hrefs).toContain('https://example.com/canon')
    expect(hrefs).toContain('https://example.com/main.css')
    expect(hrefs).toContain('https://example.com')
    expect(hrefs).toContain('https://example.com/relative')
    expect(hrefs).toContain('https://example.com/cat.png')
    expect(hrefs).toContain('https://cdn.example.com/og.png')

    const img = r.links.find(l => l.source === 'img')!
    expect(img.alt).toBe('Cat')

    const a = r.links.find(l => l.source === 'a' && l.title === 'Ex')!
    expect(a.text).toBe('Example')
  })

  it('auto-detects mode from content', async () => {
    const r = await parseLinkNode({
      input: { text: 'see https://clue.surf for details' },
    })
    expect(r.links).toEqual([
      { source: 'text', href: 'https://clue.surf' },
    ])
  })

  it('extracts mailto: and bare URLs from plain text', async () => {
    const r = await parseLinkNode({
      input: { text: 'reach me at me@example.com or https://x.com' },
      mode: 'text',
    })
    const hrefs = r.links.map(l => l.href)
    expect(hrefs).toContain('mailto:me@example.com')
    expect(hrefs).toContain('https://x.com')
  })

  it('deduplicates by href by default', async () => {
    const r = await parseLinkNode({
      input: { text: 'https://x.com and https://x.com again' },
    })
    expect(r.links).toHaveLength(1)
  })

  it('respects unique=false', async () => {
    const r = await parseLinkNode({
      input: { text: 'https://x.com and https://x.com again' },
      unique: false,
    })
    expect(r.links).toHaveLength(2)
  })
})
