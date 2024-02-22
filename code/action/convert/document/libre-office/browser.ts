import {
  ConvertDocumentWithLibreOfficeBrowserInput,
  ConvertDocumentWithLibreOfficeBrowserInputModel,
  ConvertDocumentWithLibreOfficeBrowserLocalInput,
  ConvertDocumentWithLibreOfficeBrowserOutputModel,
  ConvertDocumentWithLibreOfficeBrowserRemoteInput,
} from '~/code/type'
import { buildFormDataRequestToConvert } from '../../shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'

export async function convertDocumentWithLibreOfficeBrowser(
  source: ConvertDocumentWithLibreOfficeBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithLibreOfficeBrowserInputModel.parse(source)

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

  return ConvertDocumentWithLibreOfficeBrowserOutputModel.parse({
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
