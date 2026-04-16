import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCommandToFlipImage(input: {
  inputPath: string
  outputPath: string
  horizontal?: boolean
  vertical?: boolean
}) {
  if (!input.horizontal && !input.vertical) {
    throw new Error(
      'flip image: pass --horizontal and/or --vertical',
    )
  }

  const cmd = getCommand('convert')
  cmd.link.push(input.inputPath)
  // ImageMagick: -flop = horizontal (left/right), -flip = vertical (top/bottom).
  if (input.horizontal) cmd.link.push('-flop')
  if (input.vertical) cmd.link.push('-flip')
  cmd.link.push(input.outputPath)
  return buildCommandSequence(cmd)
}
