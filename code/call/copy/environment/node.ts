/**
 * `task copy environment <NAME>` — reads the env var, then pipes
 * the value into the platform clipboard tool. Direct read (vs
 * delegating to `get environment`) so the value never echoes to
 * stdout before landing on the clipboard.
 */

import fs from 'node:fs/promises'
import { copyToClipboard } from '~/code/tool/node/clipboard'
import { getLoggingStyle } from '~/code/tool/node/log'

export type CopyEnvironmentNodeInput = {
  name: string
  file?: string
}

export async function copyEnvironmentNode(
  input: CopyEnvironmentNodeInput,
) {
  const value = input.file
    ? await readFromEnvFile({ file: input.file, name: input.name })
    : (process.env[input.name] ?? null)
  if (value === null) {
    throw new Error(
      `copy environment: \`${input.name}\` is not set`,
    )
  }

  await copyToClipboard({ verb: 'copy environment', value })

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(`copied ${input.name} to clipboard\n`)
  }
  return { name: input.name, bytes: value.length }
}

async function readFromEnvFile(input: {
  file: string
  name: string
}): Promise<string | null> {
  let text: string
  try {
    text = await fs.readFile(input.file, 'utf8')
  } catch {
    throw new Error(
      `copy environment: ${input.file} not found`,
    )
  }
  for (const line of text.split('\n')) {
    const match = line.match(
      /^\s*([A-Za-z_][\w]*)\s*=\s*(.*)\s*$/,
    )
    if (!match || match[1] !== input.name) continue
    let v = match[2]!
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    return v
  }
  return null
}
