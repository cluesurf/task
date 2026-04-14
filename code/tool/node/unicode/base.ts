/**
 * Unicode helpers for `task inspect unicode`, `task normalize
 * unicode`, `task remove invisible`, and `task detect bidi`. All
 * pure-JS — no ICU dependency, uses the string methods Node
 * ships with.
 */

/** Walk a string by scalar value (surrogate-safe). */
export function codepoints(input: string): string[] {
  return Array.from(input)
}

/** Hex codepoint for a single scalar like "U+1F600". */
export function describeCodepoint(ch: string): {
  codepoint: string
  name?: string
  category: string
} {
  const cp = ch.codePointAt(0)!
  return {
    codepoint: 'U+' + cp.toString(16).toUpperCase().padStart(4, '0'),
    category: categoryFor(cp),
  }
}

/** Rough character category — enough to describe letters vs
 *  punctuation / invisible / bidi controls. Stops at the coarse
 *  buckets people actually care about on a terminal. */
function categoryFor(cp: number): string {
  if (INVISIBLE_SET.has(cp)) return 'invisible'
  if (BIDI_SET.has(cp)) return 'bidi'
  if (cp < 0x20 || cp === 0x7f) return 'control'
  if (cp >= 0x30 && cp <= 0x39) return 'digit'
  if ((cp >= 0x41 && cp <= 0x5a) || (cp >= 0x61 && cp <= 0x7a)) return 'ascii-letter'
  if (cp >= 0x80 && cp < 0x2000) return 'letter'
  if (cp >= 0x2000 && cp < 0x2070) return 'punctuation'
  if (cp >= 0x1f300 && cp <= 0x1faff) return 'emoji'
  return 'other'
}

/** Zero-width + format + bidi-markers that render as nothing on
 *  screen but still sit in the byte stream. Dropped by
 *  `remove invisible`. */
const INVISIBLE_CHARS = [
  0x00ad, // soft hyphen
  0x200b, // zero-width space
  0x200c, // zero-width non-joiner
  0x200d, // zero-width joiner
  0x2060, // word joiner
  0xfeff, // BOM / zero-width no-break space
  0x180e, // mongolian vowel separator
]

export const INVISIBLE_SET = new Set([...INVISIBLE_CHARS])

/** Bidi override / embedding / isolate code points. A file that
 *  mixes these with ASCII can display text that reads one way
 *  but parses another — the classic Trojan Source attack. */
const BIDI_CHARS = [
  0x202a, 0x202b, 0x202c, 0x202d, 0x202e, // LRE, RLE, PDF, LRO, RLO
  0x2066, 0x2067, 0x2068, 0x2069,         // LRI, RLI, FSI, PDI
  0x200e, 0x200f,                         // LRM, RLM
]

export const BIDI_SET = new Set(BIDI_CHARS)

/** NFC / NFD via the String `.normalize()` method. */
export function normalizeUnicode(
  text: string,
  form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD' = 'NFC',
): string {
  return text.normalize(form)
}

/** Drop every zero-width / BOM / Mongolian separator, keep the
 *  rest untouched. Useful when a file copy/pasted from a
 *  terminal or PDF has invisible cruft interleaved. */
export function stripInvisible(text: string): string {
  return Array.from(text)
    .filter(ch => !INVISIBLE_SET.has(ch.codePointAt(0)!))
    .join('')
}

/** Bidi character report — useful for Trojan Source scans. */
export function detectBidi(text: string): Array<{
  codepoint: string
  index: number
  context: string
}> {
  const hits: Array<{ codepoint: string; index: number; context: string }> = []
  let offset = 0
  for (const ch of text) {
    const cp = ch.codePointAt(0)!
    if (BIDI_SET.has(cp)) {
      hits.push({
        codepoint: 'U+' + cp.toString(16).toUpperCase().padStart(4, '0'),
        index: offset,
        context: text.slice(Math.max(0, offset - 10), offset + 10),
      })
    }
    offset += ch.length
  }
  return hits
}
