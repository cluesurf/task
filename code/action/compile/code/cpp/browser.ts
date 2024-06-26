import {
  CompileCppBrowserInput,
  CompileCppBrowserInputParser,
  CompileCppBrowserLocalInput,
  CompileCppBrowserOutputParser,
  CompileCppBrowserRemoteInput,
} from '~/code/type/browser/parser'
import { buildFormDataRequestToCompile } from '~/code/action/compile/code/shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

export async function compileCppBrowser(
  source: CompileCppBrowserInput,
  native?: NativeOptions,
) {
  const input = CompileCppBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await compileCppBrowserRemote(input, native)
    default:
      return await compileCppBrowserLocal(input, native)
  }
}

export async function compileCppBrowserRemote(
  input: CompileCppBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToCompile(input)
  return await resolveWorkFileAsBlob(request, native)
}

export async function compileCppBrowserLocal(
  input: CompileCppBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'compileCppBrowserLocal',
  })
}
