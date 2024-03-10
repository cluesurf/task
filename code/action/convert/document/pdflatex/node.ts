import {
  ConvertLatexWithPdfLatexNodeInput,
  ConvertLatexWithPdfLatexNodeInputResolver,
  ConvertLatexWithPdfLatexNodeOutputResolver,
  ConvertLatexWithPdfLatexNodeLocalInternalInput,
  ConvertLatexWithPdfLatexNodeLocalExternalInput,
  ConvertLatexWithPdfLatexNodeLocalInputResolver,
  ConvertLatexWithPdfLatexNodeRemoteInput,
  ConvertLatexWithPdfLatexNodeClientInputResolver,
} from '~/code/type/node'
import { buildCommandToConvertLatexWithPdfLatex } from '../command'
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
import { NativeOptions } from '~/code/tool/shared/request'

export async function convertLatexWithPdfLatexNode(
  source: ConvertLatexWithPdfLatexNodeInput,
  native?: NativeOptions,
) {
  const input =
    ConvertLatexWithPdfLatexNodeInputResolver().parse(source)

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

export async function convertLatexWithPdfLatexNodeRemote(
  source: ConvertLatexWithPdfLatexNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertLatexWithPdfLatexNodeClientInputResolver().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertLatexWithPdfLatexNodeOutputResolver().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertLatexWithPdfLatexNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput =
    ConvertLatexWithPdfLatexNodeLocalInputResolver().parse(input)

  const sequence =
    await buildCommandToConvertLatexWithPdfLatex(localInput)

  const outputPath = path.join(
    localInput.output.directory.path,
    'document.pdf',
  )

  await runCommandSequence(sequence)

  return ConvertLatexWithPdfLatexNodeOutputResolver().parse({
    file: {
      path: outputPath,
    },
  })
}
