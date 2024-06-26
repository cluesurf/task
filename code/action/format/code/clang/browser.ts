import { buildFormDataRequestToFormat } from '../shared.js'
import {
  FormatCodeWithClangFormatBrowserInput,
  FormatCodeWithClangFormatBrowserInputParser,
  FormatCodeWithClangFormatBrowserLocalInput,
  FormatCodeWithClangFormatBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

export async function formatCodeWithClangFormatBrowser(
  source: FormatCodeWithClangFormatBrowserInput,
  native?: NativeOptions,
) {
  const input =
    FormatCodeWithClangFormatBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatCodeWithClangFormatBrowserRemote(input, native)
    default:
      return await formatCodeWithClangFormatBrowserLocal(input, native)
  }
}

export async function formatCodeWithClangFormatBrowserRemote(
  input: FormatCodeWithClangFormatBrowserRemoteInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestToFormat(input)
  return await resolveWorkFileAsBlob(request)
}

export async function formatCodeWithClangFormatBrowserLocal(
  input: FormatCodeWithClangFormatBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'formatCodeWithClangFormatBrowserLocal',
  })
}
