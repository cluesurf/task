import {
  ConvertLatexWithPdfLatexBrowserInput,
  ConvertLatexWithPdfLatexBrowserInputParser,
  ConvertLatexWithPdfLatexBrowserLocalInput,
  ConvertLatexWithPdfLatexBrowserOutputParser,
  ConvertLatexWithPdfLatexBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToConvert } from '../../shared.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

export async function convertLatexWithPdfLatexBrowser(
  source: ConvertLatexWithPdfLatexBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertLatexWithPdfLatexBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertLatexWithPdfLatexBrowserRemote(input, native)
    default:
      return await convertLatexWithPdfLatexBrowserLocal(input, native)
  }
}

export async function convertLatexWithPdfLatexBrowserRemote(
  input: ConvertLatexWithPdfLatexBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  const content = await resolveWorkFileAsBlob(request, native)

  return ConvertLatexWithPdfLatexBrowserOutputParser().parse({
    file: {
      content,
    },
  })
}

export async function convertLatexWithPdfLatexBrowserLocal(
  input: ConvertLatexWithPdfLatexBrowserLocalInput,
  native?: NativeOptions,
) {
  throw kink('task_not_implemented', {
    task: 'convertLatexWithPdfLatexBrowserLocal',
  })
}
