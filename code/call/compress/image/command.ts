import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCommandToCompressImage(input: {
  inputPath: string
  outputPath: string
  quality?: string
}) {
  const cmd = getCommand('convert')
  cmd.link.push(
    input.inputPath,
    '-quality',
    input.quality ?? '80',
    input.outputPath,
  )
  return buildCommandSequence(cmd)
}
