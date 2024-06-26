import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import fsp from 'fs/promises'
import {
  SanitizeHtmlNodeInput,
  SanitizeHtmlNodeInputParser,
  SanitizeHtmlNodeOutputParser,
  SanitizeHtmlNodeLocalInternalInput,
  SanitizeHtmlNodeLocalExternalInput,
  SanitizeHtmlNodeLocalInputParser,
  SanitizeHtmlNodeRemoteInput,
  SanitizeHtmlNodeClientInputParser,
} from '~/code/type/node/parser'
import {
  resolveInputForSanitizeLocalExternalNode,
  resolveInputForSanitizeLocalInternalNode,
  resolveInputForSanitizeRemoteNode,
} from '~/code/action/sanitize/code/tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToSanitize, testSanitize } from '../shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'

let window
let purify

// https://www.npmjs.com/package/dompurify

function getSanitizer() {
  window ??= new JSDOM('').window
  purify ??= DOMPurify(window)
  return purify
}

export async function sanitizeHtmlNode(
  source: SanitizeHtmlNodeInput,
  native?: NativeOptions,
) {
  const input = SanitizeHtmlNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await sanitizeHtmlNodeRemote(input, native)
    case 'external':
      return await sanitizeHtmlNodeLocalExternal(input, native)
    default:
      return await sanitizeHtmlNodeLocalInternal(input, native)
  }
}

async function sanitizeHtmlNodeLocalExternal(
  source: SanitizeHtmlNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForSanitizeLocalExternalNode(
    source as any,
  )
  return await sanitizeHtmlNodeLocal(input)
}

async function sanitizeHtmlNodeLocalInternal(
  source: SanitizeHtmlNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForSanitizeLocalInternalNode(
    source as any,
  )
  return await sanitizeHtmlNodeLocal(input)
}

export async function sanitizeHtmlNodeRemote(
  source: SanitizeHtmlNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForSanitizeRemoteNode(source as any)
  const clientInput = SanitizeHtmlNodeClientInputParser().parse(
    extend(input, { handle: 'client' }),
  )

  const request = buildRequestToSanitize(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return SanitizeHtmlNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function sanitizeHtmlNodeLocal(
  input,
  native?: NativeOptions,
) {
  const localInput = SanitizeHtmlNodeLocalInputParser().parse(input)
  const content = await fsp.readFile(
    localInput.input.file.path,
    'utf-8',
  )

  const output = getSanitizer().sanitize(content)

  await fsp.writeFile(localInput.output.file.path, output)

  return {
    file: {
      path: localInput.output.file.path,
    },
  }
}

export function testSanitizeHtmlNode(
  input: any,
): input is SanitizeHtmlNodeInput {
  return testSanitize(input)
}
