import {
  ConvertDocumentWithJupyterNodeInput,
  ConvertDocumentWithJupyterNodeInputParser,
  ConvertDocumentWithJupyterNodeOutputParser,
  ConvertDocumentWithJupyterNodeLocalInternalInput,
  ConvertDocumentWithJupyterNodeLocalExternalInput,
  ConvertDocumentWithJupyterNodeLocalInputParser,
  ConvertDocumentWithJupyterNodeRemoteInput,
  ConvertDocumentWithJupyterNodeClientInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToConvertDocumentWithJupyter } from '../command.js'
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

export async function convertDocumentWithJupyterNode(
  source: ConvertDocumentWithJupyterNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithJupyterNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithJupyterNodeRemote(input, native)
    case 'external':
      return await convertDocumentWithJupyterNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertDocumentWithJupyterNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertDocumentWithJupyterNodeLocalExternal(
  source: ConvertDocumentWithJupyterNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertDocumentWithJupyterNodeLocal(input, native)
}

async function convertDocumentWithJupyterNodeLocalInternal(
  source: ConvertDocumentWithJupyterNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertDocumentWithJupyterNodeLocal(input, native)
}

export async function convertDocumentWithJupyterNodeRemote(
  source: ConvertDocumentWithJupyterNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithJupyterNodeClientInputParser().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertDocumentWithJupyterNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertDocumentWithJupyterNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithJupyterNodeLocalInputParser().parse(input)

  const sequence =
    await buildCommandToConvertDocumentWithJupyter(localInput)

  await runCommandSequence(sequence)

  return ConvertDocumentWithJupyterNodeOutputParser().parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}
