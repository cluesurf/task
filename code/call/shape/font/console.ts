import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/shape/font/console/options'

export const shapeFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Shape text through a font and print the glyph sequence',
  options,
  path: ['shape', 'font'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'basic shaping',
      command: 'task shape font -i etch.ttf --text "office"',
    },
    {
      comment: 'disable ligatures',
      command:
        'task shape font -i etch.ttf --text "office" --features "-liga"',
    },
  ],
})
