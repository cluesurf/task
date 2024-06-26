import {
  ConvertDocumentWithEnscriptBrowserInput,
  ConvertDocumentWithEnscriptBrowserInputParser,
  ConvertDocumentWithEnscriptBrowserLocalInput,
  ConvertDocumentWithEnscriptBrowserOutputParser,
  ConvertDocumentWithEnscriptBrowserRemoteInput,
} from '~/code/type/browser/parser'
import { buildFormDataRequestToConvert } from '../../shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'

export async function convertDocumentWithEnscriptBrowser(
  source: ConvertDocumentWithEnscriptBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithEnscriptBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithEnscriptBrowserRemote(
        input,
        native,
      )
    default:
      return await convertDocumentWithEnscriptBrowserLocal(
        input,
        native,
      )
  }
}

export async function convertDocumentWithEnscriptBrowserRemote(
  input: ConvertDocumentWithEnscriptBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  const content = await resolveWorkFileAsBlob(request, native)

  return ConvertDocumentWithEnscriptBrowserOutputParser().parse({
    file: {
      content,
    },
  })
}

export async function convertDocumentWithEnscriptBrowserLocal(
  input: ConvertDocumentWithEnscriptBrowserLocalInput,
  native?: NativeOptions,
) {
  throw kink('task_not_implemented', {
    task: 'convertDocumentWithEnscriptBrowserLocal',
  })
}
