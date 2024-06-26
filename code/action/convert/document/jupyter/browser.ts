import {
  ConvertDocumentWithJupyterBrowserInput,
  ConvertDocumentWithJupyterBrowserInputParser,
  ConvertDocumentWithJupyterBrowserLocalInput,
  ConvertDocumentWithJupyterBrowserOutputParser,
  ConvertDocumentWithJupyterBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToConvert } from '../../shared.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'

export async function convertDocumentWithJupyterBrowser(
  source: ConvertDocumentWithJupyterBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithJupyterBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertDocumentWithJupyterBrowserRemote(
        input,
        native,
      )
    default:
      return await convertDocumentWithJupyterBrowserLocal(input, native)
  }
}

export async function convertDocumentWithJupyterBrowserRemote(
  input: ConvertDocumentWithJupyterBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  const content = await resolveWorkFileAsBlob(request, native)

  return ConvertDocumentWithJupyterBrowserOutputParser().parse({
    file: {
      content,
    },
  })
}

export async function convertDocumentWithJupyterBrowserLocal(
  input: ConvertDocumentWithJupyterBrowserLocalInput,
  native?: NativeOptions,
) {
  throw kink('task_not_implemented', {
    task: 'convertDocumentWithJupyterBrowserLocal',
  })
}
