import fs from 'node:fs/promises'
import path from 'node:path'
import { stripInvisible } from '~/code/tool/node/unicode/base'
import { ensureParentDir } from '~/code/tool/node/file'

export type RemoveInvisibleNodeInput = {
  file: string
  output?: string
}

export async function removeInvisibleNode(input: RemoveInvisibleNodeInput) {
  const text = await fs.readFile(input.file, 'utf8')
  const cleaned = stripInvisible(text)
  const outputPath = input.output ?? input.file
  await ensureParentDir(outputPath)
  await fs.writeFile(outputPath, cleaned, 'utf8')
  return {
    file: { path: outputPath },
    removed: Array.from(text).length - Array.from(cleaned).length,
  }
}
