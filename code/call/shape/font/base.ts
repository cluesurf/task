import { Form } from '@cluesurf/form'

/**
 * Action input for `task shape font` — shape a string through a
 * font with HarfBuzz and print the resulting glyph sequence with
 * positions. The standard tool for debugging OpenType features,
 * ligatures, and script shaping.
 */

export const shape_font: Form = {
  form: 'form',
  save: '~/code/form/action/shape/font',
  link: {
    input: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    text: {
      like: 'string',
      need: true,
      name: { mark: 't' },
      note: 'Text to shape through the font',
    },
    features: {
      like: 'string',
      need: false,
      note: 'OpenType features, e.g. "+liga,-kern"',
    },
    script: {
      like: 'string',
      need: false,
      note: 'ISO 15924 script tag, e.g. "latn"',
    },
    language: {
      like: 'string',
      need: false,
      note: 'BCP 47 language tag, e.g. "en"',
    },
    direction: {
      like: 'string',
      need: false,
      note: 'ltr, rtl, ttb, or btt',
    },
  },
}
