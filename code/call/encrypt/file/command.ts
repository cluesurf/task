import path from 'node:path'

export type EncryptFileTool = 'age' | 'openssl' | 'gpg'

export function pickEncryptTool(outPath: string): EncryptFileTool {
  const ext = path.extname(outPath).toLowerCase()
  if (ext === '.gpg' || ext === '.asc' || ext === '.pgp') return 'gpg'
  if (ext === '.enc') return 'openssl'
  return 'age'
}

export function buildAgeEncryptCommand(input: {
  inputPath: string
  outputPath: string
  passphrase?: string
  recipients?: string[]
}): { bin: 'age'; args: string[]; stdin?: string } {
  const args: string[] = []
  if (input.recipients?.length) {
    for (const r of input.recipients) {
      args.push(r.startsWith('age1') ? '-r' : '-R', r)
    }
  } else if (input.passphrase) {
    args.push('-p')
  } else {
    throw new Error('age encrypt requires `passphrase` or `recipients`')
  }
  args.push('-o', input.outputPath, input.inputPath)
  const stdin =
    input.passphrase && !input.recipients?.length
      ? `${input.passphrase}\n${input.passphrase}\n`
      : undefined
  return { bin: 'age', args, stdin }
}

export function buildOpensslEncryptCommand(input: {
  inputPath: string
  outputPath: string
  passphrase: string
  cipher?: string
}): { bin: 'openssl'; args: string[] } {
  return {
    bin: 'openssl',
    args: [
      'enc',
      input.cipher ?? 'aes-256-cbc',
      '-salt',
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

export function buildGpgEncryptCommand(input: {
  inputPath: string
  outputPath: string
  passphrase?: string
  recipients?: string[]
  armor?: boolean
}): { bin: 'gpg'; args: string[] } {
  const args: string[] = ['--batch', '--yes', '-o', input.outputPath]
  if (input.armor) args.push('--armor')
  if (input.recipients?.length) {
    args.push('--trust-model', 'always')
    for (const r of input.recipients) args.push('-r', r)
    args.push('--encrypt')
  } else if (input.passphrase) {
    args.push(
      '--passphrase',
      input.passphrase,
      '--pinentry-mode',
      'loopback',
      '--symmetric',
    )
  } else {
    throw new Error('gpg encrypt requires `passphrase` or `recipients`')
  }
  args.push(input.inputPath)
  return { bin: 'gpg', args }
}
