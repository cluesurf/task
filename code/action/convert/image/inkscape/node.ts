import {
  ConvertImageWithInkscapeNodeInput,
  ConvertImageWithInkscapeNodeInputParser,
  ConvertImageWithInkscapeNodeOutputParser,
  ConvertImageWithInkscapeNodeLocalInternalInput,
  ConvertImageWithInkscapeNodeLocalExternalInput,
  ConvertImageWithInkscapeNodeLocalInputParser,
  ConvertImageWithInkscapeNodeRemoteInput,
  ConvertImageWithInkscapeNodeClientInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToConvertImageWithInkscape } from '../command.js'
import { runCommandSequence } from '~/code/tool/node/command.js'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../../tool/node.js'
import { extend } from '~/code/tool/shared/object.js'
import { buildRequestToConvert } from '../../shared.js'
import { resolveWorkFileNode } from '~/code/tool/node/request.js'
import { testConvertImageWithInkscape } from './shared.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

export async function convertImageWithInkscapeNode(
  source: ConvertImageWithInkscapeNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertImageWithInkscapeNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertImageWithInkscapeNodeRemote(input, native)
    case 'external':
      return await convertImageWithInkscapeNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertImageWithInkscapeNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertImageWithInkscapeNodeLocalExternal(
  source: ConvertImageWithInkscapeNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertImageWithInkscapeNodeLocal(input, native)
}

async function convertImageWithInkscapeNodeLocalInternal(
  source: ConvertImageWithInkscapeNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertImageWithInkscapeNodeLocal(input, native)
}

export async function convertImageWithInkscapeNodeRemote(
  source: ConvertImageWithInkscapeNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertImageWithInkscapeNodeClientInputParser().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertImageWithInkscapeNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertImageWithInkscapeNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertImageWithInkscapeNodeLocalInputParser().parse(input)

  const sequence =
    await buildCommandToConvertImageWithInkscape(localInput)

  await runCommandSequence(sequence)

  return ConvertImageWithInkscapeNodeOutputParser().parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}

export function testConvertImageWithInkscapeNode(
  input: any,
): input is ConvertImageWithInkscapeNodeInput {
  return testConvertImageWithInkscape(input)
}
