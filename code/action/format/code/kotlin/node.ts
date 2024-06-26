import {
  FormatKotlinNodeInput,
  FormatKotlinNodeInputParser,
  FormatKotlinNodeLocalExternalInput,
  FormatKotlinNodeLocalInternalInput,
  FormatKotlinNodeRemoteInput,
  FormatKotlinNodeClientInputParser,
  FormatKotlinNodeLocalInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToFormatKotlin } from '../command.js'
import { buildRequestToFormat } from '../shared.js'
import { runCommandSequence } from '~/code/tool/node/command.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import {
  resolveInputForFormatLocalExternalNode,
  resolveInputForFormatLocalInternalNode,
  resolveInputForFormatRemoteNode,
} from '../tool/node.js'
import { extend } from '~/code/tool/shared/object.js'
import { resolveWorkFileNode } from '~/code/tool/node/request.js'

export async function formatKotlinNode(
  source: FormatKotlinNodeInput,
  native?: NativeOptions,
) {
  const input = FormatKotlinNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatKotlinNodeRemote(input, native)
    case 'external':
      return await formatKotlinNodeLocalExternal(input, native)
    default:
      return await formatKotlinNodeLocalInternal(input, native)
  }
}

async function formatKotlinNodeLocalExternal(
  source: FormatKotlinNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalExternalNode(source)
  return await formatKotlinNodeLocal(input, native)
}

async function formatKotlinNodeLocalInternal(
  source: FormatKotlinNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalInternalNode(source)
  return await formatKotlinNodeLocal(input, native)
}

export async function formatKotlinNodeRemote(
  source: FormatKotlinNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatKotlinNodeClientInputParser().parse(
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

export async function formatKotlinNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatKotlinNodeLocalInputParser().parse(source)

  const sequence = buildCommandToFormatKotlin(input)
  await runCommandSequence(sequence)

  return {
    file: {
      path: input.output.file.path,
    },
  }
}
