import {
  CompileSwiftNodeInput,
  CompileSwiftNodeLocalExternalInput,
  CompileSwiftNodeLocalInternalInput,
  CompileSwiftNodeRemoteInput,
} from '~/code/form/action/compile/code/swift/node'
import {
  CompileSwiftNodeClientInputParser,
  CompileSwiftNodeInputParser,
  CompileSwiftNodeLocalInputParser,
} from '~/code/form/action/compile/code/swift/node/take'
import { buildCommandToCompileSwift } from '../command'
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

async function compileSwiftNode(
  source: CompileSwiftNodeInput,
  native?: NativeOptions,
) {
  const input = CompileSwiftNodeInputParser.parse(source)

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

async function compileSwiftNodeRemote(
  source: CompileSwiftNodeRemoteInput,
  native,
) {
  const input = await resolveInputForCompileRemoteNode(source)
  const clientInput = CompileSwiftNodeClientInputParser.parse(
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

async function compileSwiftNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput = CompileSwiftNodeLocalInputParser.parse(input)

  const command = await buildCommandToCompileSwift(localInput)

  await spawnAndWait({ verb: 'compile swift', bin: command.bin, args: command.args })

  return {
    file: {
      path: localInput.output.file!.path,
    },
  }
}

export default compileSwiftNode
export { compileSwiftNode }
