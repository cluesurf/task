import colorSplat from '@lancejpollard/color-splat'
import {
  InspectColor,
} from '~/code/form/action/inspect/color/shared'export function inspectColor(input: InspectColor) {
  return colorSplat(input.value)
}
