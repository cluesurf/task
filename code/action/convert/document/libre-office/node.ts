import {
  ConvertDocumentWithLibreOfficeNodeInput,
  ConvertDocumentWithLibreOfficeNodeInputResolver,
  ConvertDocumentWithLibreOfficeNodeOutputResolver,
  ConvertDocumentWithLibreOfficeNodeLocalInternalInput,
  ConvertDocumentWithLibreOfficeNodeLocalExternalInput,
  ConvertDocumentWithLibreOfficeNodeLocalInputResolver,
  ConvertDocumentWithLibreOfficeNodeRemoteInput,
  ConvertDocumentWithLibreOfficeNodeClientInputResolver,
} from '~/code/type/node'
import { buildCommandToConvertDocumentWithLibreOffice } from '../command'
import { runCommandSequence } from '~/code/tool/node/command'
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

export async function convertDocumentWithLibreOfficeNode(
  source: ConvertDocumentWithLibreOfficeNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithLibreOfficeNodeInputResolver().parse(source)

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

export async function convertDocumentWithLibreOfficeNodeRemote(
  source: ConvertDocumentWithLibreOfficeNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertDocumentWithLibreOfficeNodeClientInputResolver().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertDocumentWithLibreOfficeNodeOutputResolver().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertDocumentWithLibreOfficeNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertDocumentWithLibreOfficeNodeLocalInputResolver().parse(input)

  const name = replaceFileExtension(
    localInput.input.file.path,
    localInput.input.format,
  )
  const outputPath = path.join(localInput.output.directory.path, name)

  const sequence =
    await buildCommandToConvertDocumentWithLibreOffice(localInput)

  await runCommandSequence(sequence)

  return ConvertDocumentWithLibreOfficeNodeOutputResolver().parse({
    file: {
      path: outputPath,
    },
  })
}
