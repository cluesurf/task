import { buildFormDataRequestToFormat } from '../shared.js'
import {
  FormatSwiftBrowserInput,
  FormatSwiftBrowserInputParser,
  FormatSwiftBrowserLocalInput,
  FormatSwiftBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

export async function formatSwiftBrowser(
  source: FormatSwiftBrowserInput,
  native?: NativeOptions,
) {
  const input = FormatSwiftBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatSwiftBrowserRemote(input, native)
    default:
      return await formatSwiftBrowserLocal(input, native)
  }
}

export async function formatSwiftBrowserRemote(
  input: FormatSwiftBrowserRemoteInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestToFormat(input)
  return await resolveWorkFileAsBlob(request)
}

export async function formatSwiftBrowserLocal(
  input: FormatSwiftBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'formatSwiftBrowserLocal',
  })
}
