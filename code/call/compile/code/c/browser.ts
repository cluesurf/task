import { CompileCBrowserInputParser } from '~/code/form/action/compile/code/c/browser/take'
import {
  CompileCBrowserInput,
  CompileCBrowserLocalInput,
  CompileCBrowserRemoteInput,
} from '~/code/form/action/compile/code/c/browser/index'
import { buildFormDataRequestToCompile } from '~/code/call/compile/code/shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

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
