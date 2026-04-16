import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/remove/profile/console/options'

export const removeProfileConsole = buildActionCommand({
  command: 'profile',
  describe:
    'Strip embedded color / metadata profiles from an image',
  options,
  loadHandler: () => import('./node'),
  path: ['remove', 'profile'],
  examples: [
    {
      comment: 'drop embedded profile',
      command: 'task remove profile photo.jpg',
    },
  ],
})
