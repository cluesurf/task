import {
  ConvertTxtWithPuppeteerBrowserInput,
  ConvertTxtWithPuppeteerBrowserInputModel,
  ConvertTxtWithPuppeteerBrowserLocalInput,
  ConvertTxtWithPuppeteerBrowserOutputModel,
  ConvertTxtWithPuppeteerBrowserRemoteInput,
  ConvertMarkdownWithPuppeteerBrowserInput,
  ConvertMarkdownWithPuppeteerBrowserInputModel,
  ConvertMarkdownWithPuppeteerBrowserLocalInput,
  ConvertMarkdownWithPuppeteerBrowserOutputModel,
  ConvertMarkdownWithPuppeteerBrowserRemoteInput,
} from '~/code/type/index'
import { buildFormDataRequestToConvert } from '../../shared'
import { WorkFileAsBlob } from '~/code/tool/shared/work'
import { NativeOptions } from '~/code/tool/shared/request'
import kink from '~/code/tool/shared/kink'
import Observable from 'zen-observable'
import { resolveWorkFileAsBlob } from '~/code/tool/browser/work'

export async function convertTxtWithPuppeteerBrowser(
  source: ConvertTxtWithPuppeteerBrowserInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const input = ConvertTxtWithPuppeteerBrowserInputModel.parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertTxtWithPuppeteerBrowserRemote(input, native)
    default:
      return await convertTxtWithPuppeteerBrowserLocal(input, native)
  }
}

export async function convertTxtWithPuppeteerBrowserRemote(
  input: ConvertTxtWithPuppeteerBrowserRemoteInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestToConvert(input)
  return await resolveWorkFileAsBlob(request)
}

export function convertTxtWithPuppeteerBrowserLocal(
  input: ConvertTxtWithPuppeteerBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'convertTxtWithPuppeteerBrowserLocal',
  })
}

export async function convertMarkdownWithPuppeteerBrowser(
  source: ConvertMarkdownWithPuppeteerBrowserInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const input =
    ConvertMarkdownWithPuppeteerBrowserInputModel.parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertMarkdownWithPuppeteerBrowserRemote(
        input,
        native,
      )
    default:
      return await convertMarkdownWithPuppeteerBrowserLocal(
        input,
        native,
      )
  }
}

export async function convertMarkdownWithPuppeteerBrowserRemote(
  input: ConvertMarkdownWithPuppeteerBrowserRemoteInput,
  native?: NativeOptions,
) {
  const request = buildFormDataRequestToConvert(input)
  return await resolveWorkFileAsBlob(request, native)
}

export function convertMarkdownWithPuppeteerBrowserLocal(
  input: ConvertMarkdownWithPuppeteerBrowserLocalInput,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  throw kink('task_not_implemented', {
    task: 'convertTxtWithPuppeteerBrowserLocal',
  })
}
