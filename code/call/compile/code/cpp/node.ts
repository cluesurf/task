import {
  CompileCppNodeInput,
  CompileCppNodeLocalExternalInput,
  CompileCppNodeLocalInternalInput,
  CompileCppNodeRemoteInput,
} from '~/code/form/action/compile/code/cpp/node'
import {
  CompileCppNodeClientInputParser,
  CompileCppNodeInputParser,
  CompileCppNodeLocalInputParser,
  CompileCppNodeOutputParser,
} from '~/code/form/action/compile/code/cpp/node/take'
import { buildCommandToCompileCpp } from '../command'
import { runCommandSequence } from '~/code/tool/node/command'
import {
  resolveInputForCompileLocalExternalNode,
  resolveInputForCompileLocalInternalNode,
  resolveInputForCompileRemoteNode,
} from '~/code/call/compile/code/tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToCompile } from '~/code/call/compile/code/shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'

async function compileCppNode(
  source: CompileCppNodeInput,
  native?: NativeOptions,
) {
  const input = CompileCppNodeInputParser.parse(source)

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

async function compileCppNodeRemote(
  source: CompileCppNodeRemoteInput,
  native,
) {
  const input = await resolveInputForCompileRemoteNode(source)
  const clientInput = CompileCppNodeClientInputParser.parse(
    extend(input, { handle: 'client' }),
  )

  const request = buildRequestToCompile(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return {
    file: {
      path: input.output.file!.path,
    },
  }
}

async function compileCppNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput = CompileCppNodeLocalInputParser.parse(input)

  const sequence = await buildCommandToCompileCpp(localInput)

  await runCommandSequence(sequence)

  return {
    file: {
      path: localInput.output.file!.path,
    },
  }
}

export default compileCppNode
export { compileCppNode }
