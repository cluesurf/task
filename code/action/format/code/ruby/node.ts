import {
  FormatRustNodeInput,
  FormatRustNodeInputParser,
  FormatRustNodeLocalExternalInput,
  FormatRustNodeLocalInternalInput,
  FormatRustNodeRemoteInput,
  FormatRustNodeClientInputParser,
  FormatRustNodeLocalInputParser,
} from '~/code/type/node/parser'
import { buildCommandToFormatRust } from '../command'
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

export async function formatRustNode(
  source: FormatRustNodeInput,
  native?: NativeOptions,
) {
  const input = FormatRustNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatRustNodeRemote(input, native)
    case 'external':
      return await formatRustNodeLocalExternal(input, native)
    default:
      return await formatRustNodeLocalInternal(input, native)
  }
}

async function formatRustNodeLocalExternal(
  source: FormatRustNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalExternalNode(source)
  return await formatRustNodeLocal(input, native)
}

async function formatRustNodeLocalInternal(
  source: FormatRustNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalInternalNode(source)
  return await formatRustNodeLocal(input, native)
}

export async function formatRustNodeRemote(
  source: FormatRustNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatRustNodeClientInputParser().parse(
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

export async function formatRustNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatRustNodeLocalInputParser().parse(source)

  const sequence = buildCommandToFormatRust(input)
  await runCommandSequence(sequence)

  return {
    file: {
      path: input.output.file.path,
    },
  }
}
