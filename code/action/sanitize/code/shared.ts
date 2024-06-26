import { serializeToFormData } from '~/code/tool/shared/form.js'
import { omitNested } from '~/code/tool/shared/object.js'
import { buildRemoteRequest } from '~/code/tool/shared/request.js'
import { SanitizeApi } from '~/code/type/shared/index.js'

export function buildRequestToSanitize(input: SanitizeApi) {
  return buildRemoteRequest(
    'POST',
    `/sanitize/${input.input.format}/`,
    omitNested(input, [
      ['handle'],
      ['input', 'format'],
      ['output', 'format'],
    ]),
  )
}

export function buildFormDataRequestToSanitize(input: SanitizeApi) {
  const output = omitNested(input, [
    ['handle'],
    ['input', 'format'],
    ['output', 'format'],
  ])

  const formData = serializeToFormData(output)

  return buildRemoteRequest(
    'POST',
    `/sanitize/${input.input.format}`,
    formData,
  )
}

export type SanitizeTest = {
  input: {
    format: string
  }
}

export type SanitizeExtension<E extends { input: any }> = Omit<
  E,
  'input'
> & {
  input: Omit<E['input'], 'format'>
}

export function testSanitize(input: any): input is SanitizeTest {
  if (!input) {
    return false
  }

  if (!('input' in input)) {
    return false
  }
  if (!('format' in input.input)) {
    return false
  }
  return true
}
