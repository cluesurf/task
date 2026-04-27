/**
 * Generic browser → server request builder.
 *
 *   const request = buildFormDataRequestForVerb({
 *     verb: 'convert',
 *     segments: [input.input.format, input.output.format],
 *     input,
 *     omit: [
 *       ['handle'],
 *       ['input', 'format'],
 *       ['output', 'format'],
 *     ],
 *   })
 *   const result = await resolveWorkFileAsBlob(request, native)
 *
 * Per-verb browser handlers used to hand-roll the URL and
 * the FormData serialization in their own `shared.ts`. This
 * helper lets every new verb skip that boilerplate — wire
 * the URL segments and the omit-list, hand the rest off.
 *
 * Verb URLs end in `!` to mark them as side-effecting
 * actions in logs and route tables (vs nouns like
 * `/work/:id`, `/files/:id`).
 */

import { serializeToFormData } from '~/code/tool/shared/form'
import { omitNested } from '~/code/tool/shared/object'
import { buildRemoteRequest, Request } from '~/code/tool/shared/request'

export type VerbRequestOptions = {
  /** Top-level verb name. URL becomes `/<verb>!/...`. */
  verb: string
  /** Path segments appended after the verb (e.g. format pair, language). */
  segments?: ReadonlyArray<string | undefined>
  /** The browser-side input object. File content fields are picked up by `serializeToFormData`. */
  input: Record<string, unknown>
  /**
   * Field paths to drop before serialization (e.g. `[['handle'], ['input', 'format']]`).
   * `handle` and any field already encoded in `segments` should always be omitted —
   * the server reconstructs them from the URL.
   */
  omit?: ReadonlyArray<ReadonlyArray<string>>
}

/**
 * Build a `POST /<verb>!/<...segments>` request whose body
 * is multipart FormData over the input minus omitted fields.
 */
export function buildFormDataRequestForVerb({
  verb,
  segments = [],
  input,
  omit = [['handle']],
}: VerbRequestOptions): Request {
  const stripped = omitNested(input, [...omit] as string[][])
  const formData = serializeToFormData(stripped)
  return buildRemoteRequest('POST', verbPath(verb, segments), formData)
}

/**
 * Build a `POST /<verb>!/<...segments>` request whose body
 * is JSON. Use for verbs that don't carry file content
 * (`fetch`, `inspect dns`, `query`, etc.) — `resolveWork...`
 * still polls the same envelope flow.
 */
export function buildJsonRequestForVerb({
  verb,
  segments = [],
  input,
  omit = [['handle']],
}: VerbRequestOptions): Request {
  const stripped = omitNested(input, [...omit] as string[][])
  return buildRemoteRequest('POST', verbPath(verb, segments), stripped)
}

function verbPath(
  verb: string,
  segments: ReadonlyArray<string | undefined>,
): string {
  const tail = segments.filter(s => s !== undefined && s !== '').join('/')
  return tail ? `/${verb}!/${tail}` : `/${verb}!`
}
