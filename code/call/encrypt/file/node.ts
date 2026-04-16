/**
 * Router for `task encrypt file <in> -o <out>`. Picks the backend
 * from `--tool` or the output extension:
 *
 *   .age                  → age (default for fresh encrypts)
 *   .gpg / .asc / .pgp    → gpg
 *   .enc                  → openssl
 *
 * age symmetric (passphrase) prompts on stdin; we pipe the
 * passphrase through. Every other path runs via the standard
 * `exec()` helper so `--explain` / tracing works.
 */

import path from 'node:path'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { exec } from '~/code/tool/node/process'

export type EncryptFileTool = 'age' | 'openssl' | 'gpg'

export type EncryptFileNodeInput = {
  input: { path: string }
  output: { path: string }
  tool?: EncryptFileTool
  passphrase?: string
  recipients?: string[]
  cipher?: string
  armor?: boolean
}

export async function encryptFileNode(
  source: EncryptFileNodeInput,
): Promise<void> {
  const tool = source.tool ?? pickTool(source.output.path)

  switch (tool) {
    case 'age': {
      const [bin, ...args] = buildAgeArgv(source)
      if (source.passphrase && !source.recipients?.length) {
        await spawnAndWait({
          verb: 'encrypt file',
          bin: bin!,
          args,
          stdin: `${source.passphrase}\n${source.passphrase}\n`,
          pipe: true,
        })
      } else {
        await exec([bin!, ...args])
      }
      return
    }
    case 'openssl':
      await exec(buildOpensslArgv(source))
      return
    case 'gpg':
      await exec(buildGpgArgv(source))
      return
  }
}

function pickTool(outPath: string): EncryptFileTool {
  const ext = path.extname(outPath).toLowerCase()
  if (ext === '.gpg' || ext === '.asc' || ext === '.pgp') return 'gpg'
  if (ext === '.enc') return 'openssl'
  return 'age'
}

function buildAgeArgv(input: EncryptFileNodeInput): string[] {
  const argv = ['age']
  if (input.recipients?.length) {
    for (const r of input.recipients) {
      // age1... bare public keys go to -r; paths go to -R (recipients file).
      argv.push(r.startsWith('age1') ? '-r' : '-R', r)
    }
  } else if (input.passphrase) {
    argv.push('-p')
  } else {
    throw new Error('age encrypt requires `passphrase` or `recipients`')
  }
  argv.push('-o', input.output.path, input.input.path)
  return argv
}

function buildOpensslArgv(input: EncryptFileNodeInput): string[] {
  if (!input.passphrase) {
    throw new Error(
      'openssl encrypt requires `passphrase` (asymmetric not supported for file-level)',
    )
  }
  return [
    'openssl',
    'enc',
    input.cipher ?? 'aes-256-cbc',
    '-salt',
    '-pbkdf2',
    '-in',
    input.input.path,
    '-out',
    input.output.path,
    '-pass',
    `pass:${input.passphrase}`,
  ]
}

function buildGpgArgv(input: EncryptFileNodeInput): string[] {
  const argv = ['gpg', '--batch', '--yes', '-o', input.output.path]
  if (input.armor) argv.push('--armor')
  if (input.recipients?.length) {
    argv.push('--trust-model', 'always')
    for (const r of input.recipients) argv.push('-r', r)
    argv.push('--encrypt')
  } else if (input.passphrase) {
    argv.push(
      '--passphrase',
      input.passphrase,
      '--pinentry-mode',
      'loopback',
      '--symmetric',
    )
  } else {
    throw new Error('gpg encrypt requires `passphrase` or `recipients`')
  }
  argv.push(input.input.path)
  return argv
}

