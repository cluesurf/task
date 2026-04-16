import {
  ConvertDocumentWithCalibreNodeInput,
  ConvertDocumentWithCalibreNodeLocalExternalInput,
  ConvertDocumentWithCalibreNodeLocalInternalInput,
  ConvertDocumentWithCalibreNodeRemoteInput,
} from '~/code/form/action/convert/calibre/node'
import {
  ConvertDocumentWithCalibreNodeClientInputParser,
  ConvertDocumentWithCalibreNodeInputParser,
  ConvertDocumentWithCalibreNodeLocalInputParser,
  ConvertDocumentWithCalibreNodeOutputParser,
} from '~/code/form/action/convert/calibre/node/take'
import { buildCommandToConvertDocumentWithCalibre } from '../command'
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

async function convertDocumentWithCalibreNode(
  source: ConvertDocumentWithCalibreNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithCalibreNodeInputParser.parse(source)

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

async function convertDocumentWithCalibreNodeRemote(
  source: ConvertDocumentWithCalibreNodeRemoteInput,
  native,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithCalibreNodeClientInputParser.parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return ConvertDocumentWithCalibreNodeOutputParser.parse({
    file: {
      path: input.output.file!.path,
    },
  })
}

async function convertDocumentWithCalibreNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithCalibreNodeLocalInputParser.parse(input)

  const command =
    await buildCommandToConvertDocumentWithCalibre(localInput)

  await spawnAndWait({ verb: 'convert document', bin: command.bin, args: command.args })

  return ConvertDocumentWithCalibreNodeOutputParser.parse({
    file: {
      path: localInput.output.file!.path,
    },
  })
}

export default convertDocumentWithCalibreNode
export { convertDocumentWithCalibreNode }
