import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/search/console/options'

export const searchConsole = buildActionCommand({
  command: 'search',
  describe: 'Search file contents (ripgrep) or filenames (fd) under a path',
  options,
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'find files named `config`',
      command: 'task search --name config',
    },
    {
      comment: 'find ts files matching a regex pattern',
      command: 'task search --name "\\.ts$" src/',
    },
    {
      comment: 'grep for `useState` in ts files',
      command: 'task search "useState" --type ts',
    },
    {
      comment: 'find json files named `config`',
      command: 'task search --name config --type json',
    },
    {
      comment: 'list every file ripgrep would scan, hidden + ignored too',
      command: 'task search --files --hidden',
    },
  ],
})
