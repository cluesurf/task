import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/dump/font/console/options'

export const dumpFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Round-trip a font between binary and TTX (XML)',
  options,
  path: ['dump', 'font'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'dump a font to TTX',
      command: 'task dump font -i etch.ttf -o etch.ttx',
    },
    {
      comment: 'dump only the name + OS/2 tables',
      command: 'task dump font -i etch.ttf -o etch.ttx --tables name,OS/2',
    },
    {
      comment: 'compile TTX back to a binary font',
      command: 'task dump font -i etch.ttx -o etch.ttf',
    },
  ],
})
