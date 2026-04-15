import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/render/font/console/options'

export const renderFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Render a text sample through a font to an image',
  options,
  path: ['render', 'font'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'render "Hello" at 128pt to PNG',
      command:
        'task render font -i etch.ttf -o sample.png --text "Hello"',
    },
    {
      comment: 'render to SVG at 64pt',
      command:
        'task render font -i etch.ttf -o sample.svg --text "Hello" --font-size 64',
    },
  ],
})
