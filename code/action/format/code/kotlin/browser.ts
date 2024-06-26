import { buildFormDataRequestToFormat } from '../shared.js'
import {
  FormatKotlinBrowserInput,
  FormatKotlinBrowserInputParser,
  FormatKotlinBrowserLocalInput,
  FormatKotlinBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

export async function formatKotlinBrowser(
  source: FormatKotlinBrowserInput,
  native?: NativeOptions,
) {
  const input = FormatKotlinBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatKotlinBrowserRemote(input, native)
    default:
      return await formatKotlinBrowserLocal(input, native)
  }
}

export async function formatKotlinBrowserRemote(
  input: FormatKotlinBrowserRemoteInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestToFormat(input)
  return await resolveWorkFileAsBlob(request)
}

export async function formatKotlinBrowserLocal(
  input: FormatKotlinBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'formatKotlinBrowserLocal',
  })
}
