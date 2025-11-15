import colorSplat from '@lancejpollard/color-splat'
import { InspectColor } from '~/code/form/shared/index'

export function inspectColor(input: InspectColor) {
  return colorSplat(input.value)
}
