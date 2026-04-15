import type { CommandModule } from 'yargs'

export const encryptFileConsole: CommandModule = {
  command: 'file <input> [output]',
  describe:
    'Encrypt a file with age / openssl / gpg (symmetric or asymmetric)',
  builder: y =>
    y
      .positional('input', {
        type: 'string',
        demandOption: true,
        describe: 'Input file path (or `-` for stdin)',
      })
      .positional('output', {
        type: 'string',
        describe: 'Output file path. Defaults to <input>.age',
      })
      .option('tool', {
        choices: ['age', 'openssl', 'gpg'] as const,
        describe: 'Backend. Defaults based on the output extension.',
      })
      .option('passphrase', {
        alias: 'p',
        type: 'string',
        describe: 'Symmetric passphrase.',
      })
      .option('recipient', {
        alias: 'R',
        type: 'string',
        array: true,
        describe:
          'Asymmetric recipient. Inline public key or key-file path. Repeatable.',
      })
      .option('cipher', {
        type: 'string',
        describe: 'openssl cipher (default: aes-256-cbc).',
      })
      .option('armor', {
        type: 'boolean',
        describe: 'gpg: ASCII-armored output (.asc).',
      }),
  handler: async argv => {
    const { encryptFileNode } = await import('./node')
    const input = argv.input as string
    const output = (argv.output as string | undefined) ?? `${input}.age`
    await encryptFileNode({
      input: { path: input },
      output: { path: output },
      tool: argv.tool as 'age' | 'openssl' | 'gpg' | undefined,
      passphrase: argv.passphrase as string | undefined,
      recipients: argv.recipient as string[] | undefined,
      cipher: argv.cipher as string | undefined,
      armor: argv.armor as boolean | undefined,
    })
  },
}
