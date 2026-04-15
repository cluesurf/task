import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/format/code/console/options'

export const formatClangConsole = buildActionCommand({
  command: 'clang',
  describe: 'Format C/C++/ObjC source with clang-format',
  options,
  loadHandler: () => import('./node'),
})
