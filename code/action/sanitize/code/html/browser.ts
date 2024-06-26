import * as DOMPurify from 'dompurify'
import {
  SanitizeHtmlBrowserInput,
  SanitizeHtmlBrowserInputParser,
  SanitizeHtmlBrowserLocalInput,
  SanitizeHtmlBrowserRemoteInput,
} from '~/code/type/browser/parser'
import { testSanitize, buildFormDataRequestToSanitize } from '../shared'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'
import { readFileContentAsString } from '~/code/tool/browser/file'

export async function sanitizeHtmlBrowser(
  source: SanitizeHtmlBrowserInput,
  native?: NativeOptions,
) {
  const input = SanitizeHtmlBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await sanitizeHtmlBrowserRemote(input, native)
    default:
      return await sanitizeHtmlBrowserLocal(input, native)
  }
}

export async function sanitizeHtmlBrowserRemote(
  input: SanitizeHtmlBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToSanitize(input)
  return await resolveWorkFileAsBlob(request)
}

export async function sanitizeHtmlBrowserLocal(
  input: SanitizeHtmlBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const content = await readFileContentAsString(
    input.input.file.content,
    'utf-8',
  )
  const output = DOMPurify.sanitize(content)

  return {
    file: {
      content: new Blob([output], {
        type: 'text/html',
      }),
    },
  }
}

export function testSanitizeHtmlBrowser(
  input: any,
): input is SanitizeHtmlBrowserInput {
  return testSanitize(input)
}
