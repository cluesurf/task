import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvBool, argvString } from '~/code/tool/shared/verb'

registerHelp({
  command: 'task disassemble wasm',
  describe: 'WebAssembly binary → text format (wat) via wasm2wat',
  options: [
    { long: 'output',       short: 'o', describe: 'Output .wat path (default: sibling)' },
    { long: 'folding',                  describe: 'Emit folded s-expressions' },
    { long: 'inline',                   describe: 'Inline imports and exports' },
    { long: 'no-debug-names',           describe: 'Drop the name section' },
  ],
  examples: [
    { comment: 'basic', command: 'task disassemble wasm mod.wasm' },
    { comment: 'folded + inline', command: 'task disassemble wasm mod.wasm --folding --inline' },
  ],
})

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output',         { alias: 'o', type: 'string' })
    .option('folding',        { type: 'boolean' })
    .option('inline',         { type: 'boolean' })
    .option('no-debug-names', { type: 'boolean' })
}

async function handler(argv: Record<string, unknown>) {
  const { disassembleWasmNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  const folding = argvBool(argv.folding)
  const inline = argvBool(argv.inline)
  const noDebugNames = argvBool(argv['no-debug-names'])
  await runAction({
    action: 'disassemble',
    input: { file: filePath } as Record<string, unknown>,
    run: () =>
      disassembleWasmNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
        folding,
        inline,
        noDebugNames,
      }),
  })
}

export const disassembleWasmConsole: CommandModule = {
  command: 'wasm <file>',
  describe: 'WebAssembly binary → text format (wat)',
  builder,
  handler,
}
