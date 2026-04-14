import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task disassemble dotnet',
  describe: '.NET assembly (dll / exe) → IL via ildasm',
  options: [
    { long: 'output',  short: 'o', describe: 'Output .il path (default: sibling)' },
    { long: 'bytes',               describe: 'Include raw instruction bytes' },
    { long: 'header',              describe: 'Include file header' },
    { long: 'tokens',              describe: 'Include metadata tokens' },
  ],
  examples: [
    { comment: 'basic',            command: 'task disassemble dotnet app.dll' },
    { comment: 'full dump',        command: 'task disassemble dotnet app.dll --bytes --header --tokens -o app.il' },
  ],
})

export const disassembleDotnetConsole: CommandModule = {
  command: 'dotnet <file>',
  describe: '.NET assembly → IL',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output', { alias: 'o', type: 'string' })
      .option('bytes',  { type: 'boolean' })
      .option('header', { type: 'boolean' })
      .option('tokens', { type: 'boolean' }),
  handler: async argv => {
    const { disassembleDotnetNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
      bytes: argv.bytes as boolean | undefined,
      header: argv.header as boolean | undefined,
      tokens: argv.tokens as boolean | undefined,
    }
    await runAction({
      action: 'disassemble',
      input: input as unknown as Record<string, unknown>,
      run: () => disassembleDotnetNode(input),
    })
  },
}
