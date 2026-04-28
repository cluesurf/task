/**
 * OS-native trust-store helpers shared by `task issue tls`,
 * `task trust tls`, `task untrust tls`, and `task rotate tls`.
 *
 *   macOS  — `security` against `/Library/Keychains/System.keychain`
 *   Linux  — copy into `/usr/local/share/ca-certificates/` then
 *            `update-ca-certificates`
 *   Windows — `certutil -addstore ROOT` / `-delstore ROOT`
 *
 * Every mutate path requires elevated privileges. We don't try
 * to spawn `sudo` ourselves — let the caller wrap the verb with
 * `sudo task ...` when they need privilege escalation, so the
 * password prompt happens in the user's own terminal session
 * instead of mid-spawn.
 */

import os from 'node:os'
import path from 'node:path'
import { spawnAndWait } from './spawn'

export type TrustPlatform = 'darwin' | 'linux' | 'win32'

export function detectPlatform(): TrustPlatform {
  const p = os.platform()
  if (p === 'darwin' || p === 'linux' || p === 'win32') return p
  throw new Error(`trust-store: unsupported platform ${p}`)
}

export type TrustInstallInput = {
  /** Path to the CA cert file (PEM on macOS / Linux, PEM or DER on Windows). */
  caPath: string
  /**
   * Friendly name written into the trust store. Used as the
   * filename on Linux (`<name>.crt`) and surfaced in keychain
   * listings on macOS.
   */
  name?: string
}

export async function installTrustedCa(
  input: TrustInstallInput,
): Promise<void> {
  const platform = detectPlatform()
  switch (platform) {
    case 'darwin':
      await spawnAndWait({
        verb: 'trust tls',
        bin: 'security',
        args: [
          'add-trusted-cert',
          '-d',
          '-r', 'trustRoot',
          '-k', '/Library/Keychains/System.keychain',
          input.caPath,
        ],
        pipe: true,
      })
      return
    case 'linux': {
      const fs = await import('node:fs/promises')
      const dest = path.join(
        '/usr/local/share/ca-certificates',
        `${input.name ?? path.basename(input.caPath, path.extname(input.caPath))}.crt`,
      )
      await fs.copyFile(input.caPath, dest)
      await spawnAndWait({
        verb: 'trust tls',
        bin: 'update-ca-certificates',
        args: [],
        pipe: true,
      })
      return
    }
    case 'win32':
      await spawnAndWait({
        verb: 'trust tls',
        bin: 'certutil',
        args: ['-addstore', 'ROOT', input.caPath],
        pipe: true,
      })
      return
  }
}

export type TrustUninstallInput = {
  /** SHA-1 fingerprint of the cert to remove (uppercase hex). */
  sha1: string
  /** Optional friendly name (Linux only — used to find the file). */
  name?: string
}

export async function uninstallTrustedCa(
  input: TrustUninstallInput,
): Promise<void> {
  const platform = detectPlatform()
  switch (platform) {
    case 'darwin':
      await spawnAndWait({
        verb: 'untrust tls',
        bin: 'security',
        args: [
          'delete-certificate',
          '-Z', input.sha1,
          '/Library/Keychains/System.keychain',
        ],
        pipe: true,
      })
      return
    case 'linux': {
      if (!input.name) {
        throw new Error(
          'untrust tls (linux): provide --name <ca-name> to locate the file',
        )
      }
      const fs = await import('node:fs/promises')
      const target = path.join(
        '/usr/local/share/ca-certificates',
        `${input.name}.crt`,
      )
      await fs.rm(target, { force: true })
      await spawnAndWait({
        verb: 'untrust tls',
        bin: 'update-ca-certificates',
        args: ['--fresh'],
        pipe: true,
      })
      return
    }
    case 'win32':
      await spawnAndWait({
        verb: 'untrust tls',
        bin: 'certutil',
        args: ['-delstore', 'ROOT', input.sha1],
        pipe: true,
      })
      return
  }
}
