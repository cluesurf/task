import {
  CompileRustBrowserInput,
  CompileRustBrowserInputParser,
  CompileRustBrowserLocalInput,
  CompileRustBrowserRemoteInput,
} from '~/code/type/browser/parser'
import { buildFormDataRequestToCompile } from '~/code/action/compile/code/shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

export async function compileRustBrowser(
  source: CompileRustBrowserInput,
  native?: NativeOptions,
) {
  const input = CompileRustBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await compileRustBrowserRemote(input, native)
    default:
      return await compileRustBrowserLocal(input, native)
  }
}

export async function compileRustBrowserRemote(
  input: CompileRustBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToCompile(input)
  return await resolveWorkFileAsBlob(request, native)
}

export async function compileRustBrowserLocal(
  input: CompileRustBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'compileRustBrowserLocal',
  })
}
