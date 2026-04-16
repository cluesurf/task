import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { argvString } from '~/code/tool/shared/verb'

function builder(y: Argv) {
  return y
    .positional('input', {
      type: 'string',
      demandOption: true,
      describe: 'Encrypted input file',
    })
    .positional('output', {
      type: 'string',
      describe:
        'Output file path. Defaults to the input with the encryption suffix removed.',
    })
    .option('tool', {
      choices: ['age', 'openssl', 'gpg'] as const,
      describe: 'Backend. Defaults based on the input extension.',
    })
    .option('passphrase', {
      alias: 'p',
      type: 'string',
      describe: 'Symmetric passphrase.',
    })
    .option('identity', {
      alias: 'i',
      type: 'string',
      describe: 'Asymmetric identity (private-key file). age / gpg only.',
    })
    .option('cipher', {
      type: 'string',
      describe: 'openssl cipher used to encrypt (default: aes-256-cbc).',
    })
}

async function handler(argv: Record<string, unknown>) {
  const { decryptFileNode } = await import('./node')
  const inputPath = argvString(argv.input) ?? ''
  const inferred = inputPath.replace(
    /\.(age|gpg|asc|pgp|enc)$/i,
    '',
  )
  const outputPath = argvString(argv.output) ?? inferred
  if (outputPath === inputPath) {
    throw new Error(
      'Cannot infer output path from input. Pass an explicit [output].',
    )
  }
  const tool = argvString(argv.tool)
  const passphrase = argvString(argv.passphrase)
  const identity = argvString(argv.identity)
  const cipher = argvString(argv.cipher)
  await runAction({
    action: 'decrypt',
    input: { file: inputPath } as Record<string, unknown>,
    run: () =>
      decryptFileNode({
        handle: 'internal' as const,
        input: { file: { path: inputPath } },
        output: { file: { path: outputPath } },
        tool,
        passphrase,
        identity,
        cipher,
      }),
  })
}

export const decryptFileConsole: CommandModule = {
  command: 'file <input> [output]',
  describe:
    'Decrypt a file with age / openssl / gpg (symmetric or asymmetric)',
  builder,
  handler,
}
