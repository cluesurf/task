import {
  CompileCppNodeInput,
  CompileCppNodeInputParser,
  CompileCppNodeOutputParser,
  CompileCppNodeLocalInternalInput,
  CompileCppNodeLocalExternalInput,
  CompileCppNodeLocalInputParser,
  CompileCppNodeRemoteInput,
  CompileCppNodeClientInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToCompileCpp } from '../command.js'
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

export async function compileCppNode(
  source: CompileCppNodeInput,
  native?: NativeOptions,
) {
  const input = CompileCppNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await compileCppNodeRemote(input, native)
    case 'external':
      return await compileCppNodeLocalExternal(input, native)
    default:
      return await compileCppNodeLocalInternal(input, native)
  }
}

async function compileCppNodeLocalExternal(
  source: CompileCppNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForCompileLocalExternalNode(source)
  return await compileCppNodeLocal(input, native)
}

async function compileCppNodeLocalInternal(
  source: CompileCppNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForCompileLocalInternalNode(source)
  return await compileCppNodeLocal(input, native)
}

export async function compileCppNodeRemote(
  source: CompileCppNodeRemoteInput,
  native,
) {
  const input = await resolveInputForCompileRemoteNode(source)
  const clientInput = CompileCppNodeClientInputParser().parse(
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

export async function compileCppNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput = CompileCppNodeLocalInputParser().parse(input)

  const sequence = await buildCommandToCompileCpp(localInput)

  await runCommandSequence(sequence)

  return {
    file: {
      path: localInput.output.file.path,
    },
  }
}
