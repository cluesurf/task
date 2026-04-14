import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const formatKotlinConsole = buildActionCommand({
  command: 'kotlin',
  describe: 'Format Kotlin source',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'format_kotlin_command_input',
  loadHandler: () => import('./node'),
})
