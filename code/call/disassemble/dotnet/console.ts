import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvBool, argvString } from '~/code/tool/shared/verb'

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

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('bytes',  { type: 'boolean' })
    .option('header', { type: 'boolean' })
    .option('tokens', { type: 'boolean' })
}

async function handler(argv: Record<string, unknown>) {
  const { disassembleDotnetNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  const bytes = argvBool(argv.bytes)
  const header = argvBool(argv.header)
  const tokens = argvBool(argv.tokens)
  await runAction({
    action: 'disassemble',
    input: { file: filePath } as Record<string, unknown>,
    run: () =>
      disassembleDotnetNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
        bytes,
        header,
        tokens,
      }),
  })
}

export const disassembleDotnetConsole: CommandModule = {
  command: 'dotnet <file>',
  describe: '.NET assembly → IL',
  builder,
  handler,
}
