import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task sanitize`. Forwards content
 * to a task-compatible host on the `/sanitize!/<language>`
 * route (e.g. `/sanitize!/html`) and returns the cleaned
 * output as a Blob.
 */
async function sanitizeBrowser(
  input: { format: string } & Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'sanitize',
      segments: [input.format],
      input: input as unknown as Record<string, unknown>,
      omit: [['handle'], ['format']],
    },
    native,
  )
}

export default sanitizeBrowser
export { sanitizeBrowser }
