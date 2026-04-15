import type { CommandModule } from 'yargs'
import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/archive/console/options'

/**
 * Single-level action: `task archive <input>` bundles paths
 * into an archive. No sub-thing to dispatch on.
 */

export const archiveConsole: CommandModule = buildActionCommand({
  command: 'archive',
  describe: 'Create an archive from one or more inputs',
  options,
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'archive a directory as a tarball',
      command:
        'task archive --tool tar --input-path ./src -O tar.gz --output-file-path ./dist/src.tar.gz',
    },
  ],
})
