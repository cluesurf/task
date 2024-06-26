import {
  CompileCNodeInput,
  CompileCNodeInputParser,
  CompileCNodeOutputParser,
  CompileCNodeLocalInternalInput,
  CompileCNodeLocalExternalInput,
  CompileCNodeLocalInputParser,
  CompileCNodeRemoteInput,
  CompileCNodeClientInputParser,
} from '~/code/type/node/parser'
import { buildCommandToCompileC } from '../command'
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

export async function compileCNode(
  source: CompileCNodeInput,
  native?: NativeOptions,
) {
  const input = CompileCNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await compileCNodeRemote(input, native)
    case 'external':
      return await compileCNodeLocalExternal(input, native)
    default:
      return await compileCNodeLocalInternal(input, native)
  }
}

async function compileCNodeLocalExternal(
  source: CompileCNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForCompileLocalExternalNode(source)
  return await compileCNodeLocal(input, native)
}

async function compileCNodeLocalInternal(
  source: CompileCNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForCompileLocalInternalNode(source)
  return await compileCNodeLocal(input, native)
}

export async function compileCNodeRemote(
  source: CompileCNodeRemoteInput,
  native,
) {
  const input = await resolveInputForCompileRemoteNode(source)
  const clientInput = CompileCNodeClientInputParser().parse(
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

export async function compileCNodeLocal(input, native?: NativeOptions) {
  const localInput = CompileCNodeLocalInputParser().parse(input)

  const sequence = await buildCommandToCompileC(localInput)

  await runCommandSequence(sequence)

  return {
    file: {
      path: localInput.output.file.path,
    },
  }
}
