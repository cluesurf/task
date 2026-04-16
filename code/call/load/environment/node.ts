/**
 * `task load environment` — upsert a `KEY=VALUE` entry into a
 * `.env`-style file. Pure Node — no shell-out — because the
 * file format is too small to warrant invoking a third-party
 * tool.
 *
 * Inspired by `deck/etch/scripts/env/set.sh`. Same semantics:
 * create the file when missing, replace the existing line when
 * the key matches, append otherwise.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { ensureParentDir } from '~/code/tool/node/file'

export type LoadEnvironmentNodeInput = {
  key: string
  value: string
  file?: string
}

export type LoadEnvironmentNodeOutput = {
  file: string
  key: string
  action: 'created' | 'updated' | 'inserted'
}

async function loadEnvironmentNode(
  source: LoadEnvironmentNodeInput,
): Promise<LoadEnvironmentNodeOutput> {
  const file = path.resolve(source.file ?? '.env')
  const key = source.key
  const value = source.value
  const line = `${key}=${value}`

  let existing = ''
  let action: LoadEnvironmentNodeOutput['action'] = 'created'

  try {
    existing = await fs.readFile(file, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    await ensureParentDir(file)
  }

  const keyPattern = new RegExp(`^${escapeRegex(key)}=.*$`, 'm')
  let next: string

  if (existing && keyPattern.test(existing)) {
    next = existing.replace(keyPattern, line)
    action = 'updated'
  } else if (existing) {
    next = existing.replace(/\n?$/, '\n') + line + '\n'
    action = 'inserted'
  } else {
    next = line + '\n'
    action = 'created'
  }

  await fs.writeFile(file, next, 'utf8')

  return { file, key, action }
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default loadEnvironmentNode
export { loadEnvironmentNode }
