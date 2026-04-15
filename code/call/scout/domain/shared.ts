/**
 * Cross-env helpers for `task scout domain`.
 *
 * Exposes:
 *
 *   - `expandPatterns({...})` — turn a pattern spec
 *     (length range, alphabet, text patterns,
 *     prefix/suffix/contains, extensions) into a flat
 *     list of FQDN candidates.
 *   - `parsePatternList(strings)` — normalize a CSV /
 *     repeated-flag arg into `string[]`.
 *
 * Pure functions, no I/O. Safe for browser as well as
 * node.
 */

/**
 * Default alphabet matches the DNS LDH rule for hostname
 * labels (letters, digits, hyphen). Hyphen cannot lead or
 * trail; the expander enforces that.
 */

const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789-'

/**
 * Hard ceiling on candidate count to prevent accidental
 * 17-million-row sweeps. Override with `maxCandidates`.
 */

const DEFAULT_MAX_CANDIDATES = 100_000

export type PatternSpec = {
  /** Wildcard text patterns (`*`/`?`). Repeatable. */
  text?: string[]
  /** Convenience: expands to `<prefix>*`. */
  prefix?: string
  /** Convenience: expands to `*<suffix>`. */
  suffix?: string
  /** Convenience: expands to `*<contains>*`. */
  contains?: string
  /** Exact label length. Mutually exclusive with min/max. */
  length?: number
  /** Inclusive lower bound on label length. */
  lengthMin?: number
  /** Inclusive upper bound on label length. */
  lengthMax?: number
  /** Allowed character set. Defaults to LDH (`a-z0-9-`). */
  alphabet?: string
  /** Drop digits from the alphabet. */
  noDigits?: boolean
  /** Drop hyphen from the alphabet. */
  noHyphens?: boolean
  /** Regex of labels to drop (post-generation filter). */
  exclude?: RegExp
}

export type ExpansionInput = PatternSpec & {
  /**
   * TLDs to cross with each label, lowercase, no dot
   * prefix. e.g. `['com', 'net']`. `'all'` is expanded by
   * the caller before reaching this helper.
   */
  extensions: string[]
  /** Hard ceiling on output. Throws when exceeded. */
  maxCandidates?: number
}

export type ExpansionOutput = {
  /** Final FQDN list. */
  candidates: string[]
  /** Total label count before extension cross-product. */
  labelCount: number
}

function alphabetFor(spec: PatternSpec): string {
  let alpha = spec.alphabet ?? DEFAULT_ALPHABET
  if (spec.noDigits) alpha = alpha.replace(/[0-9]/g, '')
  if (spec.noHyphens) alpha = alpha.replace(/-/g, '')
  return alpha
}

/**
 * Compile a single pattern (with `*` / `?`) into a regex
 * that matches a generated candidate. `*` matches any run
 * of LDH characters (including empty); `?` matches one.
 */

function patternToRegex(pattern: string): RegExp {
  let body = ''
  for (const ch of pattern) {
    if (ch === '*') body += '[a-z0-9-]*'
    else if (ch === '?') body += '[a-z0-9-]'
    else if (/[a-z0-9-]/i.test(ch)) body += ch.toLowerCase()
    else body += '\\' + ch
  }
  return new RegExp(`^${body}$`)
}

/**
 * Resolve `prefix` / `suffix` / `contains` shortcuts into
 * the unified `text[]` pattern list.
 */

function collectPatterns(spec: PatternSpec): string[] {
  const out: string[] = []
  if (spec.text) out.push(...spec.text)
  if (spec.prefix !== undefined) out.push(`${spec.prefix}*`)
  if (spec.suffix !== undefined) out.push(`*${spec.suffix}`)
  if (spec.contains !== undefined) out.push(`*${spec.contains}*`)
  return out
}

function resolveLengths(spec: PatternSpec): {
  min: number
  max: number
} {
  if (spec.length !== undefined) {
    return { min: spec.length, max: spec.length }
  }
  if (spec.lengthMin !== undefined || spec.lengthMax !== undefined) {
    return {
      min: spec.lengthMin ?? 1,
      max: spec.lengthMax ?? spec.lengthMin ?? 8,
    }
  }
  // Fall back to a tight default to avoid combinatorial blowup
  // when the caller forgets every length flag.
  return { min: 3, max: 5 }
}

/**
 * Yield every label of length `n` over `alphabet` whose
 * leading and trailing chars are not hyphens.
 */

function* enumerateLabels(
  n: number,
  alphabet: string,
): Generator<string> {
  if (n <= 0) return
  const indexes = new Array(n).fill(0)
  while (true) {
    const label = indexes.map(i => alphabet[i]).join('')
    if (
      label[0] !== '-' &&
      label[label.length - 1] !== '-'
    ) {
      yield label
    }
    let pos = n - 1
    while (pos >= 0) {
      indexes[pos]++
      if (indexes[pos] < alphabet.length) break
      indexes[pos] = 0
      pos--
    }
    if (pos < 0) return
  }
}

/**
 * Expand a pattern spec into a flat candidate FQDN list.
 *
 *   - With `text` / `prefix` / `suffix` / `contains`
 *     supplied, generate labels whose length falls in
 *     `[min, max]` and whose chars match a compiled
 *     regex per text pattern (union — ANY pattern).
 *   - With no patterns, generate every label in
 *     `[min, max]` over the alphabet (use sparingly).
 *   - Cross every label with every extension to produce
 *     the FQDN set.
 *   - Throw if the output would exceed `maxCandidates`.
 */

export function expandPatterns(input: ExpansionInput): ExpansionOutput {
  const max = input.maxCandidates ?? DEFAULT_MAX_CANDIDATES
  const alphabet = alphabetFor(input)
  const { min, max: lmax } = resolveLengths(input)
  const patterns = collectPatterns(input).map(patternToRegex)

  const labels = new Set<string>()
  for (let n = min; n <= lmax; n++) {
    for (const label of enumerateLabels(n, alphabet)) {
      if (patterns.length > 0) {
        if (!patterns.some(re => re.test(label))) continue
      }
      if (input.exclude && input.exclude.test(label)) continue
      labels.add(label)
      if (labels.size * input.extensions.length > max) {
        throw new Error(
          `scout domain: candidate count would exceed --max-candidates=${max}; ` +
            `tighten --length, --text, or pass --max-candidates`,
        )
      }
    }
  }

  const candidates: string[] = []
  for (const label of labels) {
    for (const tld of input.extensions) {
      candidates.push(`${label}.${tld}`)
    }
  }

  return { candidates, labelCount: labels.size }
}

export function parsePatternList(value: string | string[] | undefined): string[] {
  if (!value) return []
  const list = Array.isArray(value) ? value : [value]
  return list
    .flatMap(s => s.split(','))
    .map(s => s.trim())
    .filter(s => s.length > 0)
}
