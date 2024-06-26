import {
  FormatSwiftNodeInput,
  FormatSwiftNodeInputParser,
  FormatSwiftNodeLocalExternalInput,
  FormatSwiftNodeLocalInternalInput,
  FormatSwiftNodeRemoteInput,
  FormatSwiftNodeClientInputParser,
  FormatSwiftNodeLocalInputParser,
} from '~/code/type/node/parser'
import { buildCommandToFormatSwift } from '../command'
import { buildRequestToFormat } from '../shared'
import { runCommandSequence } from '~/code/tool/node/command'
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

export async function formatSwiftNode(
  source: FormatSwiftNodeInput,
  native?: NativeOptions,
) {
  const input = FormatSwiftNodeInputParser().parse(source)

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

export async function formatSwiftNodeRemote(
  source: FormatSwiftNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatSwiftNodeClientInputParser().parse(
    extend(input, { handle: 'client' }),
  )

  const request = buildRequestToFormat(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return {
    file: {
      path: input.output.file.path,
    },
  }
}

export async function formatSwiftNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatSwiftNodeLocalInputParser().parse(source)

  const sequence = buildCommandToFormatSwift(input)
  await runCommandSequence(sequence)

  return {
    file: {
      path: input.output.file.path,
    },
  }
}
