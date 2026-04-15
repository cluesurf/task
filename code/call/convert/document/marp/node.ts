// Slides: markdown → html / pdf / pptx via marp-cli.
// Reveal.js output is handled by convert/document/pandoc (`-t revealjs`);
// use marp when you want Marp's stricter author syntax + theming.

import { exec } from '~/code/tool/node/process'

export type ConvertDocumentWithMarpNodeInput = {
  input: { path: string }
  output: { path: string; format?: 'html' | 'pdf' | 'pptx' | 'png' | 'jpeg' }
  /** Path to a Marp theme CSS file. */
  theme?: string
  /** Allow local HTML (inline tags). Required for some decks. */
  allowLocalFiles?: boolean
}

export async function convertDocumentWithMarpNode(
  source: ConvertDocumentWithMarpNodeInput,
): Promise<void> {
  const argv = ['marp', source.input.path, '-o', source.output.path]
  if (source.output.format) argv.push(`--${source.output.format}`)
  if (source.theme) argv.push('--theme', source.theme)
  if (source.allowLocalFiles) argv.push('--allow-local-files')
  await exec(argv)
}
