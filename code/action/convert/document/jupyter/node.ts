import {
  ConvertDocumentWithJupyterNodeInput,
  ConvertDocumentWithJupyterNodeInputModel,
  ConvertDocumentWithJupyterNodeOutputModel,
  ConvertDocumentWithJupyterNodeLocalInternalInput,
  ConvertDocumentWithJupyterNodeLocalExternalInput,
  ConvertDocumentWithJupyterNodeLocalInputModel,
  ConvertDocumentWithJupyterNodeRemoteInput,
  ConvertDocumentWithJupyterNodeClientInputModel,
} from '~/code/type'
import { buildCommandToConvertDocumentWithJupyter } from '../command'
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

export async function convertDocumentWithJupyterNode(
  source: ConvertDocumentWithJupyterNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertDocumentWithJupyterNodeInputModel.parse(source)

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
    ConvertDocumentWithJupyterNodeClientInputModel.parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertDocumentWithJupyterNodeOutputModel.parse({
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
    ConvertDocumentWithJupyterNodeLocalInputModel.parse(input)

  const sequence =
    await buildCommandToConvertDocumentWithJupyter(localInput)

  await runCommandSequence(sequence)

  return ConvertDocumentWithJupyterNodeOutputModel.parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}
