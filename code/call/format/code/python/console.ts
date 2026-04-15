import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/format/code/console/options'

export const formatPythonConsole = buildActionCommand({
  command: 'python',
  describe: 'Format Python source',
  options,
  loadHandler: () => import('./node'),
})
