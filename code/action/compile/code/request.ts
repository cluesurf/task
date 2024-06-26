import { buildRemoteRequest } from '~/code/tool/shared/request.js'

export async function buildRequestToCompile(language: string, input) {
  return buildRemoteRequest('POST', `/compile/${language}`, input)
}
