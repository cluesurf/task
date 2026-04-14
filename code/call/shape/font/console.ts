import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const shapeFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Shape text through a font and print the glyph sequence',
  path: ['shape', 'font'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'shape_font',
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
