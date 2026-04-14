import type { CommandModule } from 'yargs'
import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

/**
 * Single-level action: `task archive <input>` bundles paths
 * into an archive. No sub-thing to dispatch on.
 */

export const archiveConsole: CommandModule = buildActionCommand({
  command: 'archive',
  describe: 'Create an archive from one or more inputs',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'archive',
  loadHandler: () => import('./node'),
})
