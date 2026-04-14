import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const renderFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Render a text sample through a font to an image',
  path: ['render', 'font'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'render_font',
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
