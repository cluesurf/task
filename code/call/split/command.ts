/**
 * Pure argv builder for `task split` on Node — qpdf extracts a
 * page subset. The CLI `--pages 1-3,5,7-9` spec passes through
 * verbatim because qpdf accepts the same syntax.
 *
 *   qpdf --empty --pages input.pdf 1-3,5,7-9 -- out.pdf
 */

export function buildCommandToSplit(input: {
  inputPath: string
  outputPath: string
  pages: string
}): { bin: 'qpdf'; args: string[] } {
  const args = [
    '--empty',
    '--pages',
    input.inputPath,
    input.pages,
    '--',
    input.outputPath,
  ]
  return { bin: 'qpdf', args }
}
