/**
 * Pure argv builder for `task normalize audio`. Assembles ffmpeg
 * flags for the loudnorm filter with EBU R128 defaults.
 */

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildNormalizeAudioCommand(input: {
  inputPath: string
  outputPath: string
  target?: string
  peak?: string
  range?: string
}) {
  const target = input.target ?? '-16'
  const peak = input.peak ?? '-1'
  const range = input.range ?? '11'
  const filter = `loudnorm=I=${target}:TP=${peak}:LRA=${range}`

  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    input.inputPath,
    '-af',
    filter,
    input.outputPath,
  )
  return buildCommandSequence(cmd)
}
