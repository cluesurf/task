import {
  BuildCommandToOptimizeGifWithGifsicle,
} from '~/code/form/action/optimize/image/shared'

export function buildCommandToOptimizeGifWithGifsicle(
  input: BuildCommandToOptimizeGifWithGifsicle,
) {
  const args: string[] = []
  args.push(`--no-warnings`)
  args.push(`-o`, input.output.file!.path)

  if (input.left || input.right || input.top || input.bottom) {
    const start = [input.left || '0', input.top || '0'].join(',')
    const end = [input.right || '0', input.bottom || '0'].join(',')
    args.push(`--crop`, `${start}+${end}`)
  }

  if (input.flip) {
    args.push(`--flip-${input.flip}`)
  }

  if (input.transparent) {
    args.push(`--transparent`, input.transparent)
  }

  if (input.optimize) {
    args.push(`-O${input.optimize}`)
  }

  if (input.scale) {
    args.push(`--scale`, `${input.scale}`)
  }

  return { bin: 'gifsicle', args }
}
