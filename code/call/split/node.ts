/**
 * `task split` (Node) — qpdf shell-out. The browser-safe
 * pdf-lib core (`./browser.ts`) is the alternative for the
 * browser bundle.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildQpdfExtractCommand } from './command'

export type SplitNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  pages: string
}

export type SplitNodeOutput = {
  file: { path: string }
  pages: string
}

export async function splitNode(
  source: SplitNodeInput,
): Promise<SplitNodeOutput> {
  const inputPath = source.input.file.path
  const outputPath =
    source.output?.file?.path ??
    inputPath.replace(/\.pdf$/i, '') + `.pages-${source.pages}.pdf`

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await runCommandSequence(
    buildQpdfExtractCommand({
      input: inputPath,
      output: outputPath,
      pages: source.pages,
    }),
  )

  return { file: { path: outputPath }, pages: source.pages }
}
