import {
  ConvertArchiveBrowserInput,
  ConvertArchiveBrowserInputParser,
  ConvertArchiveBrowserLocalInput,
  ConvertArchiveBrowserOutputParser,
  ConvertArchiveBrowserRemoteInput,
} from '~/code/type/browser/parser'
import { buildFormDataRequestToConvert } from '../shared'
import kink from '~/code/tool/shared/kink'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { testConvertArchive } from './shared'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

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
