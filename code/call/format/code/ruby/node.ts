import {
  FormatRustNodeInput,
  FormatRustNodeLocalExternalInput,
  FormatRustNodeLocalInternalInput,
  FormatRustNodeRemoteInput,
} from '~/code/form/action/format/code/node'
import {
  FormatRustNodeClientInputParser,
  FormatRustNodeInputParser,
  FormatRustNodeLocalInputParser,
} from '~/code/form/action/format/code/node/take'
import { buildCommandToFormatRust } from '../command'
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

async function formatRustNode(
  source: FormatRustNodeInput,
  native?: NativeOptions,
) {
  const input = FormatRustNodeInputParser.parse(source)

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

async function formatRustNodeRemote(
  source: FormatRustNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatRustNodeClientInputParser.parse(
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

async function formatRustNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatRustNodeLocalInputParser.parse(source)

  const sequence = buildCommandToFormatRust(input)
  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'format ruby', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }

  return {
    file: {
      path: input.output.file!.path,
    },
  }
}

export default formatRustNode
export { formatRustNode }
