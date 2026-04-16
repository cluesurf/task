import {
  ConvertDocumentWithLibreOfficeNodeInput,
  ConvertDocumentWithLibreOfficeNodeLocalExternalInput,
  ConvertDocumentWithLibreOfficeNodeLocalInternalInput,
  ConvertDocumentWithLibreOfficeNodeRemoteInput,
} from '~/code/form/action/convert/libre-office/node'
import {
  ConvertDocumentWithLibreOfficeNodeClientInputParser,
  ConvertDocumentWithLibreOfficeNodeInputParser,
  ConvertDocumentWithLibreOfficeNodeLocalInputParser,
  ConvertDocumentWithLibreOfficeNodeOutputParser,
} from '~/code/form/action/convert/libre-office/node/take'
import { buildCommandToConvertDocumentWithLibreOffice } from '../command'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../../tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToConvert } from '../../shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import path from 'path'
import { replaceFileExtension } from '~/code/tool/shared/screen'
import { NativeOptions } from '~/code/tool/shared/request'

async function convertDocumentWithLibreOfficeNode(
  source: ConvertDocumentWithLibreOfficeNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithLibreOfficeNodeInputParser.parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithLibreOfficeNodeRemote(
        input,
        native,
      )
    case 'external':
      return await convertDocumentWithLibreOfficeNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertDocumentWithLibreOfficeNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertDocumentWithLibreOfficeNodeLocalExternal(
  source: ConvertDocumentWithLibreOfficeNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertDocumentWithLibreOfficeNodeLocal(input, native)
}

async function convertDocumentWithLibreOfficeNodeLocalInternal(
  source: ConvertDocumentWithLibreOfficeNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertDocumentWithLibreOfficeNodeLocal(input, native)
}

async function convertDocumentWithLibreOfficeNodeRemote(
  source: ConvertDocumentWithLibreOfficeNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithLibreOfficeNodeClientInputParser.parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return ConvertDocumentWithLibreOfficeNodeOutputParser.parse({
    file: {
      path: input.output.file!.path,
    },
  })
}

async function convertDocumentWithLibreOfficeNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithLibreOfficeNodeLocalInputParser.parse(input)

  const name = replaceFileExtension(
    localInput.input.file.path,
    localInput.input.format,
  )
  const outputPath = path.join(localInput.output.directory.path, name)

  const sequence =
    await buildCommandToConvertDocumentWithLibreOffice(localInput)

  const cmd = sequence.call[0]!
  await spawnAndWait({ verb: 'convert', bin: cmd.link[0]!, args: cmd.link.slice(1) })

  return ConvertDocumentWithLibreOfficeNodeOutputParser.parse({
    file: {
      path: outputPath,
    },
  })
}

export default convertDocumentWithLibreOfficeNode
export { convertDocumentWithLibreOfficeNode }
