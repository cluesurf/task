import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvString } from '~/code/tool/shared/verb'

registerHelp({
  command: 'task remove password',
  describe: 'Strip a password from a PDF (qpdf --decrypt)',
  options: [
    {
      long: 'output',
      short: 'o',
      describe: 'Output path (default: <stem>.unlocked.pdf)',
    },
    {
      long: 'password',
      describe:
        'Current user password (skip for owner-only protection)',
    },
  ],
  examples: [
    {
      comment: 'owner-only',
      command: 'task remove password secure.pdf',
    },
    {
      comment: 'with user password',
      command:
        'task remove password secure.pdf --password hunter2 -o open.pdf',
    },
  ],
})

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('password', { type: 'string' })
}

async function handler(argv: Record<string, unknown>) {
  const { removePasswordNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  const password = argvString(argv.password)
  await runAction({
    action: 'remove',
    input: { file: filePath } as Record<string, unknown>,
    run: () =>
      removePasswordNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
        password,
      }),
  })
}

export const removePasswordConsole: CommandModule = {
  command: 'password <file>',
  describe: 'Strip a password from a PDF',
  builder,
  handler,
}
