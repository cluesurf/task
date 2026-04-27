import { dispatchVerbToRemote } from '~/code/tool/browser/dispatch'
import { NativeOptions } from '~/code/tool/shared/request'
import { WorkFileAsBlob } from '~/code/tool/shared/work'

/**
 * Browser entrypoint for `task convert`. Forwards the input
 * (file content + fields) to a task-compatible host on the
 * `/convert!/<inputFormat>/<outputFormat>` route and returns
 * the produced file as a Blob. The server picks the right
 * tool (imagemagick, ffmpeg, libre-office, ...) based on
 * the format pair.
 */
async function convertBrowser(
  input: {
    input: { format: string; file: { content: Blob | File; sha256?: string } }
    output: { format: string }
  } & Record<string, unknown>,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  return dispatchVerbToRemote(
    {
      verb: 'convert',
      segments: [input.input.format, input.output.format],
      input: input as unknown as Record<string, unknown>,
      omit: [['handle'], ['input', 'format'], ['output', 'format']],
    },
    native,
  )
}

export default convertBrowser
export { convertBrowser }
