import {
  ConvertImageWithInkscapeBrowserInput,
  ConvertImageWithInkscapeBrowserInputParser,
  ConvertImageWithInkscapeBrowserLocalInput,
  ConvertImageWithInkscapeBrowserOutputParser,
  ConvertImageWithInkscapeBrowserRemoteInput,
} from '~/code/type/browser/parser'
import { buildFormDataRequestToConvert } from '../../shared'
import kink from '~/code/tool/shared/kink'
import { testConvertImageWithInkscape } from './shared'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'

export async function convertImageWithInkscapeBrowser(
  source: ConvertImageWithInkscapeBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertImageWithInkscapeBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertImageWithInkscapeBrowserRemote(input, native)
    default:
      return await convertImageWithInkscapeBrowserLocal(input, native)
  }
}

export async function convertImageWithInkscapeBrowserRemote(
  input: ConvertImageWithInkscapeBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  const content = await resolveWorkFileAsBlob(request, native)

  return {
    file: {
      content,
    },
  }
}

export async function convertImageWithInkscapeBrowserLocal(
  input: ConvertImageWithInkscapeBrowserLocalInput,
  native?: NativeOptions,
) {
  throw kink('task_not_implemented', {
    task: 'convertImageWithInkscapeBrowserLocal',
  })
}

export function testConvertImageWithInkscapeBrowser(
  input: any,
): input is ConvertImageWithInkscapeBrowserInput {
  return testConvertImageWithInkscape(input)
}
