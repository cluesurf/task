import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCommandToRotateImage(input: {
  inputPath: string
  outputPath: string
  degree: string
}) {
  const cmd = getCommand('convert')
  cmd.link.push(
    input.inputPath,
    '-rotate',
    input.degree,
    input.outputPath,
  )
  return buildCommandSequence(cmd)
}
