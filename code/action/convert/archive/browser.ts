import {
  ConvertArchiveBrowserInput,
  ConvertArchiveBrowserInputParser,
  ConvertArchiveBrowserLocalInput,
  ConvertArchiveBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToConvert } from '../shared.js'
import kink from '~/code/tool/shared/kink.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { testConvertArchive } from './shared.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'

export async function convertArchiveBrowser(
  source: ConvertArchiveBrowserInput,
  native?: NativeOptions,
) {
  const input = ConvertArchiveBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertArchiveBrowserRemote(input, native)
    default:
      return await convertArchiveBrowserLocal(input, native)
  }
}

export async function convertArchiveBrowserRemote(
  input: ConvertArchiveBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  return await resolveWorkFileAsBlob(request, native)
}

export async function convertArchiveBrowserLocal(
  input: ConvertArchiveBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'convertArchiveBrowserLocal',
  })
}

export function testConvertArchiveBrowser(
  input: any,
): input is ConvertArchiveBrowserInput {
  return testConvertArchive(input)
}
