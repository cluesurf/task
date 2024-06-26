import {
  CompileSwiftNodeInput,
  CompileSwiftNodeInputParser,
  CompileSwiftNodeLocalInternalInput,
  CompileSwiftNodeLocalExternalInput,
  CompileSwiftNodeLocalInputParser,
  CompileSwiftNodeRemoteInput,
  CompileSwiftNodeClientInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToCompileSwift } from '../command.js'
import { runCommandSequence } from '~/code/tool/node/command.js'
import {
  resolveInputForCompileLocalExternalNode,
  resolveInputForCompileLocalInternalNode,
  resolveInputForCompileRemoteNode,
} from '~/code/action/compile/code/tool/node.js'
import { extend } from '~/code/tool/shared/object.js'
import { buildRequestToCompile } from '~/code/action/compile/code/shared.js'
import { resolveWorkFileNode } from '~/code/tool/node/request.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

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
