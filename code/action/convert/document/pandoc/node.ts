import {
  ConvertDocumentWithPandocNodeInput,
  ConvertDocumentWithPandocNodeInputParser,
  ConvertDocumentWithPandocNodeOutputParser,
  ConvertDocumentWithPandocNodeLocalInternalInput,
  ConvertDocumentWithPandocNodeLocalExternalInput,
  ConvertDocumentWithPandocNodeLocalInputParser,
  ConvertDocumentWithPandocNodeRemoteInput,
  ConvertDocumentWithPandocNodeClientInputParser,
} from '~/code/type/node/parser'
import { buildCommandToConvertDocumentWithPandoc } from '../command'
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

export async function convertDocumentWithPandocNode(
  source: ConvertDocumentWithPandocNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertDocumentWithPandocNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithPandocNodeRemote(input, native)
    case 'external':
      return await convertDocumentWithPandocNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertDocumentWithPandocNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertDocumentWithPandocNodeLocalExternal(
  source: ConvertDocumentWithPandocNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertDocumentWithPandocNodeLocal(input, native)
}

async function convertDocumentWithPandocNodeLocalInternal(
  source: ConvertDocumentWithPandocNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertDocumentWithPandocNodeLocal(input, native)
}

export async function convertDocumentWithPandocNodeRemote(
  source: ConvertDocumentWithPandocNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithPandocNodeClientInputParser().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertDocumentWithPandocNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertDocumentWithPandocNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithPandocNodeLocalInputParser().parse(input)

  const sequence =
    await buildCommandToConvertDocumentWithPandoc(localInput)

  await runCommandSequence(sequence)

  return ConvertDocumentWithPandocNodeOutputParser().parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}
