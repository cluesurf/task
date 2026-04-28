/**
 * `task rotate tls --ca local` — rotate the local mkcert CA,
 * reissue every host cert that depends on it, and clean stale
 * CAs out of the trust store. Used after the "I forgot which
 * CA my browser trusts" reset.
 *
 * Sequence (all idempotent):
 *   1. `mkcert -uninstall` — remove the current CA from the
 *      trust store and from NSS DBs (Firefox, Chromium).
 *   2. Delete `mkcert -CAROOT` so the next install mints fresh.
 *   3. `mkcert -install` — generate + install a new CA.
 *   4. For every host in `--reissue`, run `mkcert <host>`.
 */

import fs from 'node:fs/promises'
import { spawnAndWait } from '~/code/tool/node/spawn'

export type RotateTlsNodeInput = {
  /** `local` is the only backend today (mkcert). */
  ca?: 'local'
  /** Hosts to reissue after the CA rotation. */
  reissue?: string[]
}

export type RotateTlsNodeOutput = {
  ca: 'local'
  reissued: string[]
}

async function rotateTlsNode(
  source: RotateTlsNodeInput,
): Promise<RotateTlsNodeOutput> {
  const ca = source.ca ?? 'local'
  if (ca !== 'local') {
    throw new Error(`rotate tls: unsupported ca "${ca}"`)
  }

  // 1. Tear down the existing CA + trust-store entries.
  await spawnAndWait({
    verb: 'rotate tls',
    bin: 'mkcert',
    args: ['-uninstall'],
    pipe: true,
  })

  // 2. Wipe the CA root dir so a fresh install mints new keys.
  const caRoot = await readMkcertCARoot()
  if (caRoot) {
    await fs.rm(caRoot, { recursive: true, force: true })
  }

  // 3. Generate + install the new CA.
  await spawnAndWait({
    verb: 'rotate tls',
    bin: 'mkcert',
    args: ['-install'],
    pipe: true,
  })

  // 4. Reissue every host the caller cares about.
  const reissued: string[] = []
  for (const host of source.reissue ?? []) {
    await spawnAndWait({
      verb: 'rotate tls',
      bin: 'mkcert',
      args: [host],
      pipe: true,
    })
    reissued.push(host)
  }

  return { ca, reissued }
}

async function readMkcertCARoot(): Promise<string | undefined> {
  return new Promise(resolve => {
    const { spawn } = require('node:child_process') as typeof import('node:child_process')
    const child = spawn('mkcert', ['-CAROOT'])
    let out = ''
    child.stdout?.on('data', (d: Buffer) => { out += d.toString('utf8') })
    child.on('error', () => resolve(undefined))
    child.on('close', code =>
      resolve(code === 0 ? out.trim() || undefined : undefined),
    )
  })
}

export default rotateTlsNode
export { rotateTlsNode }
