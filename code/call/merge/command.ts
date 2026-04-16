/**
 * Pure argv builder for `task merge` on Node -- qpdf assembles
 * the output. `qpdf --empty --pages a.pdf b.pdf -- out.pdf` is
 * the canonical recipe.
 */

export function buildCommandToMerge(input: {
  inputs: string[]
  outputPath: string
}): { bin: 'qpdf'; args: string[] } {
  const args = ['--empty', '--pages', ...input.inputs, '--', input.outputPath]
  return { bin: 'qpdf', args }
}
