import {
  FormatPythonNodeInput,
  FormatPythonNodeLocalExternalInput,
  FormatPythonNodeLocalInternalInput,
  FormatPythonNodeRemoteInput,
} from '~/code/form/action/format/code/node'
import {
  FormatPythonNodeClientInputParser,
  FormatPythonNodeInputParser,
  FormatPythonNodeLocalInputParser,
} from '~/code/form/action/format/code/node/take'
import { buildCommandToFormatPython } from '../command'
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

async function formatPythonNode(
  source: FormatPythonNodeInput,
  native?: NativeOptions,
) {
  const input = FormatPythonNodeInputParser.parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatPythonNodeRemote(input, native)
    case 'external':
      return await formatPythonNodeLocalExternal(input, native)
    default:
      return await formatPythonNodeLocalInternal(input, native)
  }
}

async function formatPythonNodeLocalExternal(
  source: FormatPythonNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalExternalNode(source)
  return await formatPythonNodeLocal(input, native)
}

async function formatPythonNodeLocalInternal(
  source: FormatPythonNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalInternalNode(source)
  return await formatPythonNodeLocal(input, native)
}

async function formatPythonNodeRemote(
  source: FormatPythonNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatPythonNodeClientInputParser.parse(
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

async function formatPythonNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatPythonNodeLocalInputParser.parse(source)

  const sequence = buildCommandToFormatPython(input)
  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'format python', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }

  return {
    file: {
      path: input.output.file!.path,
    },
  }
}

export default formatPythonNode
export { formatPythonNode }
