import {
  ConvertImageWithImageMagickBrowserInput,
  ConvertImageWithImageMagickBrowserInputParser,
  ConvertImageWithImageMagickBrowserLocalInput,
  ConvertImageWithImageMagickBrowserRemoteInput,
} from '~/code/type/browser/parser'
import { buildFormDataRequestToConvert } from '../../shared'
import kink from '~/code/tool/shared/kink'
import { testConvertImageWithImageMagick } from './shared'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

export async function convertImageWithImageMagickBrowser(
  source: ConvertImageWithImageMagickBrowserInput,
  native?: NativeOptions,
) {
  const input =
    ConvertImageWithImageMagickBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertImageWithImageMagickBrowserRemote(
        input,
        native,
      )
    default:
      return await convertImageWithImageMagickBrowserLocal(
        input,
        native,
      )
  }
}

export async function convertImageWithImageMagickBrowserRemote(
  input: ConvertImageWithImageMagickBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  return await resolveWorkFileAsBlob(request)
}

export async function convertImageWithImageMagickBrowserLocal(
  input: ConvertImageWithImageMagickBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'convertImageWithImageMagickBrowserLocal',
  })
}

export function testConvertImageWithImageMagickBrowser(
  input: any,
): input is ConvertImageWithImageMagickBrowserInput {
  return testConvertImageWithImageMagick(input)
}
