/**
 * `task rotate secret <key>` — generate a fresh random value and
 * write it into a configured store. Today the dotenv store is the
 * only built-in backend; cloud stores (1Password, Doppler, AWS
 * Secrets Manager, Vault) plug in via `--store <name>` with a
 * matching driver under `code/call/rotate/secret/<store>/`.
 *
 * The new value is written atomically — read the file, replace
 * the matching `KEY=...` line in place, write to a temp file,
 * rename. If the key isn't already in the file we append it.
 *
 * Pass `--restart <cmd>` to fire a follow-up command after the
 * rotation succeeds; that's the place to bounce a service or
 * trigger a deploy hook. The hook only runs when the write
 * succeeds, so partial rotations don't leave services running
 * with stale credentials.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { spawnAndWait } from '~/code/tool/node/spawn'

export type RotateSecretFormat =
  | 'hex'
  | 'base64'
  | 'base64url'
  | 'alphanumeric'
  | 'urlsafe'

export type RotateSecretStore = 'dotenv'

export type RotateSecretNodeInput = {
  /** Environment / config key to rotate (e.g. `STRIPE_SECRET`). */
  key: string
  /** Number of random bytes generated before encoding. Default 32. */
  length?: number
  /** Encoding for the random bytes. Default `base64url`. */
  format?: RotateSecretFormat
  /** Backend store. Today only `dotenv`. */
  store?: RotateSecretStore
  /** Path to the .env file. Default `.env` in cwd. */
  storePath?: string
  /** Override the generated value (skip random, just rotate). */
  value?: string
  /** Suppress printing the new value to stdout. */
  quiet?: boolean
  /** Optional follow-up command (`['systemctl','restart','app']`). */
  restart?: string[]
}

export type RotateSecretNodeOutput = {
  key: string
  store: RotateSecretStore
  storePath: string
  /** Length in bytes of the random source (before encoding). */
  bytes: number
  /** The encoded value that was written. */
  value: string
}

async function rotateSecretNode(
  source: RotateSecretNodeInput,
): Promise<RotateSecretNodeOutput> {
  if (!source.key || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(source.key)) {
    throw new Error(
      `rotate secret: key "${source.key}" must be a valid env identifier`,
    )
  }
  const store: RotateSecretStore = source.store ?? 'dotenv'
  const length = source.length ?? 32
  const format: RotateSecretFormat = source.format ?? 'base64url'
  const value = source.value ?? generate(length, format)

  let storePath: string
  switch (store) {
    case 'dotenv': {
      storePath = path.resolve(source.storePath ?? '.env')
      await writeDotenvKey(storePath, source.key, value)
      break
    }
  }

  if (!source.quiet) {
    process.stdout.write(`${source.key}=${value}\n`)
  }

  if (source.restart && source.restart.length > 0) {
    const [bin, ...args] = source.restart
    if (!bin) throw new Error('rotate secret: --restart needs a command')
    await spawnAndWait({
      verb: 'rotate secret',
      bin,
      args,
      pipe: true,
    })
  }

  return { key: source.key, store, storePath, bytes: length, value }
}

function generate(length: number, format: RotateSecretFormat): string {
  if (length <= 0) {
    throw new Error('rotate secret: --length must be positive')
  }
  if (format === 'alphanumeric' || format === 'urlsafe') {
    const alphabet =
      format === 'alphanumeric'
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    const bytes = randomBytes(length)
    let out = ''
    for (let i = 0; i < length; i++) {
      out += alphabet[bytes[i]! % alphabet.length]
    }
    return out
  }
  return randomBytes(length).toString(format)
}

async function writeDotenvKey(
  filePath: string,
  key: string,
  value: string,
): Promise<void> {
  let body = ''
  try {
    body = await fs.readFile(filePath, 'utf8')
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
  }

  const line = `${key}=${quoteEnvValue(value)}`
  const lines = body.split('\n')
  let found = false
  const next: string[] = []
  for (const raw of lines) {
    const trimmed = raw.trimStart()
    const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(trimmed)
    if (m && m[1] === key) {
      next.push(line)
      found = true
      continue
    }
    next.push(raw)
  }
  if (!found) {
    if (next.length > 0 && next[next.length - 1] === '') next.pop()
    next.push(line)
    next.push('')
  }

  // Atomic-ish: write to a sibling temp file then rename.
  const tmp = `${filePath}.rotate-${process.pid}.tmp`
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(tmp, next.join('\n'))
  await fs.rename(tmp, filePath)
}

function quoteEnvValue(value: string): string {
  if (value === '') return '""'
  if (/[ \t"'\\$`#]/.test(value)) {
    return '"' + value.replace(/(["\\$`])/g, '\\$1') + '"'
  }
  return value
}

export default rotateSecretNode
export { rotateSecretNode }
