import { Form } from '@cluesurf/form'

/**
 * Action input for `task compress font` — turns a TTF/OTF into a
 * WOFF2 wrapper via `woff2_compress`. The best single-step web
 * optimization short of also subsetting.
 */

export const compress_font: Form = {
  form: 'form',
  save: '~/code/form/action/compress/font',
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
