import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/subset/font/console/options'

export const subsetFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Subset a font to a given set of glyphs or codepoints',
  options,
  path: ['subset', 'font'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'keep only the glyphs needed to render "Hello world"',
      command:
        'task subset font -i etch.ttf -o etch.min.ttf --text "Hello world"',
    },
    {
      comment: 'subset Latin range and emit a web-ready woff2',
      command:
        'task subset font -i etch.ttf -o etch.latin.woff2 --unicodes U+0020-007F --flavor woff2',
    },
  ],
})
