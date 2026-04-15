import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/format/code/console/options'

export const formatRustConsole = buildActionCommand({
  command: 'rust',
  describe: 'Format Rust source',
  options,
  loadHandler: () => import('./node'),
})
