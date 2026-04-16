/**
 * `task disassemble dotnet` — .NET assembly (`.dll` / `.exe`) → IL
 * via `ildasm`. Ships with the .NET SDK on all platforms.
 *
 * For newer toolchains `ildasm` is typically invoked via `dotnet
 * ildasm` — we fall back to that when the bare binary isn't on
 * PATH.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToDisassembleDotnet } from './command'
import {
  parseDisassembleDotnetNode,
  testDisassembleDotnetNode,
  type DisassembleDotnetNodeInput,
  type DisassembleDotnetNodeOutput,
} from './shared'

export type {
  DisassembleDotnetNodeInput,
  DisassembleDotnetNodeOutput,
}
export { testDisassembleDotnetNode }

export async function disassembleDotnetNode(
  source: DisassembleDotnetNodeInput,
): Promise<DisassembleDotnetNodeOutput> {
  const src = parseDisassembleDotnetNode(source)
  const out =
    src.output ??
    siblingWithSuffix({
      path: src.input,
      suffix: '.il',
      replaceExt: true,
    })
  await ensureParentDir(out)

  const command = buildCommandToDisassembleDotnet(src, out)

  try {
    await spawnAndWait({
      verb: 'disassemble dotnet',
      bin: command.bin,
      args: command.args,
    })
  } catch (err) {
    // Fallback: newer SDKs expose `dotnet ildasm` instead.
    if (/not found/.test(String(err))) {
      await spawnAndWait({
        verb: 'disassemble dotnet',
        bin: 'dotnet',
        args: ['ildasm', ...command.args],
      })
    } else {
      throw err
    }
  }
  return { file: { path: out } }
}
