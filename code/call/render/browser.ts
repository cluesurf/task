import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task render`. Forwards the input
 * (file content + fields) to a task-compatible host on the
 * `/render!` route. The server reconstructs the input from
 * the multipart body and dispatches to the matching node
 * handler.
 */
async function renderBrowser(
  input: Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'render',
      input,
    },
    native,
  )
}

export default renderBrowser
export { renderBrowser }
