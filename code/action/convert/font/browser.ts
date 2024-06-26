import {
  ConvertFontWithFontForgeBrowserInput,
  ConvertFontWithFontForgeBrowserInputParser,
  ConvertFontWithFontForgeBrowserLocalInput,
  ConvertFontWithFontForgeBrowserOutputParser,
  ConvertFontWithFontForgeBrowserRemoteInput,
} from '~/code/type/browser/parser.js'
import { buildFormDataRequestToConvert } from '../shared.js'
import { WorkFileAsBlob } from '~/code/tool/shared/work.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import kink from '~/code/tool/shared/kink.js'
import { testConvertFontWithFontForge } from './shared.js'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work.js'

export async function convertFontWithFontForgeBrowser(
  source: ConvertFontWithFontForgeBrowserInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const input =
    ConvertFontWithFontForgeBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertFontWithFontForgeBrowserRemote(input, native)
    default:
      return await convertFontWithFontForgeBrowserLocal(input, native)
  }
}

export async function convertFontWithFontForgeBrowserRemote(
  input: ConvertFontWithFontForgeBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  return await resolveWorkFileAsBlob(request, native)
}

export async function convertFontWithFontForgeBrowserLocal(
  source: ConvertFontWithFontForgeBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'convertFontWithFontForgeBrowserLocal',
  })
}

export function testConvertFontWithFontForgeBrowser(
  input: any,
): input is ConvertFontWithFontForgeBrowserInput {
  return testConvertFontWithFontForge(input)
}
