import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const formatRubyConsole = buildActionCommand({
  command: 'ruby',
  describe: 'Format Ruby source',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'format_ruby',
  loadHandler: () => import('./node'),
})
