import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task flip`. Forwards the input
 * (file content + fields) to a task-compatible host on the
 * `/flip!` route. The server reconstructs the input from
 * the multipart body and dispatches to the matching node
 * handler.
 */
async function flipBrowser(
  input: Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'flip',
      input,
    },
    native,
  )
}

export default flipBrowser
export { flipBrowser }
