import {
  FormatPythonNodeInput,
  FormatPythonNodeInputParser,
  FormatPythonNodeLocalExternalInput,
  FormatPythonNodeLocalInternalInput,
  FormatPythonNodeRemoteInput,
  FormatPythonNodeClientInputParser,
  FormatPythonNodeLocalInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToFormatPython } from '../command.js'
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

export async function formatPythonNode(
  source: FormatPythonNodeInput,
  native?: NativeOptions,
) {
  const input = FormatPythonNodeInputParser().parse(source)

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

export async function formatPythonNodeRemote(
  source: FormatPythonNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput = FormatPythonNodeClientInputParser().parse(
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

export async function formatPythonNodeLocal(
  source,
  native?: NativeOptions,
) {
  const input = FormatPythonNodeLocalInputParser().parse(source)

  const sequence = buildCommandToFormatPython(input)
  await runCommandSequence(sequence)

  return {
    file: {
      path: input.output.file.path,
    },
  }
}
