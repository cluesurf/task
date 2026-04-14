import { Form } from '@cluesurf/form'

export const remove_image_metadata: Form = {
  form: 'form',
  save: '~/code/form/action/remove/metadata/shared',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'i' } },
          },
        },
      },
    },
  },
}

/**
 * `task remove metadata` — strip EXIF / XMP / ID3 tags via
 * exiftool. Accepts both positional `<file>` (in-place) and
 * `-i / -o`.
 */
export const remove_metadata: Form = {
  form: 'form',
  save: '~/code/form/action/remove/metadata',
  link: {
    input: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    output: {
      link: {
        file: {
          link: {
            path: { like: 'string', name: { mark: 'o' }, need: false },
          },
        },
      },
    },
  },
}
