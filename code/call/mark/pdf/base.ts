import { Form } from '@cluesurf/form'

/**
 * Action input for `task mark pdf file.pdf --highlight "important"`.
 * "Basic" highlight: pdf-lib doesn't surface text positions, so
 * a true text-coordinate highlight isn't viable from here. We
 * approximate by:
 *
 *   1. Stamping a yellow rectangle near the top of the first
 *      page with the highlighted phrase as a label.
 *   2. Adding a free-text annotation with the same label.
 *
 * Sufficient for "I want to flag a phrase in this PDF" without
 * pulling in a heavier text-position library (mupdf, pdfjs).
 */

export const mark_pdf: Form = {
  form: 'form',
  save: '~/code/form/action/mark/pdf',
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
    highlight: { like: 'string' },
  },
}
