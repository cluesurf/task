/**
 * `task disassemble wasm` — WebAssembly binary (`.wasm`) → text
 * format (`.wat`) via `wasm2wat` from the WABT toolkit.
 */

import type { DisassembleWasmNodeLocalInput } from '~/code/form/action/disassemble/wasm/node'
import {
  DisassembleWasmNodeInputParser,
  DisassembleWasmNodeLocalInputParser,
  DisassembleWasmNodeOutputParser,
} from '~/code/form/action/disassemble/wasm/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToDisassembleWasm } from './command'

async function runLocal(input: DisassembleWasmNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath =
    input.output?.file?.path ??
    siblingWithSuffix({
      path: inputPath,
      suffix: '.wat',
      replaceExt: true,
    })
  await ensureParentDir(outputPath)
  const command = buildCommandToDisassembleWasm({
    inputPath,
    outputPath,
    folding: input.folding,
    inline: input.inline,
    noDebugNames: input.noDebugNames,
  })
  await spawnAndWait({
    verb: 'disassemble wasm',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [disassembleWasmNode, testDisassembleWasmNode] =
  createNodeHandler({
    parsers: {
      input: DisassembleWasmNodeInputParser,
      local: DisassembleWasmNodeLocalInputParser,
      output: DisassembleWasmNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export { disassembleWasmNode, testDisassembleWasmNode }
