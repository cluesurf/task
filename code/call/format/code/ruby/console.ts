import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/format/code/shared/console/options'

export const formatRubyConsole = buildActionCommand({
  command: 'ruby',
  describe: 'Format Ruby source',
  options,
  loadHandler: () => import('./node'),
})
