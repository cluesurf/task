import { buildFormDataRequestToFormat } from '../shared.js'
import {
  FormatRustBrowserInput,
  FormatRustBrowserInputParser,
  FormatRustBrowserLocalInput,
  FormatRustBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

export async function formatRustBrowser(
  source: FormatRustBrowserInput,
  native?: NativeOptions,
) {
  const input = FormatRustBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatRustBrowserRemote(input, native)
    default:
      return await formatRustBrowserLocal(input, native)
  }
}

export async function formatRustBrowserRemote(
  input: FormatRustBrowserRemoteInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestToFormat(input)
  return await resolveWorkFileAsBlob(request)
}

export async function formatRustBrowserLocal(
  input: FormatRustBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'formatRustBrowserLocal',
  })
}
