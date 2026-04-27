/**
 * `task check secret` — list every key in a secret store with
 * the expiry / TTL / last-rotated info each backend exposes.
 *
 * Today's only built-in backend is `dotenv`. Cloud stores (AWS
 * Secrets Manager, 1Password, Doppler, Vault) plug in via
 * `--store <name>` once their drivers land at
 * `code/call/check/secret/<store>/`.
 *
 * For dotenv, "last rotated" is approximated by the file's
 * mtime — there's no per-key timestamp on disk. Cloud backends
 * give a real per-key value.
 */

import fs from 'node:fs/promises'
import path from 'node:path'

export type CheckSecretStore = 'dotenv'

export type CheckSecretNodeInput = {
  /** Backend store. Today only `dotenv`. */
  store?: CheckSecretStore
  /** Path to the store file. Default `./.env`. */
  storePath?: string
  /** Hide the actual values (default true) — show length only. */
  redact?: boolean
}

export type CheckSecretEntry = {
  key: string
  /** Length of the stored value in bytes, or `undefined` if absent. */
  length?: number
  /** Last-set timestamp the backend can offer (ISO 8601). */
  lastSet?: string
  /** Free-form expiry / TTL hint when the backend has one. */
  expiry?: string
  /** Plain value — only present when `redact: false`. */
  value?: string
}

export type CheckSecretNodeOutput = {
  store: CheckSecretStore
  storePath: string
  entries: CheckSecretEntry[]
}

async function checkSecretNode(
  source: CheckSecretNodeInput,
): Promise<CheckSecretNodeOutput> {
  const store: CheckSecretStore = source.store ?? 'dotenv'
  const redact = source.redact !== false
  switch (store) {
    case 'dotenv': {
      const storePath = path.resolve(source.storePath ?? '.env')
      const entries = await readDotenv(storePath, redact)
      return { store, storePath, entries }
    }
  }
}

async function readDotenv(
  filePath: string,
  redact: boolean,
): Promise<CheckSecretEntry[]> {
  let body: string
  let stat: { mtime: Date } | undefined
  try {
    body = await fs.readFile(filePath, 'utf8')
    stat = await fs.stat(filePath)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw err
  }

  const lastSet = stat?.mtime.toISOString()
  const entries: CheckSecretEntry[] = []
  for (const raw of body.split('\n')) {
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(trimmed)
    if (!m) continue
    const key = m[1]!
    const value = unquoteEnvValue(m[2]!)
    const e: CheckSecretEntry = {
      key,
      length: Buffer.byteLength(value, 'utf8'),
      lastSet,
    }
    if (!redact) e.value = value
    entries.push(e)
  }
  return entries
}

function unquoteEnvValue(value: string): string {
  if (value.length >= 2) {
    const first = value[0]
    const last = value[value.length - 1]
    if (
      (first === '"' && last === '"') ||
      (first === "'" && last === "'")
    ) {
      const inner = value.slice(1, -1)
      if (first === '"') {
        return inner.replace(/\\(["\\$`])/g, '$1')
      }
      return inner
    }
  }
  return value
}

export default checkSecretNode
export { checkSecretNode }
