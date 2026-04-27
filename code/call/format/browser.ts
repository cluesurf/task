import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task format`. Forwards source
 * code to a task-compatible host on the
 * `/format!/<language>` route and returns the formatted
 * code as a Blob.
 */
async function formatBrowser(
  input: { format: string } & Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'format',
      segments: [input.format],
      input: input as unknown as Record<string, unknown>,
      omit: [['handle'], ['format']],
    },
    native,
  )
}

export default formatBrowser
export { formatBrowser }
