import { Form } from '@cluesurf/form'

/**
 * Action input for `task dump font` — round-trips a font through
 * TTX (fontTools' XML representation). Direction is inferred from
 * the file extensions: `.ttf/.otf → .ttx` dumps; `.ttx → .ttf/.otf`
 * compiles. Anything else throws.
 */

export const dump_font: Form = {
  form: 'form',
  save: '~/code/form/action/dump/font',
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
    tables: {
      like: 'string',
      need: false,
      name: { mark: 't' },
      note: 'Comma list of tables to dump, e.g. "name,head,OS/2"',
    },
  },
}
