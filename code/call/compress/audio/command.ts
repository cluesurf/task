import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCommandToCompressAudio(input: {
  inputPath: string
  outputPath: string
  bitrate?: string
}) {
  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    input.inputPath,
    '-b:a',
    input.bitrate ?? '128k',
    input.outputPath,
  )
  return buildCommandSequence(cmd)
}
