import {
  CompileCBrowserInput,
  CompileCBrowserInputParser,
  CompileCBrowserLocalInput,
  CompileCBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToCompile } from '~/code/action/compile/code/shared.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

export async function compileCBrowser(
  source: CompileCBrowserInput,
  native?: NativeOptions,
) {
  const input = CompileCBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await compileCBrowserRemote(input, native)
    default:
      return await compileCBrowserLocal(input, native)
  }
}

export async function compileCBrowserRemote(
  input: CompileCBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToCompile(input)
  return await resolveWorkFileAsBlob(request, native)
}

export async function compileCBrowserLocal(
  input: CompileCBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'compileCBrowserLocal',
  })
}
