/**
 * ssh-key operations: generate, read, push, remove. Files live
 * under `~/.ssh/<name>` and `~/.ssh/<name>.pub` by convention —
 * `ssh-keygen -f <path>` writes both.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { exec } from '~/code/tool/node/process'

export const SSH_DIR = path.join(os.homedir(), '.ssh')

export function keyPathFor(name: string): {
  priv: string
  pub: string
} {
  const priv = path.join(SSH_DIR, name)
  return { priv, pub: priv + '.pub' }
}

export async function keyExists(name: string): Promise<boolean> {
  const { priv } = keyPathFor(name)
  try {
    await fs.access(priv)
    return true
  } catch {
    return false
  }
}

export type GenerateKeyOptions = {
  name: string
  type?: string // ed25519 (default) / rsa / ecdsa
  bits?: number
  comment?: string
  passphrase?: string // empty string = no passphrase
  force?: boolean
}

export async function generateKey(opts: GenerateKeyOptions): Promise<{
  priv: string
  pub: string
}> {
  const { priv, pub } = keyPathFor(opts.name)
  const mkdirOpts: { recursive: true; mode?: number } = { recursive: true }
  if (process.platform !== 'win32') mkdirOpts.mode = 0o700
  await fs.mkdir(SSH_DIR, mkdirOpts)

  if (await keyExists(opts.name)) {
    if (!opts.force) {
      throw new Error(
        `make ssh-key: \`${opts.name}\` already exists. Pass --force to overwrite.`,
      )
    }
    await fs.rm(priv, { force: true })
    await fs.rm(pub, { force: true })
  }

  const args = [
    '-t',
    opts.type ?? 'ed25519',
    '-f',
    priv,
    '-N',
    opts.passphrase ?? '',
  ]
  if (opts.comment) args.push('-C', opts.comment)
  if (opts.bits) args.push('-b', String(opts.bits))

  await exec(['ssh-keygen', ...args])
  return { priv, pub }
}

export async function readPublicKey(name: string): Promise<string> {
  const { pub } = keyPathFor(name)
  try {
    return (await fs.readFile(pub, 'utf8')).trim()
  } catch {
    throw new Error(`ssh-key \`${name}\` does not exist at ${pub}`)
  }
}

export async function pushKey(name: string, host: string): Promise<void> {
  const { pub } = keyPathFor(name)
  let pubContents: string
  try {
    pubContents = await fs.readFile(pub, 'utf8')
  } catch {
    throw new Error(`push ssh-key: \`${name}\` does not exist at ${pub}`)
  }

  // `ssh-copy-id` exists on macOS / Linux but not on Windows.
  // On Windows we fall back to: ssh <host> 'cat >> ~/.ssh/authorized_keys'
  // with the .pub piped over stdin. Works anywhere OpenSSH is
  // installed on both ends.
  if (process.platform !== 'win32') {
    try {
      await exec(['ssh-copy-id', '-i', pub, host])
      return
    } catch (error) {
      // fall through to the manual approach if ssh-copy-id isn't
      // installed (some minimal linux distros don't include it).
      const msg = error instanceof Error ? error.message : String(error)
      if (!/not found|ENOENT/i.test(msg)) throw error
    }
  }
  await manualPush(host, pubContents)
}

async function manualPush(host: string, pubContents: string): Promise<void> {
  const { spawn } = await import('node:child_process')
  await new Promise<void>((resolve, reject) => {
    const child = spawn(
      'ssh',
      [
        host,
        'mkdir -p ~/.ssh && chmod 700 ~/.ssh && ' +
          'cat >> ~/.ssh/authorized_keys && ' +
          'chmod 600 ~/.ssh/authorized_keys',
      ],
      { stdio: ['pipe', 'inherit', 'inherit'] },
    )
    child.on('error', reject)
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`ssh exited with code ${code}`)),
    )
    child.stdin!.end(pubContents)
  })
}

export async function removeKey(name: string): Promise<void> {
  const { priv, pub } = keyPathFor(name)
  let found = false
  try {
    await fs.rm(priv)
    found = true
  } catch {}
  try {
    await fs.rm(pub)
    found = true
  } catch {}
  if (!found) {
    throw new Error(`remove ssh-key: \`${name}\` does not exist`)
  }
}
