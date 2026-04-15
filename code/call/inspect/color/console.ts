import { buildActionCommand } from '~/code/tool/shared/console'

export const inspectColorConsole = buildActionCommand({
  command: 'color',
  describe: 'Inspect colors in an image',
  // TODO: form inspect_color_command_input missing from MESH — re-link schema
  options: [],
  path: ['inspect', 'color'],
  loadHandler: () => import('./node'),
})
