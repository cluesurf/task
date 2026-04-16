import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import {
  argvBool,
  argvString,
  argvStringArray,
} from '~/code/tool/shared/verb'

function builder(y: Argv) {
  return y
    .positional('input', {
      type: 'string',
      demandOption: true,
      describe: 'Input file path',
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
      describe: 'Asymmetric recipient (repeatable).',
    })
    .option('cipher', {
      type: 'string',
      describe: 'openssl cipher (default: aes-256-cbc).',
    })
    .option('armor', {
      type: 'boolean',
      describe: 'gpg: ASCII-armored output (.asc).',
    })
}

async function handler(argv: Record<string, unknown>) {
  const { encryptFileNode } = await import('./node')
  const inputPath = argvString(argv.input) ?? ''
  const outputPath = argvString(argv.output) ?? `${inputPath}.age`
  const tool = argvString(argv.tool)
  const passphrase = argvString(argv.passphrase)
  const recipients = argvStringArray(argv.recipient)
  const cipher = argvString(argv.cipher)
  const armor = argvBool(argv.armor)
  await runAction({
    action: 'encrypt',
    input: { file: inputPath } as Record<string, unknown>,
    run: () =>
      encryptFileNode({
        handle: 'internal' as const,
        input: { file: { path: inputPath } },
        output: { file: { path: outputPath } },
        tool,
        passphrase,
        recipients,
        cipher,
        armor,
      }),
  })
}

export const encryptFileConsole: CommandModule = {
  command: 'file <input> [output]',
  describe:
    'Encrypt a file with age / openssl / gpg (symmetric or asymmetric)',
  builder,
  handler,
}
