import {
  FormatAssemblyNodeInput,
  FormatAssemblyNodeLocalExternalInput,
  FormatAssemblyNodeLocalInternalInput,
  FormatAssemblyNodeRemoteInput,
} from '~/code/form/action/format/code/node'
import {
  FormatAssemblyNodeClientInputParser,
  FormatAssemblyNodeInputParser,
  FormatAssemblyNodeLocalInputParser,
} from '~/code/form/action/format/code/node/take'
import { buildCommandToFormatAssembly } from '../command'
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

async function formatAssemblyNode(
  source: FormatAssemblyNodeInput,
  native?: NativeOptions,
) {
  const input = FormatAssemblyNodeInputParser.parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatAssemblyNodeRemote(input, native)
    case 'external':
      return await formatAssemblyNodeLocalExternal(input, native)
    default:
      return await formatAssemblyNodeLocalInternal(input, native)
  }
}

async function formatAssemblyNodeLocalExternal(
  source: FormatAssemblyNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalExternalNode(source)
  return await formatAssemblyNodeLocal(input, native)
}

async function formatAssemblyNodeLocalInternal(
  source: FormatAssemblyNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalInternalNode(source)
  return await formatAssemblyNodeLocal(input, native)
}

async function formatAssemblyNodeRemote(
  source: FormatAssemblyNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatAssemblyNodeClientInputParser.parse(
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

async function formatAssemblyNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatAssemblyNodeLocalInputParser.parse(source)

  const sequence = buildCommandToFormatAssembly(input)
  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'format assembly', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }

  return {
    file: {
      path: input.output.file!.path,
    },
  }
}

export default formatAssemblyNode
export { formatAssemblyNode }
