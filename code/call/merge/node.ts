/**
 * `task merge` (Node) — qpdf shell-out. The browser-safe
 * pdf-lib core (`./browser.ts`) is the alternative for the
 * browser bundle.
 *
 *   qpdf --empty --pages a.pdf b.pdf -- out.pdf
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildQpdfMergeCommand } from './command'

export type MergeNodeInput = {
  inputs: string[]
  output: { file: { path: string } }
}

export type MergeNodeOutput = {
  file: { path: string }
  inputs: string[]
}

export async function mergeNode(
  source: MergeNodeInput,
): Promise<MergeNodeOutput> {
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await runCommandSequence(
    buildQpdfMergeCommand({ inputs: source.inputs, output: outputPath }),
  )
  return { file: { path: outputPath }, inputs: source.inputs }
}
