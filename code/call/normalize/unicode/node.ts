import fs from 'node:fs/promises'
import path from 'node:path'
import { normalizeUnicode } from '~/code/tool/node/unicode/base'

export type NormalizeUnicodeNodeInput = {
  file: string
  form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'
  output?: string
}

export async function normalizeUnicodeNode(input: NormalizeUnicodeNodeInput) {
  const text = await fs.readFile(input.file, 'utf8')
  const normalized = normalizeUnicode(text, input.form)
  const outputPath = input.output ?? input.file
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, normalized, 'utf8')
  return { file: { path: outputPath }, form: input.form }
}
