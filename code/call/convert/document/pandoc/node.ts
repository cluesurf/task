import {
  ConvertDocumentWithPandocNodeInput,
  ConvertDocumentWithPandocNodeLocalExternalInput,
  ConvertDocumentWithPandocNodeLocalInternalInput,
  ConvertDocumentWithPandocNodeRemoteInput,
} from '~/code/form/action/convert/pandoc/node'
import {
  ConvertDocumentWithPandocNodeClientInputParser,
  ConvertDocumentWithPandocNodeInputParser,
  ConvertDocumentWithPandocNodeLocalInputParser,
  ConvertDocumentWithPandocNodeOutputParser,
} from '~/code/form/action/convert/pandoc/node/take'
import { buildCommandToConvertDocumentWithPandoc } from '../command'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../../tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToConvert } from '../../shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'

async function convertDocumentWithPandocNode(
  source: ConvertDocumentWithPandocNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertDocumentWithPandocNodeInputParser.parse(source)

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

async function convertDocumentWithPandocNodeRemote(
  source: ConvertDocumentWithPandocNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithPandocNodeClientInputParser.parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return ConvertDocumentWithPandocNodeOutputParser.parse({
    file: {
      path: input.output.file!.path,
    },
  })
}

async function convertDocumentWithPandocNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithPandocNodeLocalInputParser.parse(input)

  const command =
    await buildCommandToConvertDocumentWithPandoc(localInput)

  await spawnAndWait({ verb: 'convert', bin: command.bin, args: command.args })

  return ConvertDocumentWithPandocNodeOutputParser.parse({
    file: {
      path: localInput.output.file!.path,
    },
  })
}

export default convertDocumentWithPandocNode
export { convertDocumentWithPandocNode }
