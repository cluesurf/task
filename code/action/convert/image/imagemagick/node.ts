import {
  ConvertImageWithImageMagickNodeInput,
  ConvertImageWithImageMagickNodeInputParser,
  ConvertImageWithImageMagickNodeOutputParser,
  ConvertImageWithImageMagickNodeLocalInternalInput,
  ConvertImageWithImageMagickNodeLocalExternalInput,
  ConvertImageWithImageMagickNodeLocalInputParser,
  ConvertImageWithImageMagickNodeRemoteInput,
  ConvertImageWithImageMagickNodeClientInputParser,
} from '~/code/type/node/parser'
import { testConvertImageWithImageMagick } from './shared'
import { buildCommandToConvertImageWithImageMagick } from '../command'
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

export async function convertImageWithImageMagickNode(
  source: ConvertImageWithImageMagickNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertImageWithImageMagickNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertImageWithImageMagickNodeRemote(input, native)
    case 'external':
      return await convertImageWithImageMagickNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertImageWithImageMagickNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertImageWithImageMagickNodeLocalExternal(
  source: ConvertImageWithImageMagickNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertImageWithImageMagickNodeLocal(input, native)
}

async function convertImageWithImageMagickNodeLocalInternal(
  source: ConvertImageWithImageMagickNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertImageWithImageMagickNodeLocal(input, native)
}

export async function convertImageWithImageMagickNodeRemote(
  source: ConvertImageWithImageMagickNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertImageWithImageMagickNodeClientInputParser().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertImageWithImageMagickNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertImageWithImageMagickNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertImageWithImageMagickNodeLocalInputParser().parse(input)

  const sequence =
    await buildCommandToConvertImageWithImageMagick(localInput)

  await runCommandSequence(sequence)

  return ConvertImageWithImageMagickNodeOutputParser().parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}

export function testConvertImageWithImageMagickNode(
  input: any,
): input is ConvertImageWithImageMagickNodeInput {
  return testConvertImageWithImageMagick(input)
}
