/**
 * `task convert audio` -- re-encode between audio formats with
 * ffmpeg. The output extension picks the codec; `--bitrate` is
 * an optional knob for lossy targets.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertAudio } from './command'

export type ConvertAudioNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  bitrate?: string
}

export async function convertAudioNode(source: ConvertAudioNodeInput) {
  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)

  const command = buildCommandToConvertAudio({
    inputPath: source.input.file.path,
    outputPath,
    bitrate: source.bitrate,
  })
  await spawnAndWait({
    verb: 'convert audio',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

export default convertAudioNode
