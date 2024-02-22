import colorSplat from '@lancejpollard/color-splat.js'
import { InspectColor } from '~/code/type/index'

export function inspectColor(input: InspectColor) {
  return colorSplat(input.value)
}
