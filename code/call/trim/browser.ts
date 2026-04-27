import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task trim`. Forwards the input
 * (file content + fields) to a task-compatible host on the
 * `/trim!` route. The server reconstructs the input from
 * the multipart body and dispatches to the matching node
 * handler.
 */
async function trimBrowser(
  input: Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'trim',
      input,
    },
    native,
  )
}

export default trimBrowser
export { trimBrowser }
