import {
  ConvertFontWithFontForgeNodeInput,
  ConvertFontWithFontForgeNodeLocalExternalInput,
  ConvertFontWithFontForgeNodeLocalInternalInput,
  ConvertFontWithFontForgeNodeRemoteInput,
} from '~/code/form/action/convert/font-forge/node'
import {
  ConvertFontWithFontForgeNodeClientInputParser,
  ConvertFontWithFontForgeNodeInputParser,
  ConvertFontWithFontForgeNodeLocalInputParser,
  ConvertFontWithFontForgeNodeOutputParser,
} from '~/code/form/action/convert/font-forge/node/take'
import {
  buildCommandToConvertFontWithFontForge,
  testConvertFontWithFontForge,
} from './shared'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToConvert } from '../shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'

async function convertFontWithFontForgeNode(
  source: ConvertFontWithFontForgeNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertFontWithFontForgeNodeInputParser.parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertFontWithFontForgeNodeRemote(input, native)
    case 'external':
      return await convertFontWithFontForgeNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertFontWithFontForgeNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertFontWithFontForgeNodeLocalExternal(
  source: ConvertFontWithFontForgeNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertFontWithFontForgeNodeLocal(input)
}

async function convertFontWithFontForgeNodeLocalInternal(
  source: ConvertFontWithFontForgeNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertFontWithFontForgeNodeLocal(input)
}

async function convertFontWithFontForgeNodeRemote(
  source: ConvertFontWithFontForgeNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertFontWithFontForgeNodeClientInputParser.parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return ConvertFontWithFontForgeNodeOutputParser.parse({
    file: {
      path: input.output.file!.path,
    },
  })
}

async function convertFontWithFontForgeNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertFontWithFontForgeNodeLocalInputParser.parse(input)

  const sequence =
    await buildCommandToConvertFontWithFontForge(localInput)

  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'convert', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }

  return ConvertFontWithFontForgeNodeOutputParser.parse({
    file: {
      path: localInput.output.file!.path,
    },
  })
}

export function testConvertFontWithFontForgeNode(
  input: any,
): input is ConvertFontWithFontForgeNodeInput {
  return testConvertFontWithFontForge(input)
}

export default convertFontWithFontForgeNode
export { convertFontWithFontForgeNode }
