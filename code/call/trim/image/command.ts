import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCommandToTrimImage(input: {
  inputPath: string
  outputPath: string
  geometry: string
}) {
  const cmd = getCommand('convert')
  cmd.link.push(input.inputPath, '-crop', input.geometry, input.outputPath)
  return buildCommandSequence(cmd)
}
