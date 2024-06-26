import {
  CompileRustNodeInput,
  CompileRustNodeInputParser,
  CompileRustNodeLocalInternalInput,
  CompileRustNodeLocalExternalInput,
  CompileRustNodeLocalInputParser,
  CompileRustNodeRemoteInput,
  CompileRustNodeClientInputParser,
} from '~/code/type/node/parser'
import { buildCommandToCompileRust } from '../command'
import { runCommandSequence } from '~/code/tool/node/command'
import {
  resolveInputForCompileLocalExternalNode,
  resolveInputForCompileLocalInternalNode,
  resolveInputForCompileRemoteNode,
} from '~/code/action/compile/code/tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToCompile } from '~/code/action/compile/code/shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'

export async function compileRustNode(
  source: CompileRustNodeInput,
  native?: NativeOptions,
) {
  const input = CompileRustNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await compileRustNodeRemote(input, native)
    case 'external':
      return await compileRustNodeLocalExternal(input, native)
    default:
      return await compileRustNodeLocalInternal(input, native)
  }
}

async function compileRustNodeLocalExternal(
  source: CompileRustNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForCompileLocalExternalNode(source)
  return await compileRustNodeLocal(input, native)
}

async function compileRustNodeLocalInternal(
  source: CompileRustNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForCompileLocalInternalNode(source)
  return await compileRustNodeLocal(input, native)
}

export async function compileRustNodeRemote(
  source: CompileRustNodeRemoteInput,
  native,
) {
  const input = await resolveInputForCompileRemoteNode(source)
  const clientInput = CompileRustNodeClientInputParser().parse(
    extend(input, { handle: 'client' }),
  )

  const request = buildRequestToCompile(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return {
    file: {
      path: input.output.file.path,
    },
  }
}

export async function compileRustNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput = CompileRustNodeLocalInputParser().parse(input)

  const sequence = await buildCommandToCompileRust(localInput)

  await runCommandSequence(sequence)

  return {
    file: {
      path: localInput.output.file.path,
    },
  }
}
