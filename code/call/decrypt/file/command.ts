import path from 'node:path'

export type DecryptFileTool = 'age' | 'openssl' | 'gpg'

export function pickDecryptTool(inPath: string): DecryptFileTool {
  const ext = path.extname(inPath).toLowerCase()
  if (ext === '.age') return 'age'
  if (ext === '.gpg' || ext === '.asc' || ext === '.pgp') return 'gpg'
  if (ext === '.enc') return 'openssl'
  return 'age'
}

export function buildAgeDecryptCommand(input: {
  inputPath: string
  outputPath: string
  passphrase?: string
  identity?: string
}): { bin: 'age'; args: string[]; stdin?: string } {
  const args = ['-d']
  if (input.identity) args.push('-i', input.identity)
  args.push('-o', input.outputPath, input.inputPath)
  const stdin =
    input.passphrase && !input.identity
      ? `${input.passphrase}\n`
      : undefined
  return { bin: 'age', args, stdin }
}

export function buildOpensslDecryptCommand(input: {
  inputPath: string
  outputPath: string
  passphrase: string
  cipher?: string
}): { bin: 'openssl'; args: string[] } {
  return {
    bin: 'openssl',
    args: [
      'enc',
      '-d',
      input.cipher ?? 'aes-256-cbc',
      '-pbkdf2',
      '-in',
      input.inputPath,
      '-out',
      input.outputPath,
      '-pass',
      `pass:${input.passphrase}`,
    ],
  }
}

export function buildGpgDecryptCommand(input: {
  inputPath: string
  outputPath: string
  passphrase?: string
}): { bin: 'gpg'; args: string[] } {
  const args: string[] = ['--batch', '--yes', '-o', input.outputPath]
  if (input.passphrase) {
    args.push(
      '--passphrase',
      input.passphrase,
      '--pinentry-mode',
      'loopback',
    )
  }
  args.push('--decrypt', input.inputPath)
  return { bin: 'gpg', args }
}
