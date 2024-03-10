import {
  CompileCBrowserInput,
  CompileCBrowserInputResolver,
  CompileCBrowserLocalInput,
  CompileCBrowserOutputResolver,
  CompileCBrowserRemoteInput,
} from '~/code/type/browser'
import { buildFormDataRequestToCompile } from '~/code/action/compile/code/shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/action/browser'

export async function compileCBrowser(
  source: CompileCBrowserInput,
  native?: NativeOptions,
) {
  const input = CompileCBrowserInputResolver().parse(source)

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
