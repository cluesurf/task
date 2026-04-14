import { Form } from '@cluesurf/form'

/**
 * Action input for `task modify file.pdf --order 3,1,2` /
 * `--remove 2,5`. Either flag (mutually exclusive) rewrites the
 * PDF page list; the rest of the file's content / metadata is
 * preserved by pdf-lib's copy.
 */

export const modify_pdf: Form = {
  form: 'form',
  save: '~/code/form/action/modify/pdf',
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
          link: { path: { like: 'string', name: { mark: 'o' } } },
        },
      },
    },
    /** Comma-separated page list defining the NEW order. */
    order: { like: 'string', need: false },
    /** Comma-separated pages to remove. Mutually exclusive with `order`. */
    remove: { like: 'string', need: false },
  },
}
