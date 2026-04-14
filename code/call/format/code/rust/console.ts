import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const formatRustConsole = buildActionCommand({
  command: 'rust',
  describe: 'Format Rust source',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'format_rust_command_input',
  loadHandler: () => import('./node'),
})
