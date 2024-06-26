import {
  ConvertDocumentWithCalibreNodeInput,
  ConvertDocumentWithCalibreNodeInputParser,
  ConvertDocumentWithCalibreNodeOutputParser,
  ConvertDocumentWithCalibreNodeLocalInternalInput,
  ConvertDocumentWithCalibreNodeLocalExternalInput,
  ConvertDocumentWithCalibreNodeLocalInputParser,
  ConvertDocumentWithCalibreNodeRemoteInput,
  ConvertDocumentWithCalibreNodeClientInputParser,
} from '~/code/type/node/parser'
import { buildCommandToConvertDocumentWithCalibre } from '../command'
import { runCommandSequence } from '~/code/tool/node/command'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../../tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToConvert } from '../../shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'

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
