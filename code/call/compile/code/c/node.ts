import {
  CompileCNodeInputParser,
  CompileCNodeLocalInputParser,
  CompileCNodeClientInputParser,
} from '~/code/form/action/compile/code/c/node/take'
import {
  CompileCNodeInput,
  CompileCNodeLocalInternalInput,
  CompileCNodeLocalExternalInput,
  CompileCNodeRemoteInput,
} from '~/code/form/action/compile/code/c/node/index'
import { buildCommandToCompileC } from '../command'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  resolveInputForCompileLocalExternalNode,
  resolveInputForCompileLocalInternalNode,
  resolveInputForCompileRemoteNode,
} from '~/code/call/compile/code/tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToCompile } from '~/code/call/compile/code/shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'

async function compileCNode(
  source: CompileCNodeInput,
  native?: NativeOptions,
) {
  const input = CompileCNodeInputParser.parse(source)

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

async function compileCNodeRemote(
  source: CompileCNodeRemoteInput,
  native,
) {
  const input = await resolveInputForCompileRemoteNode(source)
  const clientInput = CompileCNodeClientInputParser.parse(
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

async function compileCNodeLocal(input, native?: NativeOptions) {
  const localInput = CompileCNodeLocalInputParser.parse(input)

  const sequence = await buildCommandToCompileC(localInput)

  for (const cmd of sequence.call) {
    await spawnAndWait({
      verb: 'compile c',
      bin: cmd.link[0]!,
      args: cmd.link.slice(1),
    })
  }

  return {
    file: {
      path: localInput.output.file!.path,
    },
  }
}

export default compileCNode
export { compileCNode }
