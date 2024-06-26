import {
  ConvertVideoWithFfmpegNodeInput,
  ConvertVideoWithFfmpegNodeInputParser,
  ConvertVideoWithFfmpegNodeOutputParser,
  ConvertVideoWithFfmpegNodeLocalInternalInput,
  ConvertVideoWithFfmpegNodeLocalExternalInput,
  ConvertVideoWithFfmpegNodeLocalInputParser,
  ConvertVideoWithFfmpegNodeRemoteInput,
  ConvertVideoWithFfmpegNodeClientInputParser,
} from '~/code/type/node/parser.js'
import { buildCommandToConvertVideoWithFfmpeg } from '../command.js'
import { runCommandSequence } from '~/code/tool/node/command.js'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../../tool/node.js'
import { extend } from '~/code/tool/shared/object.js'
import { buildRequestToConvert } from '../../shared.js'
import { resolveWorkFileNode } from '~/code/tool/node/request.js'
import { testConvertVideoWithFfmpeg } from './shared.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

export async function convertVideoWithFfmpegNode(
  source: ConvertVideoWithFfmpegNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertVideoWithFfmpegNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertVideoWithFfmpegNodeRemote(input, native)
    case 'external':
      return await convertVideoWithFfmpegNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertVideoWithFfmpegNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertVideoWithFfmpegNodeLocalExternal(
  source: ConvertVideoWithFfmpegNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertVideoWithFfmpegNodeLocal(input, native)
}

async function convertVideoWithFfmpegNodeLocalInternal(
  source: ConvertVideoWithFfmpegNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertVideoWithFfmpegNodeLocal(input, native)
}

export async function convertVideoWithFfmpegNodeRemote(
  source: ConvertVideoWithFfmpegNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertVideoWithFfmpegNodeClientInputParser().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertVideoWithFfmpegNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertVideoWithFfmpegNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertVideoWithFfmpegNodeLocalInputParser().parse(input)

  const sequence =
    await buildCommandToConvertVideoWithFfmpeg(localInput)

  await runCommandSequence(sequence)

  return ConvertVideoWithFfmpegNodeOutputParser().parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}

export function testConvertVideoWithFfmpegNode(
  input,
): input is ConvertVideoWithFfmpegNodeInput {
  return testConvertVideoWithFfmpeg(input)
}
