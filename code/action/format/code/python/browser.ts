import { buildFormDataRequestToFormat } from '../shared.js'
import {
  FormatPythonBrowserInput,
  FormatPythonBrowserInputParser,
  FormatPythonBrowserLocalInput,
  FormatPythonBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

export async function formatPythonBrowser(
  source: FormatPythonBrowserInput,
  native?: NativeOptions,
) {
  const input = FormatPythonBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await formatPythonBrowserRemote(input, native)
    default:
      return await formatPythonBrowserLocal(input, native)
  }
}

export async function formatPythonBrowserRemote(
  input: FormatPythonBrowserRemoteInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestToFormat(input)
  return await resolveWorkFileAsBlob(request)
}

export async function formatPythonBrowserLocal(
  input: FormatPythonBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'formatPythonBrowserLocal',
  })
}
