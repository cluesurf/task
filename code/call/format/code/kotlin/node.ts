import {
  FormatKotlinNodeInput,
  FormatKotlinNodeLocalExternalInput,
  FormatKotlinNodeLocalInternalInput,
  FormatKotlinNodeRemoteInput,
} from '~/code/form/action/format/code/node'
import {
  FormatKotlinNodeClientInputParser,
  FormatKotlinNodeInputParser,
  FormatKotlinNodeLocalInputParser,
} from '~/code/form/action/format/code/node/take'
import { buildCommandToFormatKotlin } from '../command'
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

async function formatKotlinNode(
  source: FormatKotlinNodeInput,
  native?: NativeOptions,
) {
  const input = FormatKotlinNodeInputParser.parse(source)

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

async function formatKotlinNodeRemote(
  source: FormatKotlinNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatKotlinNodeClientInputParser.parse(
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

async function formatKotlinNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatKotlinNodeLocalInputParser.parse(source)

  const command = buildCommandToFormatKotlin(input)
  await spawnAndWait({ verb: 'format kotlin', bin: command.bin, args: command.args })

  return {
    file: {
      path: input.output.file!.path,
    },
  }
}

export default formatKotlinNode
export { formatKotlinNode }
