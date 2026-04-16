/**
 * `task disassemble dotnet` — .NET assembly (`.dll` / `.exe`) → IL
 * via `ildasm`. Falls back to `dotnet ildasm` for newer SDKs.
 */

import type { DisassembleDotnetNodeLocalInput } from '~/code/form/action/disassemble/dotnet/node'
import {
  DisassembleDotnetNodeInputParser,
  DisassembleDotnetNodeLocalInputParser,
  DisassembleDotnetNodeOutputParser,
} from '~/code/form/action/disassemble/dotnet/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToDisassembleDotnet } from './command'

async function runLocal(input: DisassembleDotnetNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath =
    input.output?.file?.path ??
    siblingWithSuffix({
      path: inputPath,
      suffix: '.il',
      replaceExt: true,
    })
  await ensureParentDir(outputPath)

  const command = buildCommandToDisassembleDotnet({
    inputPath,
    outputPath,
    bytes: input.bytes,
    header: input.header,
    tokens: input.tokens,
    noBar: input.noBar,
  })

  try {
    await spawnAndWait({
      verb: 'disassemble dotnet',
      bin: command.bin,
      args: command.args,
    })
  } catch (err) {
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
  return { file: { path: outputPath } }
}

const [disassembleDotnetNode, testDisassembleDotnetNode] =
  createNodeHandler({
    parsers: {
      input: DisassembleDotnetNodeInputParser,
      local: DisassembleDotnetNodeLocalInputParser,
      output: DisassembleDotnetNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export { disassembleDotnetNode, testDisassembleDotnetNode }
