/**
 * Pure argv builder for `task split` on Node — qpdf extracts a
 * page subset. The CLI `--pages 1-3,5,7-9` spec passes through
 * verbatim because qpdf accepts the same syntax.
 *
 *   qpdf --empty --pages input.pdf 1-3,5,7-9 -- out.pdf
 */

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildQpdfExtractCommand({
  input,
  output,
  pages,
}: {
  input: string
  output: string
  pages: string
}) {
  const cmd = getCommand('qpdf')
  cmd.link.push('--empty', '--pages', input, pages, '--', output)
  return buildCommandSequence(cmd)
}
