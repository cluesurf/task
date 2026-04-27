import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task search`. Forwards the input
 * (file content + fields) to a task-compatible host on the
 * `/search!` route. The server reconstructs the input from
 * the multipart body and dispatches to the matching node
 * handler.
 */
async function searchBrowser(
  input: Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'search',
      input,
    },
    native,
  )
}

export default searchBrowser
export { searchBrowser }
