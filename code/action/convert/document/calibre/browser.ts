import {
  ConvertDocumentWithCalibreBrowserInput,
  ConvertDocumentWithCalibreBrowserInputParser,
  ConvertDocumentWithCalibreBrowserLocalInput,
  ConvertDocumentWithCalibreBrowserOutputParser,
  ConvertDocumentWithCalibreBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToConvert } from '../../shared.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

export async function convertDocumentWithCalibreBrowser(
  source: ConvertDocumentWithCalibreBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithCalibreBrowserInputParser().parse(source)

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

  return ConvertDocumentWithCalibreBrowserOutputParser().parse({
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
