/**
 * One-call browser → server round-trip.
 *
 *   const out = await dispatchVerbToRemote({
 *     verb: 'compress',
 *     segments: [],
 *     input,
 *   })
 *
 * Per-verb browser modules collapse to:
 *
 *   export default function compressBrowser(input, native?) {
 *     return dispatchVerbToRemote({ verb: 'compress', input }, native)
 *   }
 *
 * The server-side fastify dispatcher in `test/browser/server.ts`
 * (and any task-compatible host) reconstructs the input from
 * the multipart body, dispatches to `task[verb](input)`, and
 * returns a Work envelope.
 */

import {
  buildFormDataRequestForVerb,
  VerbRequestOptions,
} from './remote'
import { resolveWorkFileAsBlob } from './work'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

export type DispatchOptions = Omit<VerbRequestOptions, 'input'> & {
  input: Record<string, unknown>
}

export async function dispatchVerbToRemote(
  options: DispatchOptions,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const request = buildFormDataRequestForVerb(options)
  return await resolveWorkFileAsBlob(request, native)
}
