/**
 * Pure argv builders for `task modify pdf` on Node. qpdf does
 * the rewrite. `--order 3,1,2` becomes `--pages input 3,1,2`.
 * `--remove 2,5` becomes the complement spec computed from the
 * input's page count.
 */

export function buildQpdfReorderCommand({
  input,
  output,
  spec,
}: {
  input: string
  output: string
  /** Comma-separated 1-based page indices, in target order. */
  spec: string
}): { bin: 'qpdf'; args: string[] } {
  return {
    bin: 'qpdf',
    args: ['--empty', '--pages', input, spec, '--', output],
  }
}

export function buildPdfinfoCommand(
  input: string,
): { bin: 'pdfinfo'; args: string[] } {
  return {
    bin: 'pdfinfo',
    args: [input],
  }
}

/**
 * Build the `--pages` selector for the inverse of `drop`:
 *   pages 1..total minus the dropped set, in original order.
 */
export function complementSpec(total: number, drop: Set<number>): string {
  const out: string[] = []
  let runStart: number | null = null
  let prev: number | null = null

  const flush = () => {
    if (runStart === null) return
    if (prev === null || prev === runStart) {
      out.push(String(runStart))
    } else {
      out.push(`${runStart}-${prev}`)
    }
    runStart = null
    prev = null
  }

  for (let p = 1; p <= total; p++) {
    if (drop.has(p)) {
      flush()
      continue
    }
    if (runStart === null) {
      runStart = p
      prev = p
    } else {
      prev = p
    }
  }
  flush()
  return out.join(',')
}
