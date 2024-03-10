import {
  ConvertDocumentWithCalibreBrowserInput,
  ConvertDocumentWithCalibreBrowserInputResolver,
  ConvertDocumentWithCalibreBrowserLocalInput,
  ConvertDocumentWithCalibreBrowserOutputResolver,
  ConvertDocumentWithCalibreBrowserRemoteInput,
} from '~/code/type/browser'
import { buildFormDataRequestToConvert } from '../../shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'

export async function convertDocumentWithCalibreBrowser(
  source: ConvertDocumentWithCalibreBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithCalibreBrowserInputResolver().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithCalibreBrowserRemote(
        input,
        native,
      )
    default:
      return await convertDocumentWithCalibreBrowserLocal(input, native)
  }
}

export async function convertDocumentWithCalibreBrowserRemote(
  input: ConvertDocumentWithCalibreBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  const content = await resolveWorkFileAsBlob(request, native)

  return ConvertDocumentWithCalibreBrowserOutputResolver().parse({
    file: {
      content,
    },
  })
}

export async function convertDocumentWithCalibreBrowserLocal(
  input: ConvertDocumentWithCalibreBrowserLocalInput,
  native?: NativeOptions,
) {
  throw kink('task_not_implemented', {
    task: 'convertDocumentWithCalibreBrowserLocal',
  })
}
