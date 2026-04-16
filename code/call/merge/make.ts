import { Form } from '@cluesurf/form'

/**
 * Action input for `task merge` — concatenates multiple PDF
 * files into a single PDF in argv order. PDF-only for now;
 * future formats (csv, parquet, audio) can branch off.
 *
 *   task merge a.pdf b.pdf c.pdf -o out.pdf
 */

export const merge: Form = {
  form: 'form',
  save: '~/code/form/action/merge',
  link: {
    inputs: { like: 'string', list: true, name: { mark: 'i' } },
    output: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'o' } } },
        },
      },
    },
  },
}
