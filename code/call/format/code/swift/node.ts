import {
  FormatSwiftNodeInput,
  FormatSwiftNodeLocalExternalInput,
  FormatSwiftNodeLocalInternalInput,
  FormatSwiftNodeRemoteInput,
} from '~/code/form/action/format/code/node'
import {
  FormatSwiftNodeClientInputParser,
  FormatSwiftNodeInputParser,
  FormatSwiftNodeLocalInputParser,
} from '~/code/form/action/format/code/node/take'
import { buildCommandToFormatSwift } from '../command'
import { buildRequestToFormat } from '../shared'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { NativeOptions } from '~/code/tool/shared/request'
import {
  resolveInputForFormatLocalExternalNode,
  resolveInputForFormatLocalInternalNode,
  resolveInputForFormatRemoteNode,
} from '../tool/node'
import { extend } from '~/code/tool/shared/object'
import { resolveWorkFileNode } from '~/code/tool/node/request'

// https://github.com/realm/SwiftLint
// https://github.com/realm/SwiftLint/blob/main/Dockerfile

async function formatSwiftNode(
  source: FormatSwiftNodeInput,
  native?: NativeOptions,
) {
  const input = FormatSwiftNodeInputParser.parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatSwiftNodeRemote(input, native)
    case 'external':
      return await formatSwiftNodeLocalExternal(input, native)
    default:
      return await formatSwiftNodeLocalInternal(input, native)
  }
}

async function formatSwiftNodeLocalExternal(
  source: FormatSwiftNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalExternalNode(source)
  return await formatSwiftNodeLocal(input, native)
}

async function formatSwiftNodeLocalInternal(
  source: FormatSwiftNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalInternalNode(source)
  return await formatSwiftNodeLocal(input, native)
}

async function formatSwiftNodeRemote(
  source: FormatSwiftNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatSwiftNodeClientInputParser.parse(
    extend(input, { handle: 'client' }),
  )

  const request = buildRequestToFormat(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return {
    file: {
      path: input.output.file!.path,
    },
  }
}

async function formatSwiftNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatSwiftNodeLocalInputParser.parse(source)

  const command = buildCommandToFormatSwift(input)
  await spawnAndWait({ verb: 'format swift', bin: command.bin, args: command.args })

  return {
    file: {
      path: input.output.file!.path,
    },
  }
}

export default formatSwiftNode
export { formatSwiftNode }
