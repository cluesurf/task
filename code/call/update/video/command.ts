/**
 * Pure argv builder for `task update video`. Assembles ffmpeg
 * flags to mux a subtitle sidecar into the video container.
 */

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildUpdateVideoCommand(input: {
  inputPath: string
  outputPath: string
  subtitles: string
}) {
  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    input.inputPath,
    '-i',
    input.subtitles,
    '-map',
    '0',
    '-map',
    '1',
    '-c',
    'copy',
    '-c:s',
    'mov_text',
    input.outputPath,
  )
  return buildCommandSequence(cmd)
}
