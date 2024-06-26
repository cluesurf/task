import {
  ConvertDocumentWithCalibreNodeInput,
  ConvertDocumentWithCalibreNodeInputParser,
  ConvertDocumentWithCalibreNodeOutputParser,
  ConvertDocumentWithCalibreNodeLocalInternalInput,
  ConvertDocumentWithCalibreNodeLocalExternalInput,
  ConvertDocumentWithCalibreNodeLocalInputParser,
  ConvertDocumentWithCalibreNodeRemoteInput,
  ConvertDocumentWithCalibreNodeClientInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToConvertDocumentWithCalibre } from '../command.js'
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

export async function convertDocumentWithCalibreNode(
  source: ConvertDocumentWithCalibreNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithCalibreNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithCalibreNodeRemote(input, native)
    case 'external':
      return await convertDocumentWithCalibreNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertDocumentWithCalibreNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertDocumentWithCalibreNodeLocalExternal(
  source: ConvertDocumentWithCalibreNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertDocumentWithCalibreNodeLocal(input, native)
}

async function convertDocumentWithCalibreNodeLocalInternal(
  source: ConvertDocumentWithCalibreNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertDocumentWithCalibreNodeLocal(input, native)
}

export async function convertDocumentWithCalibreNodeRemote(
  source: ConvertDocumentWithCalibreNodeRemoteInput,
  native,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithCalibreNodeClientInputParser().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertDocumentWithCalibreNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertDocumentWithCalibreNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithCalibreNodeLocalInputParser().parse(input)

  const sequence =
    await buildCommandToConvertDocumentWithCalibre(localInput)

  await runCommandSequence(sequence)

  return ConvertDocumentWithCalibreNodeOutputParser().parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}
