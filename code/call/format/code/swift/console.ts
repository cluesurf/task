import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/format/code/console/options'

export const formatSwiftConsole = buildActionCommand({
  command: 'swift',
  describe: 'Format Swift source',
  options,
  loadHandler: () => import('./node'),
})
