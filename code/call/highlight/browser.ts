import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task highlight`. Forwards the input
 * (file content + fields) to a task-compatible host on the
 * `/highlight!` route. The server reconstructs the input from
 * the multipart body and dispatches to the matching node
 * handler.
 */
async function highlightBrowser(
  input: Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'highlight',
      input,
    },
    native,
  )
}

export default highlightBrowser
export { highlightBrowser }
