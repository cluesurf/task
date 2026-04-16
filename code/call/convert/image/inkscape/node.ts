import {
  ConvertImageWithInkscapeNodeInput,
  ConvertImageWithInkscapeNodeLocalExternalInput,
  ConvertImageWithInkscapeNodeLocalInternalInput,
  ConvertImageWithInkscapeNodeRemoteInput,
} from '~/code/form/action/convert/inkscape/node'
import {
  ConvertImageWithInkscapeNodeClientInputParser,
  ConvertImageWithInkscapeNodeInputParser,
  ConvertImageWithInkscapeNodeLocalInputParser,
  ConvertImageWithInkscapeNodeOutputParser,
} from '~/code/form/action/convert/inkscape/node/take'
import { buildCommandToConvertImageWithInkscape } from '../command'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../../tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToConvert } from '../../shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { testConvertImageWithInkscape } from './shared'
import { NativeOptions } from '~/code/tool/shared/request'

async function convertImageWithInkscapeNode(
  source: ConvertImageWithInkscapeNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertImageWithInkscapeNodeInputParser.parse(source)

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

async function convertImageWithInkscapeNodeRemote(
  source: ConvertImageWithInkscapeNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertImageWithInkscapeNodeClientInputParser.parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return ConvertImageWithInkscapeNodeOutputParser.parse({
    file: {
      path: input.output.file!.path,
    },
  })
}

async function convertImageWithInkscapeNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertImageWithInkscapeNodeLocalInputParser.parse(input)

  const sequence =
    await buildCommandToConvertImageWithInkscape(localInput)

  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'convert', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }

  return ConvertImageWithInkscapeNodeOutputParser.parse({
    file: {
      path: localInput.output.file!.path,
    },
  })
}

export function testConvertImageWithInkscapeNode(
  input: any,
): input is ConvertImageWithInkscapeNodeInput {
  return testConvertImageWithInkscape(input)
}

export default convertImageWithInkscapeNode
export { convertImageWithInkscapeNode }
