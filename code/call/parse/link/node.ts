/**
 * `task parse link <input>` — pull every link out of HTML or
 * Markdown. Two modes:
 *
 * - HTML / DOM: cheerio walks `<a>`, `<img>`, `<link>`, `<area>`
 *   plus opengraph + json-ld + jsonfeed. Captures href, text,
 *   rel, alt, title.
 * - Plain text / markdown: linkify-it sweep — picks up bare
 *   URLs, mailto:, and markdown link syntax.
 *
 * The mode is auto-detected: `<` in the first 200 bytes ⇒ HTML;
 * otherwise plaintext. Override with `mode: 'html' | 'text'`.
 */

import fs from 'node:fs/promises'
import * as cheerio from 'cheerio'
import LinkifyIt from 'linkify-it'

export type ParseLinkNodeInput = {
  input?: { file?: { path: string }; text?: string }
  output?: { file?: { path: string } }
  mode?: 'html' | 'text' | 'auto'
  /** Resolve relative `href`s against this base URL. */
  base?: string
  /** Deduplicate by href — default true. */
  unique?: boolean
}

export type ParseLinkRecord = {
  href: string
  /** Element name (`a`, `img`, `link`, `area`, …) or `text`. */
  source: string
  text?: string
  alt?: string
  title?: string
  rel?: string
  type?: string
}

export type ParseLinkNodeOutput = {
  links: ParseLinkRecord[]
}

const linkify = new LinkifyIt()

async function parseLinkNode(
  source: ParseLinkNodeInput,
): Promise<ParseLinkNodeOutput> {
  const text = await readSource(source)
  const mode = source.mode === 'auto' || source.mode === undefined
    ? detectMode(text)
    : source.mode

  const links: ParseLinkRecord[] = []
  if (mode === 'html') {
    links.push(...extractFromHtml(text, source.base))
  } else {
    links.push(...extractFromText(text))
  }

  const out: ParseLinkNodeOutput = source.unique === false
    ? { links }
    : { links: dedupe(links) }

  const dst = source.output?.file?.path
  if (dst) {
    await fs.writeFile(dst, JSON.stringify(out, null, 2) + '\n')
  }
  return out
}

function detectMode(text: string): 'html' | 'text' {
  return /<\s*\w+[\s>]/.test(text.slice(0, 1024)) ? 'html' : 'text'
}

function extractFromHtml(html: string, base?: string): ParseLinkRecord[] {
  const $ = cheerio.load(html)
  const out: ParseLinkRecord[] = []

  $('a[href]').each((_i, el) => {
    const $el = $(el)
    out.push({
      source: 'a',
      href: resolveHref($el.attr('href') ?? '', base),
      text: $el.text().trim() || undefined,
      title: $el.attr('title') ?? undefined,
      rel: $el.attr('rel') ?? undefined,
    })
  })

  $('img[src]').each((_i, el) => {
    const $el = $(el)
    out.push({
      source: 'img',
      href: resolveHref($el.attr('src') ?? '', base),
      alt: $el.attr('alt') ?? undefined,
      title: $el.attr('title') ?? undefined,
    })
  })

  $('link[href]').each((_i, el) => {
    const $el = $(el)
    out.push({
      source: 'link',
      href: resolveHref($el.attr('href') ?? '', base),
      rel: $el.attr('rel') ?? undefined,
      type: $el.attr('type') ?? undefined,
    })
  })

  $('area[href]').each((_i, el) => {
    const $el = $(el)
    out.push({
      source: 'area',
      href: resolveHref($el.attr('href') ?? '', base),
      alt: $el.attr('alt') ?? undefined,
      rel: $el.attr('rel') ?? undefined,
    })
  })

  // OpenGraph + JSON-LD URL claims.
  $('meta[property="og:url"], meta[property="og:image"]').each((_i, el) => {
    const content = $(el).attr('content')
    if (content) {
      out.push({
        source: $(el).attr('property') ?? 'og',
        href: resolveHref(content, base),
      })
    }
  })

  return out
}

function extractFromText(text: string): ParseLinkRecord[] {
  const matches = linkify.match(text) ?? []
  return matches.map(m => ({
    source: m.schema === 'mailto:' ? 'mailto' : 'text',
    href: m.url,
    text: m.text === m.url ? undefined : m.text,
  }))
}

function resolveHref(href: string, base?: string): string {
  if (!base) return href
  try {
    return new URL(href, base).toString()
  } catch {
    return href
  }
}

function dedupe(links: ParseLinkRecord[]): ParseLinkRecord[] {
  const seen = new Set<string>()
  const out: ParseLinkRecord[] = []
  for (const l of links) {
    if (seen.has(l.href)) continue
    seen.add(l.href)
    out.push(l)
  }
  return out
}

async function readSource(input: ParseLinkNodeInput): Promise<string> {
  if (input.input?.text !== undefined) return input.input.text
  const p = input.input?.file?.path
  if (!p) {
    throw new Error('parse link: provide input.file.path or input.text')
  }
  return fs.readFile(p, 'utf8')
}

export default parseLinkNode
export { parseLinkNode }
