/**
 * Non-table extractors for `task parse html`.
 * Anything cheap that's a one-pass DOM walk lives here.
 */

import * as cheerio from 'cheerio'

export type Link  = { href: string; text: string; rel?: string }
export type Image = { src: string;  alt?: string; width?: string; height?: string }

export function extractLinks(html: string, base?: string): Link[] {
  const $ = cheerio.load(html)
  const out: Link[] = []
  $('a[href]').each((_, el) => {
    const $a = $(el)
    out.push({
      href: absolute($a.attr('href')!, base),
      text: $a.text().replace(/\s+/g, ' ').trim(),
      rel:  $a.attr('rel'),
    })
  })
  return out
}

export function extractImages(html: string, base?: string): Image[] {
  const $ = cheerio.load(html)
  const out: Image[] = []
  $('img[src]').each((_, el) => {
    const $img = $(el)
    out.push({
      src: absolute($img.attr('src')!, base),
      alt: $img.attr('alt'),
      width: $img.attr('width'),
      height: $img.attr('height'),
    })
  })
  return out
}

export function extractText(html: string): string {
  const $ = cheerio.load(html)
  // Drop script/style noise before reading text.
  $('script, style, noscript').remove()
  return $('body').text().replace(/\s+/g, ' ').trim()
}

function absolute(href: string, base?: string): string {
  if (!base) return href
  try { return new URL(href, base).toString() } catch { return href }
}
