import {
  ConvertLatexWithPdfLatexNodeInput,
  ConvertLatexWithPdfLatexNodeLocalExternalInput,
  ConvertLatexWithPdfLatexNodeLocalInternalInput,
  ConvertLatexWithPdfLatexNodeRemoteInput,
} from '~/code/form/action/convert/pdf-latex/node'
import {
  ConvertLatexWithPdfLatexNodeClientInputParser,
  ConvertLatexWithPdfLatexNodeInputParser,
  ConvertLatexWithPdfLatexNodeLocalInputParser,
  ConvertLatexWithPdfLatexNodeOutputParser,
} from '~/code/form/action/convert/pdf-latex/node/take'
import { buildCommandToConvertLatexWithPdfLatex } from '../command'
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
import { NativeOptions } from '~/code/tool/shared/request'

async function convertLatexWithPdfLatexNode(
  source: ConvertLatexWithPdfLatexNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertLatexWithPdfLatexNodeInputParser.parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertLatexWithPdfLatexNodeRemote(input, native)
    case 'external':
      return await convertLatexWithPdfLatexNodeLocalExternal(
        input,
        native,
      )
    default:
      return await convertLatexWithPdfLatexNodeLocalInternal(
        input,
        native,
      )
  }
}

async function convertLatexWithPdfLatexNodeLocalExternal(
  source: ConvertLatexWithPdfLatexNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertLatexWithPdfLatexNodeLocal(input, native)
}

async function convertLatexWithPdfLatexNodeLocalInternal(
  source: ConvertLatexWithPdfLatexNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertLatexWithPdfLatexNodeLocal(input, native)
}

async function convertLatexWithPdfLatexNodeRemote(
  source: ConvertLatexWithPdfLatexNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertLatexWithPdfLatexNodeClientInputParser.parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file!.path)

  return ConvertLatexWithPdfLatexNodeOutputParser.parse({
    file: {
      path: input.output.file!.path,
    },
  })
}

async function convertLatexWithPdfLatexNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertLatexWithPdfLatexNodeLocalInputParser.parse(input)

  const sequence =
    await buildCommandToConvertLatexWithPdfLatex(localInput)

  const outputPath = path.join(
    localInput.output.directory.path,
    'document.pdf',
  )

  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'convert', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }

  return ConvertLatexWithPdfLatexNodeOutputParser.parse({
    file: {
      path: outputPath,
    },
  })
}

export default convertLatexWithPdfLatexNode
export { convertLatexWithPdfLatexNode }
