import {
  ConvertDocumentWithJupyterBrowserInput,
  ConvertDocumentWithJupyterBrowserInputResolver,
  ConvertDocumentWithJupyterBrowserLocalInput,
  ConvertDocumentWithJupyterBrowserOutputResolver,
  ConvertDocumentWithJupyterBrowserRemoteInput,
} from '~/code/type/browser'
import { buildFormDataRequestToConvert } from '../../shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'

export async function convertDocumentWithJupyterBrowser(
  source: ConvertDocumentWithJupyterBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertDocumentWithJupyterBrowserInputResolver().parse(source)

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

  return ConvertDocumentWithJupyterBrowserOutputResolver().parse({
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
