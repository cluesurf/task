import type { CommandModule } from 'yargs'
import path from 'node:path'

export const decryptFileConsole: CommandModule = {
  command: 'file <input> [output]',
  describe:
    'Decrypt a file with age / openssl / gpg (symmetric or asymmetric)',
  builder: y =>
    y
      .positional('input', {
        type: 'string',
        demandOption: true,
        describe: 'Encrypted input file (or `-` for stdin)',
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
        describe:
          'Asymmetric identity (private-key file). age / gpg only.',
      })
      .option('cipher', {
        type: 'string',
        describe: 'openssl cipher used to encrypt (default: aes-256-cbc).',
      }),
  handler: async argv => {
    const { decryptFileNode } = await import('./node')
    const input = argv.input as string
    const inferred = input.replace(/\.(age|gpg|asc|pgp|enc)$/i, '')
    const output = (argv.output as string | undefined) ?? inferred
    if (output === input) {
      throw new Error(
        'Cannot infer output path from input. Pass an explicit [output].',
      )
    }
    await decryptFileNode({
      input: { path: input },
      output: { path: output },
      tool: argv.tool as 'age' | 'openssl' | 'gpg' | undefined,
      passphrase: argv.passphrase as string | undefined,
      identity: argv.identity as string | undefined,
      cipher: argv.cipher as string | undefined,
    })
  },
}
