import {
  ConvertDocumentWithPandocBrowserInput,
  ConvertDocumentWithPandocBrowserInputParser,
  ConvertDocumentWithPandocBrowserLocalInput,
  ConvertDocumentWithPandocBrowserOutputParser,
  ConvertDocumentWithPandocBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToConvert } from '../../shared.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

export async function convertDocumentWithPandocBrowser(
  source: ConvertDocumentWithPandocBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithPandocBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithPandocBrowserRemote(input, native)
    default:
      return await convertDocumentWithPandocBrowserLocal(input, native)
  }
}

export async function convertDocumentWithPandocBrowserRemote(
  input: ConvertDocumentWithPandocBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  const content = await resolveWorkFileAsBlob(request)

  return ConvertDocumentWithPandocBrowserOutputParser().parse({
    file: {
      content,
    },
  })
}

export async function convertDocumentWithPandocBrowserLocal(
  input: ConvertDocumentWithPandocBrowserLocalInput,
  native?: NativeOptions,
) {
  throw kink('task_not_implemented', {
    task: 'convertDocumentWithPandocBrowserLocal',
  })
}
