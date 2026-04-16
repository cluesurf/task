import { Form } from '@cluesurf/form'

/**
 * Action input for `task extract pages file.pdf --pages 1-3`.
 * Same shape as `task split` — kept as a sibling under the
 * `extract` verb so consumers find it where they'd expect.
 */

export const extract_pdf_pages: Form = {
  form: 'form',
  save: '~/code/form/action/extract/pdf-pages',
  link: {
    input: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    output: {
      need: false,
      link: {
        file: {
          link: { path: { like: 'string', need: false, name: { mark: 'o' } } },
        },
      },
    },
    pages: { like: 'string', name: { mark: 'p' } },
  },
}
