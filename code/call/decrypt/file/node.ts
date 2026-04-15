/**
 * Router for `task decrypt file <in> -o <out>`. Mirror of encrypt.
 */

import path from 'node:path'
import { spawn } from 'node:child_process'
import { exec } from '~/code/tool/node/process'

export type DecryptFileTool = 'age' | 'openssl' | 'gpg'

export type DecryptFileNodeInput = {
  input: { path: string }
  output: { path: string }
  tool?: DecryptFileTool
  passphrase?: string
  identity?: string
  cipher?: string
}

export async function decryptFileNode(
  source: DecryptFileNodeInput,
): Promise<void> {
  const tool = source.tool ?? pickTool(source.input.path)

  switch (tool) {
    case 'age': {
      const argv = buildAgeArgv(source)
      if (source.passphrase && !source.identity) {
        await runWithStdin(argv, `${source.passphrase}\n`)
      } else {
        await exec(argv)
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

function pickTool(inPath: string): DecryptFileTool {
  const ext = path.extname(inPath).toLowerCase()
  if (ext === '.age') return 'age'
  if (ext === '.gpg' || ext === '.asc' || ext === '.pgp') return 'gpg'
  if (ext === '.enc') return 'openssl'
  return 'age'
}

function buildAgeArgv(input: DecryptFileNodeInput): string[] {
  const argv = ['age', '-d']
  if (input.identity) argv.push('-i', input.identity)
  argv.push('-o', input.output.path, input.input.path)
  return argv
}

function buildOpensslArgv(input: DecryptFileNodeInput): string[] {
  if (!input.passphrase) {
    throw new Error(
      'openssl decrypt requires `passphrase` (asymmetric not supported for file-level)',
    )
  }
  return [
    'openssl',
    'enc',
    '-d',
    input.cipher ?? 'aes-256-cbc',
    '-pbkdf2',
    '-in',
    input.input.path,
    '-out',
    input.output.path,
    '-pass',
    `pass:${input.passphrase}`,
  ]
}

function buildGpgArgv(input: DecryptFileNodeInput): string[] {
  const argv = ['gpg', '--batch', '--yes', '-o', input.output.path]
  if (input.passphrase) {
    argv.push(
      '--passphrase',
      input.passphrase,
      '--pinentry-mode',
      'loopback',
    )
  }
  argv.push('--decrypt', input.input.path)
  return argv
}

function runWithStdin(argv: string[], input: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = argv
    const child = spawn(cmd!, args, { stdio: ['pipe', 'inherit', 'inherit'] })
    child.on('error', reject)
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`)),
    )
    child.stdin.end(input)
  })
}
