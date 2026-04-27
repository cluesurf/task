import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task compile`. Forwards source
 * code + flags to a task-compatible host on the
 * `/compile!/<language>` route and returns the compiled
 * artifact (binary, WASM, IR) as a Blob.
 */
async function compileBrowser(
  input: {
    input: { format: string; file: { content: Blob | File } }
  } & Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'compile',
      segments: [input.input.format],
      input: input as unknown as Record<string, unknown>,
      omit: [['handle'], ['input', 'format']],
    },
    native,
  )
}

export default compileBrowser
export { compileBrowser }
