// Slides: markdown -> html / pdf / pptx via marp-cli.
// Reveal.js output is handled by convert/document/pandoc (`-t revealjs`);
// use marp when you want Marp's stricter author syntax + theming.

import { spawnAndWait } from '~/code/tool/node/spawn'
import { ensureParentDir } from '~/code/tool/node/file'
import { buildCommandToConvertDocumentWithMarp } from './command'

export type ConvertDocumentWithMarpNodeInput = {
  input: { path: string }
  output: { path: string; format?: 'html' | 'pdf' | 'pptx' | 'png' | 'jpeg' }
  /** Path to a Marp theme CSS file. */
  theme?: string
  /** Allow local HTML (inline tags). Required for some decks. */
  allowLocalFiles?: boolean
}

async function convertDocumentWithMarpNode(
  source: ConvertDocumentWithMarpNodeInput,
): Promise<void> {
  await ensureParentDir(source.output.path)
  const command = buildCommandToConvertDocumentWithMarp({
    inputPath: source.input.path,
    outputPath: source.output.path,
    format: source.output.format,
    theme: source.theme,
    allowLocalFiles: source.allowLocalFiles,
  })
  await spawnAndWait({
    verb: 'convert document',
    bin: command.bin,
    args: command.args,
  })
}

export default convertDocumentWithMarpNode
export { convertDocumentWithMarpNode }
