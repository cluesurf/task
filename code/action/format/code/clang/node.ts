import {
  FormatCodeWithClangFormatNodeInput,
  FormatCodeWithClangFormatNodeInputParser,
  FormatCodeWithClangFormatNodeLocalExternalInput,
  FormatCodeWithClangFormatNodeLocalInternalInput,
  FormatCodeWithClangFormatNodeRemoteInput,
  FormatCodeWithClangFormatNodeClientInputParser,
  FormatCodeWithClangFormatNodeLocalInputParser,
} from '~/code/type/node/parser.js'
import fsp from 'fs/promises'
import YAML from 'yaml'
import { buildCommandToFormatCodeWithClangFormat } from '../command.js'
import { buildRequestToFormat } from '../shared.js'
import { runCommandSequence } from '~/code/tool/node/command.js'
import { generateTemporaryFilePath } from '~/code/tool/node/file.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import {
  resolveInputForFormatLocalExternalNode,
  resolveInputForFormatLocalInternalNode,
  resolveInputForFormatRemoteNode,
} from '../tool/node.js'
import { extend } from '~/code/tool/shared/object.js'
import { resolveWorkFileNode } from '~/code/tool/node/request.js'

export async function formatCodeWithClangFormatNode(
  source: FormatCodeWithClangFormatNodeInput,
  native?: NativeOptions,
) {
  const input = FormatCodeWithClangFormatNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatCodeWithClangFormatNodeRemote(input, native)
    case 'external':
      return await formatCodeWithClangFormatNodeLocalExternal(
        input,
        native,
      )
    default:
      return await formatCodeWithClangFormatNodeLocalInternal(
        input,
        native,
      )
  }
}

async function formatCodeWithClangFormatNodeLocalExternal(
  source: FormatCodeWithClangFormatNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalExternalNode(source)
  return await formatCodeWithClangFormatNodeLocal(input, native)
}

async function formatCodeWithClangFormatNodeLocalInternal(
  source: FormatCodeWithClangFormatNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatLocalInternalNode(source)
  return await formatCodeWithClangFormatNodeLocal(input, native)
}

export async function formatCodeWithClangFormatNodeRemote(
  source: FormatCodeWithClangFormatNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForFormatRemoteNode(source)
  const clientInput =
    FormatCodeWithClangFormatNodeClientInputParser().parse(
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

export async function formatCodeWithClangFormatNodeLocal(
  source,
  native?: NativeOptions,
) {
  const { input, output, format, ...style } =
    FormatCodeWithClangFormatNodeLocalInputParser().parse(source)

  const stylePath = await generateTemporaryFilePath('yaml')
  await fsp.writeFile(stylePath, YAML.stringify(style ?? {}))

  const commandInput = {
    input,
    output,
    format,
    style: {
      path: stylePath,
    },
  }

  const sequence = buildCommandToFormatCodeWithClangFormat(commandInput)
  await runCommandSequence(sequence)

  await fsp.unlink(stylePath)

  return {
    file: {
      path: output.file.path,
    },
  }
}
