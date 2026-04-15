import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/format/code/console/options'

export const formatKotlinConsole = buildActionCommand({
  command: 'kotlin',
  describe: 'Format Kotlin source',
  options,
  loadHandler: () => import('./node'),
})
