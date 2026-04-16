import fs from 'node:fs/promises'
import path from 'node:path'
import { normalizeUnicode } from '~/code/tool/node/unicode/base'
import { ensureParentDir } from '~/code/tool/node/file'

export type NormalizeUnicodeNodeInput = {
  file: string
  form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'
  output?: string
}

async function normalizeUnicodeNode(input: NormalizeUnicodeNodeInput) {
  const text = await fs.readFile(input.file, 'utf8')
  const normalized = normalizeUnicode(text, input.form)
  const outputPath = input.output ?? input.file
  await ensureParentDir(outputPath)
  await fs.writeFile(outputPath, normalized, 'utf8')
  return { file: { path: outputPath }, form: input.form }
}

export default normalizeUnicodeNode
export { normalizeUnicodeNode }
