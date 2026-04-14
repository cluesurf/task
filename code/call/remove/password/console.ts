import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task remove password',
  describe: 'Strip a password from a PDF (qpdf --decrypt)',
  options: [
    { long: 'output',   short: 'o', describe: 'Output path (default: <stem>.unlocked.pdf)' },
    { long: 'password',             describe: 'Current user password (skip for owner-only protection)' },
  ],
  examples: [
    { comment: 'owner-only', command: 'task remove password secure.pdf' },
    { comment: 'with user password', command: 'task remove password secure.pdf --password hunter2 -o open.pdf' },
  ],
})

export const removePasswordConsole: CommandModule = {
  command: 'password <file>',
  describe: 'Strip a password from a PDF',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output',   { alias: 'o', type: 'string' })
      .option('password', { type: 'string' }),
  handler: async argv => {
    const { removePasswordNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
      password: argv.password as string | undefined,
    }
    await runAction({
      action: 'remove',
      input: input as unknown as Record<string, unknown>,
      run: () => removePasswordNode(input),
    })
  },
}
