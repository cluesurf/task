import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task optimize`. Forwards the input
 * (file content + fields) to a task-compatible host on the
 * `/optimize!` route. The server reconstructs the input from
 * the multipart body and dispatches to the matching node
 * handler.
 */
async function optimizeBrowser(
  input: Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'optimize',
      input,
    },
    native,
  )
}

export default optimizeBrowser
export { optimizeBrowser }
