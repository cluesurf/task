import {
  CompileCppBrowserInput,
  CompileCppBrowserInputParser,
  CompileCppBrowserLocalInput,
  CompileCppBrowserOutputParser,
  CompileCppBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToCompile } from '~/code/action/compile/code/shared.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

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
