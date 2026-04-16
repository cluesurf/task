export function buildCommandToFlipImage(input: {
  inputPath: string
  outputPath: string
  horizontal?: boolean
  vertical?: boolean
}): { bin: string; args: string[] } {
  if (!input.horizontal && !input.vertical) {
    throw new Error(
      'flip image: pass --horizontal and/or --vertical',
    )
  }

  const bin = 'convert'
  const args: string[] = [input.inputPath]
  // ImageMagick: -flop = horizontal (left/right), -flip = vertical (top/bottom).
  if (input.horizontal) args.push('-flop')
  if (input.vertical) args.push('-flip')
  args.push(input.outputPath)
  return { bin, args }
}
