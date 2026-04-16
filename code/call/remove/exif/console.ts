import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/remove/exif/console/options'

export const removeExifConsole = buildActionCommand({
  command: 'exif',
  describe: 'Strip specific EXIF tags from a file',
  options,
  loadHandler: () => import('./node'),
  path: ['remove', 'exif'],
  examples: [
    {
      comment: 'drop GPS only',
      command: 'task remove exif photo.jpg --preset gps',
    },
    {
      comment: 'drop one tag',
      command:
        'task remove exif photo.jpg --tag GPSLatitude --tag GPSLongitude',
    },
    {
      comment: 'drop serial + owner',
      command:
        'task remove exif photo.jpg --preset device --preset user',
    },
    {
      comment: 'in-place',
      command:
        'task remove exif photo.jpg --preset gps --overwrite',
    },
  ],
})
