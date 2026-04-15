// Slides: markdown → reveal.js HTML via pandoc.
// Standalone file so callers don't have to remember the pandoc flag
// dance, and so dispatch in convert/document can route `md → html`
// with `--tool revealjs` cleanly.

import { exec } from '~/code/tool/node/process'

export type ConvertDocumentWithRevealjsNodeInput = {
  input: { path: string }
  output: { path: string }
  /** Slide theme (black, white, league, beige, sky, night, serif,
   * simple, solarized, moon, dracula). */
  theme?: string
  /** Embed assets into a single self-contained file. */
  selfContained?: boolean
}

export async function convertDocumentWithRevealjsNode(
  source: ConvertDocumentWithRevealjsNodeInput,
): Promise<void> {
  const argv = [
    'pandoc',
    source.input.path,
    '-t',
    'revealjs',
    '-s',
    '-o',
    source.output.path,
  ]
  if (source.theme) argv.push('-V', `theme=${source.theme}`)
  if (source.selfContained) argv.push('--embed-resources')
  await exec(argv)
}
