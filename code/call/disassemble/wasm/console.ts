import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

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

export const disassembleWasmConsole: CommandModule = {
  command: 'wasm <file>',
  describe: 'WebAssembly binary → text format (wat)',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output',         { alias: 'o', type: 'string' })
      .option('folding',        { type: 'boolean' })
      .option('inline',         { type: 'boolean' })
      .option('no-debug-names', { type: 'boolean' }),
  handler: async argv => {
    const { disassembleWasmNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
      folding: argv.folding as boolean | undefined,
      inline: argv.inline as boolean | undefined,
      noDebugNames: argv['no-debug-names'] as boolean | undefined,
    }
    await runAction({
      action: 'disassemble',
      input: input as unknown as Record<string, unknown>,
      run: () => disassembleWasmNode(input),
    })
  },
}
