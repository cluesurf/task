import {
  CompileSwiftNodeInput,
  CompileSwiftNodeInputParser,
  CompileSwiftNodeLocalInternalInput,
  CompileSwiftNodeLocalExternalInput,
  CompileSwiftNodeLocalInputParser,
  CompileSwiftNodeRemoteInput,
  CompileSwiftNodeClientInputParser,
} from '~/code/type/node/parser'
import { buildCommandToCompileSwift } from '../command'
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

export async function compileSwiftNode(
  source: CompileSwiftNodeInput,
  native?: NativeOptions,
) {
  const input = CompileSwiftNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await compileSwiftNodeRemote(input, native)
    case 'external':
      return await compileSwiftNodeLocalExternal(input, native)
    default:
      return await compileSwiftNodeLocalInternal(input, native)
  }
}

async function compileSwiftNodeLocalExternal(
  source: CompileSwiftNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForCompileLocalExternalNode(source)
  return await compileSwiftNodeLocal(input, native)
}

async function compileSwiftNodeLocalInternal(
  source: CompileSwiftNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForCompileLocalInternalNode(source)
  return await compileSwiftNodeLocal(input, native)
}

export async function compileSwiftNodeRemote(
  source: CompileSwiftNodeRemoteInput,
  native,
) {
  const input = await resolveInputForCompileRemoteNode(source)
  const clientInput = CompileSwiftNodeClientInputParser().parse(
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

export async function compileSwiftNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput = CompileSwiftNodeLocalInputParser().parse(input)

  const sequence = await buildCommandToCompileSwift(localInput)

  await runCommandSequence(sequence)

  return {
    file: {
      path: localInput.output.file.path,
    },
  }
}
