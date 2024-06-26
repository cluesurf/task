import { buildFormDataRequestToFormat } from '../shared'
import {
  FormatAssemblyBrowserInput,
  FormatAssemblyBrowserInputParser,
  FormatAssemblyBrowserLocalInput,
  FormatAssemblyBrowserRemoteInput,
} from '~/code/type/browser/parser'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

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
