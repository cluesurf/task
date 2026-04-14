/**
 * Pure argv builder for `task merge` on Node — qpdf assembles
 * the output. `qpdf --empty --pages a.pdf b.pdf -- out.pdf` is
 * the canonical recipe.
 */

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildQpdfMergeCommand({
  inputs,
  output,
}: {
  inputs: string[]
  output: string
}) {
  const cmd = getCommand('qpdf')
  cmd.link.push('--empty', '--pages', ...inputs, '--', output)
  return buildCommandSequence(cmd)
}
