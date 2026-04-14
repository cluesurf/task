/**
 * Shared parsers for `--pages` / `--order` / `--remove` flags.
 * Used by `task split`, `task extract`, and `task modify` so the
 * accepted spelling stays consistent.
 *
 * Page numbers are ALWAYS 1-based at the CLI surface; callers
 * convert to 0-based pdf-lib indices themselves.
 */

/**
 * Parse a page selector like `1-3,5,7-9` into a sorted, deduped
 * 1-based list. Throws when the spec is malformed.
 */
export function parsePageRanges(spec: string): number[] {
  const pages = new Set<number>()
  for (const chunk of spec.split(',')) {
    const trimmed = chunk.trim()
    if (!trimmed) continue
    const range = trimmed.match(/^(\d+)\s*-\s*(\d+)$/)
    if (range) {
      const lo = Number(range[1])
      const hi = Number(range[2])
      if (lo < 1 || hi < lo) {
        throw new Error(`Invalid page range "${trimmed}"`)
      }
      for (let p = lo; p <= hi; p++) pages.add(p)
      continue
    }
    const single = trimmed.match(/^(\d+)$/)
    if (single) {
      pages.add(Number(single[1]))
      continue
    }
    throw new Error(`Invalid page spec "${trimmed}" — use N or N-M`)
  }
  return [...pages].sort((a, b) => a - b)
}

/**
 * Parse a comma-separated list of page numbers in a SPECIFIC
 * order (no sorting, no dedup). Used for `--order 3,1,2`.
 */
export function parsePageList(spec: string): number[] {
  return spec.split(',').map(c => {
    const n = Number(c.trim())
    if (!Number.isInteger(n) || n < 1) {
      throw new Error(`Invalid page number "${c.trim()}"`)
    }
    return n
  })
}
