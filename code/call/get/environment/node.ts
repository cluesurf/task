/**
 * `task get environment <NAME>` — read a variable either from the
 * live process environment (Windows / macOS / Linux — all use
 * `process.env`) or from a specified .env file. Pure Node, no
 * shell-out.
 */

import fs from 'node:fs/promises'
import { getLoggingStyle } from '~/code/tool/node/log'

export type GetEnvironmentNodeInput = {
  name: string
  file?: string
}

export type GetEnvironmentNodeOutput = {
  name: string
  value: string | null
  source: 'process' | 'file'
}

async function getEnvironmentNode(
  input: GetEnvironmentNodeInput,
): Promise<GetEnvironmentNodeOutput> {
  let value: string | null = null
  let source: 'process' | 'file' = 'process'

  if (input.file) {
    source = 'file'
    value = await readFromEnvFile(input.file, input.name)
  } else {
    value = process.env[input.name] ?? null
  }

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write((value ?? '') + '\n')
  }
  return { name: input.name, value, source }
}

async function readFromEnvFile(
  file: string,
  name: string,
): Promise<string | null> {
  let text: string
  try {
    text = await fs.readFile(file, 'utf8')
  } catch {
    throw new Error(`get environment: ${file} not found`)
  }
  // Minimal .env parser — enough for KEY=VALUE lines with optional
  // quotes. Full dotenv semantics (interpolation, multiline) aren't
  // worth the complexity for a read.
  for (const line of text.split('\n')) {
    const match = line.match(/^\s*([A-Za-z_][\w]*)\s*=\s*(.*)\s*$/)
    if (!match || match[1] !== name) continue
    let value = match[2]!
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    return value
  }
  return null
}

export default getEnvironmentNode
export { getEnvironmentNode }
