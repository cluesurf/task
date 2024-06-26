import { serialize as serializeToFormData } from 'object-to-formdata'
import { omitNested } from '~/code/tool/shared/object.js'
import { buildRemoteRequest } from '~/code/tool/shared/request.js'
import { CompileApi } from '~/code/type/shared/index.js'

export type CompileFileTest = {
  input: {
    format: string
  }
  output: {
    format: string
  }
}

export function buildRequestToCompile(input: CompileApi) {
  return buildRemoteRequest(
    'POST',
    `/convert/${input.input.format}/${input.output.format}`,
    omitNested(input, [
      ['handle'],
      ['input', 'format'],
      ['output', 'format'],
    ]),
  )
}

export function buildFormDataRequestToCompile(input: CompileApi) {
  const output = omitNested(input, [
    ['handle'],
    ['input', 'format'],
    ['output', 'format'],
  ])

  const formData = serializeToFormData(output)

  return buildRemoteRequest(
    'POST',
    `/convert/${input.input.format}/${input.output.format}`,
    formData,
  )
}

export type CompileExtension<E extends { input: any; output: any }> =
  Omit<E, 'input' | 'output'> & {
    input: Omit<E['input'], 'format'>
    output: Omit<E['output'], 'format'>
  }

export function testCompileFileInputOutput(
  input: any,
): input is CompileFileTest {
  if (!input) {
    return false
  }

  if (!('input' in input)) {
    return false
  }
  if (!('format' in input.input)) {
    return false
  }
  if (!('output' in input)) {
    return false
  }
  if (!('format' in input.output)) {
    return false
  }
  return true
}
