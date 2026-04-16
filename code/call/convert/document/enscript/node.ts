import {
  ConvertDocumentWithEnscriptNodeInput,
  ConvertDocumentWithEnscriptNodeLocalExternalInput,
  ConvertDocumentWithEnscriptNodeLocalInternalInput,
  ConvertDocumentWithEnscriptNodeRemoteInput,
} from '~/code/form/action/convert/enscript/node'
import {
  ConvertDocumentWithEnscriptNodeClientInputParser,
  ConvertDocumentWithEnscriptNodeInputParser,
  ConvertDocumentWithEnscriptNodeLocalInputParser,
  ConvertDocumentWithEnscriptNodeOutputParser,
} from '~/code/form/action/convert/enscript/node/take'
import { buildCommandToConvertDocumentWithEnscript } from '../command'
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

async function convertDocumentWithEnscriptNode(
  source: ConvertDocumentWithEnscriptNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithEnscriptNodeInputParser.parse(source)

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

async function convertDocumentWithEnscriptNodeRemote(
  source: ConvertDocumentWithEnscriptNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithEnscriptNodeClientInputParser.parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return ConvertDocumentWithEnscriptNodeOutputParser.parse({
    file: {
      path: input.output.file!.path,
    },
  })
}

async function convertDocumentWithEnscriptNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithEnscriptNodeLocalInputParser.parse(input)

  const command =
    await buildCommandToConvertDocumentWithEnscript(localInput)

  await spawnAndWait({ verb: 'convert document', bin: command.bin, args: command.args })

  return ConvertDocumentWithEnscriptNodeOutputParser.parse({
    file: {
      path: localInput.output.file!.path,
    },
  })
}

export default convertDocumentWithEnscriptNode
export { convertDocumentWithEnscriptNode }
