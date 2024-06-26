import {
  ConvertDocumentWithEnscriptNodeInput,
  ConvertDocumentWithEnscriptNodeInputParser,
  ConvertDocumentWithEnscriptNodeOutputParser,
  ConvertDocumentWithEnscriptNodeLocalInternalInput,
  ConvertDocumentWithEnscriptNodeLocalExternalInput,
  ConvertDocumentWithEnscriptNodeLocalInputParser,
  ConvertDocumentWithEnscriptNodeRemoteInput,
  ConvertDocumentWithEnscriptNodeClientInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToConvertDocumentWithEnscript } from '../command.js'
import { runCommandSequence } from '~/code/tool/node/command.js'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../../tool/node.js'
import { extend } from '~/code/tool/shared/object.js'
import { buildRequestToConvert } from '../../shared.js'
import { resolveWorkFileNode } from '~/code/tool/node/request.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

export async function convertDocumentWithEnscriptNode(
  source: ConvertDocumentWithEnscriptNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithEnscriptNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithEnscriptNodeRemote(input, native)
    case 'external':
      return await convertDocumentWithEnscriptNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertDocumentWithEnscriptNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertDocumentWithEnscriptNodeLocalExternal(
  source: ConvertDocumentWithEnscriptNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertDocumentWithEnscriptNodeLocal(input, native)
}

async function convertDocumentWithEnscriptNodeLocalInternal(
  source: ConvertDocumentWithEnscriptNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertDocumentWithEnscriptNodeLocal(input, native)
}

export async function convertDocumentWithEnscriptNodeRemote(
  source: ConvertDocumentWithEnscriptNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithEnscriptNodeClientInputParser().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertDocumentWithEnscriptNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertDocumentWithEnscriptNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithEnscriptNodeLocalInputParser().parse(input)

  const sequence =
    await buildCommandToConvertDocumentWithEnscript(localInput)

  await runCommandSequence(sequence)

  return ConvertDocumentWithEnscriptNodeOutputParser().parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}
