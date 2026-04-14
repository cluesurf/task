import { Form } from '@cluesurf/form'

/**
 * `task highlight` — stamp a basic highlight + free-text note on
 * the first page of a PDF. Same underlying implementation as
 * `task mark pdf`; this verb is the preferred surface (shorter,
 * matches how users think about the action).
 */
export const highlight: Form = {
  form: 'form',
  save: '~/code/form/action/highlight',
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
    text: {
      like: 'string',
      need: true,
      name: { mark: 't' },
      note: 'Phrase to highlight / annotate on the first page',
    },
  },
}
