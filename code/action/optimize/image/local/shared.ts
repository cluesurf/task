import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command.js'
import { BuildCommandToOptimizeGifWithGifsicle } from '~/code/type/shared/index.js'

export function buildCommandToOptimizeGifWithGifsicle(
  input: BuildCommandToOptimizeGifWithGifsicle,
) {
  const cmd = getCommand('gifsicle')
  cmd.link.push(`--no-warnings`)
  cmd.link.push(`-o`, input.output.file.path)

  if (input.left || input.right || input.top || input.bottom) {
    const start = [input.left || '0', input.top || '0'].join(',')
    const end = [input.right || '0', input.bottom || '0'].join(',')
    cmd.link.push(`--crop`, `${start}+${end}`)
  }

  if (input.flip) {
    cmd.link.push(`--flip-${input.flip}`)
  }

  if (input.transparent) {
    cmd.link.push(`--transparent`, `"${input.transparent}"`)
  }

  if (input.optimize) {
    cmd.link.push(`-O${input.optimize}`)
  }

  if (input.scale) {
    cmd.link.push(`--scale`, `${input.scale}`)
  }

  return buildCommandSequence(cmd)
}
