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
 * Build a `POST /<verb>!/<...segments>` request body for the
 * generic verb dispatcher.
 *
 *   - If the input carries any `Blob` / `File` content, the
 *     body is `FormData` with one `payload` field (JSON of
 *     the input minus blobs and the omit list) plus one
 *     `__file__:<dotted-path>` field per blob.
 *   - Otherwise the body is plain JSON.
 *
 * `FormData` would mangle every non-string field on the way
 * across (booleans, numbers, nested objects) — keeping the
 * scalar shape inside JSON sidesteps that and matches the
 * "FormData only for files" rule.
 */
export function buildFormDataRequestForVerb({
  verb,
  segments = [],
  input,
  omit = [['handle']],
}: VerbRequestOptions): Request {
  const stripped = omitNested(input, [...omit] as string[][]) as Record<
    string,
    unknown
  >
  const blobs = collectBlobs(stripped)
  const path = verbPath(verb, segments)

  if (blobs.length === 0) {
    return buildRemoteRequest('POST', path, JSON.stringify(stripped))
  }

  const formData = new FormData()
  formData.append('payload', JSON.stringify(stripped))
  for (const { dottedPath, blob } of blobs) {
    formData.append(`__file__:${dottedPath}`, blob)
  }
  return buildRemoteRequest('POST', path, formData)
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

type BlobEntry = { dottedPath: string; blob: Blob }

/**
 * Walk the input, replacing every Blob / File leaf with
 * `null` and recording its dotted path so the server can
 * splice it back in after reading the multipart upload.
 */
function collectBlobs(
  root: Record<string, unknown>,
): BlobEntry[] {
  const blobs: BlobEntry[] = []
  walk(root, [])
  return blobs

  function walk(node: unknown, trail: string[]): void {
    if (!node || typeof node !== 'object') return
    if (typeof Blob !== 'undefined' && node instanceof Blob) {
      // Replace in-parent — done by the caller via mutation below.
      return
    }
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      if (typeof Blob !== 'undefined' && v instanceof Blob) {
        blobs.push({ dottedPath: [...trail, k].join('.'), blob: v })
        ;(node as Record<string, unknown>)[k] = null
      } else if (v && typeof v === 'object') {
        walk(v, [...trail, k])
      }
    }
  }
}
