import { buildFormDataRequestToFormat } from '../shared.js'
import {
  FormatAssemblyBrowserInput,
  FormatAssemblyBrowserInputParser,
  FormatAssemblyBrowserLocalInput,
  FormatAssemblyBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

export async function formatAssemblyBrowser(
  source: FormatAssemblyBrowserInput,
  native?: NativeOptions,
) {
  const input = FormatAssemblyBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatAssemblyBrowserRemote(input, native)
    default:
      return await formatAssemblyBrowserLocal(input, native)
  }
}

export async function formatAssemblyBrowserRemote(
  input: FormatAssemblyBrowserRemoteInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestToFormat(input)
  return await resolveWorkFileAsBlob(request)
}

export async function formatAssemblyBrowserLocal(
  input: FormatAssemblyBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'formatAssemblyBrowserLocal',
  })
}
