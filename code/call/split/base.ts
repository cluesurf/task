import { Form } from '@cluesurf/form'

/**
 * Action input for `task split file.pdf --pages 1-3,5,7-9` —
 * extracts the specified pages into a NEW PDF, leaving the
 * source untouched. `--pages` accepts comma-separated ranges.
 *
 * When `--output-file-path` is omitted, defaults to
 * `<input>.pages-<spec>.pdf`.
 */

export const split: Form = {
  form: 'form',
  save: '~/code/form/action/split',
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
