import {
  CompileSwiftBrowserInput,
  CompileSwiftBrowserInputParser,
  CompileSwiftBrowserLocalInput,
  CompileSwiftBrowserOutputParser,
  CompileSwiftBrowserRemoteInput,
} from '~/code/type/browser/parser'
import { buildFormDataRequestToCompile } from '~/code/action/compile/code/shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

export async function compileSwiftBrowser(
  source: CompileSwiftBrowserInput,
  native?: NativeOptions,
) {
  const input = CompileSwiftBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await compileSwiftBrowserRemote(input, native)
    default:
      return await compileSwiftBrowserLocal(input, native)
  }
}

export async function compileSwiftBrowserRemote(
  input: CompileSwiftBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToCompile(input)
  return await resolveWorkFileAsBlob(request, native)
}

export async function compileSwiftBrowserLocal(
  input: CompileSwiftBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'compileSwiftBrowserLocal',
  })
}
