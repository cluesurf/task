/**
 * `task disassemble wasm` — WebAssembly binary (`.wasm`) → text
 * format (`.wat`) via `wasm2wat` from the WABT toolkit.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToDisassembleWasm } from './command'
import {
  parseDisassembleWasmNode,
  testDisassembleWasmNode,
  type DisassembleWasmNodeInput,
  type DisassembleWasmNodeOutput,
} from './shared'

export type { DisassembleWasmNodeInput, DisassembleWasmNodeOutput }
export { testDisassembleWasmNode }

export async function disassembleWasmNode(
  source: DisassembleWasmNodeInput,
): Promise<DisassembleWasmNodeOutput> {
  const src = parseDisassembleWasmNode(source)
  const out =
    src.output ??
    siblingWithSuffix({
      path: src.input,
      suffix: '.wat',
      replaceExt: true,
    })
  await ensureParentDir(out)

  const command = buildCommandToDisassembleWasm(src, out)
  await spawnAndWait({
    verb: 'disassemble wasm',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: out } }
}
