import {
  ConvertDocumentWithLibreOfficeBrowserInput,
  ConvertDocumentWithLibreOfficeBrowserInputParser,
  ConvertDocumentWithLibreOfficeBrowserLocalInput,
  ConvertDocumentWithLibreOfficeBrowserOutputParser,
  ConvertDocumentWithLibreOfficeBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToConvert } from '../../shared.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

export async function convertDocumentWithLibreOfficeBrowser(
  source: ConvertDocumentWithLibreOfficeBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithLibreOfficeBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithLibreOfficeBrowserRemote(
        input,
        native,
      )
    default:
      return await convertDocumentWithLibreOfficeBrowserLocal(
        input,
        native,
      )
  }
}

export async function convertDocumentWithLibreOfficeBrowserRemote(
  input: ConvertDocumentWithLibreOfficeBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  const content = await resolveWorkFileAsBlob(request, native)

  return ConvertDocumentWithLibreOfficeBrowserOutputParser().parse({
    file: {
      content,
    },
  })
}

export async function convertDocumentWithLibreOfficeBrowserLocal(
  input: ConvertDocumentWithLibreOfficeBrowserLocalInput,
  native?: NativeOptions,
) {
  throw kink('task_not_implemented', {
    task: 'convertDocumentWithLibreOfficeBrowserLocal',
  })
}
