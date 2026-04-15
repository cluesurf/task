import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/format/code/console/options'

export const formatAssemblyConsole = buildActionCommand({
  command: 'assembly',
  describe: 'Format assembly source',
  options,
  loadHandler: () => import('./node'),
})
